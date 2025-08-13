"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModuleStore } from "@/stores/moduleStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import ModuleCard from "./ModuleCard";
import { createCourseModule } from "@/lib/actions/module";
import { useForm } from "react-hook-form";
import { moduleSchema, ModuleSchema } from "@/lib/schema/module";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string;
}

export default function CourseStructureManager({ courseId }: Props) {
  const { modules, addModule } = useModuleStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ModuleSchema>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ModuleSchema) => {
    setIsLoading(true);
    try {
      const response = await createCourseModule(courseId, {
        ...data,
        order: modules.length,
      });
      if (response.success) {
        if (response.data && typeof response.data === "object") {
          const moduleData = response.data as any;
          const newModule: Module = {
            id: moduleData.id || Date.now().toString(),
            courseId: courseId,
            title: moduleData.title || data.title,
            description: moduleData.description || data.description || "",
            order: moduleData.order || modules.length,
            createdAt: moduleData.createdAt || new Date().toISOString(),
            updatedAt: moduleData.updatedAt || new Date().toISOString(),
            lessons: [],
          };
          addModule(newModule);
        }

        form.reset();
        setOpen(false);
        toast.success("Module created successfully");
      } else {
        toast.error(response.message || "Failed to create module");
        if (response.redirectUrl) {
          router.push(response.redirectUrl);
        }
      }
    } catch (e) {
      console.error("Failed to create module on server", e);
      toast.error("Failed to create module");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        Structure your course content into chapters and lessons. You can reorder
        them by dragging.
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Chapter
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Chapter</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="chapter-title">Title</FormLabel>
                    <FormControl>
                      <Input
                        id="chapter-title"
                        {...field}
                        placeholder="e.g. Getting Started"
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="chapter-description">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="chapter-description"
                        {...field}
                        placeholder="What will learners achieve in this chapter?"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || isLoading}
                >
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

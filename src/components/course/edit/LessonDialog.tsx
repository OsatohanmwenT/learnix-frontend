"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/rich-editor/Editor";
import { useForm, useWatch } from "react-hook-form";
import {
  ContentType,
  CreateLessonSchema,
  lessonSchema,
  LessonSchema,
} from "@/lib/schema/module";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

interface LessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LessonSchema) => Promise<void>;
  isLoading: boolean;
  mode: "create" | "edit";
  initialData?: Partial<LessonSchema>;
  moduleId: string;
}

export default function LessonDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  mode,
  initialData,
  moduleId,
}: LessonDialogProps) {
  const form = useForm<CreateLessonSchema>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      contentType: "file",
      contentData: "",
      durationMinutes: 0,
      order: 0,
    },
    mode: "onChange",
  });

  const contentType = useWatch({
    control: form.control,
    name: "contentType",
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        title: initialData.title || "",
        description: initialData.description || "",
        contentType: (initialData.contentType as any) || "file",
        contentData: initialData.contentData || "",
        durationMinutes: initialData.durationMinutes || 0,
        order: initialData.order || 0,
      });
    }
  }, [open, initialData, form]);

  const handleSubmit = async (data: CreateLessonSchema) => {
    await onSubmit(data as LessonSchema);
    if (mode === "create") {
      form.reset();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "New Lesson" : "Edit Lesson"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`lesson-title-${moduleId}`}>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`lesson-title-${moduleId}`}
                      {...field}
                      placeholder={
                        mode === "create"
                          ? "e.g. Introduction to React"
                          : "Lesson title"
                      }
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
                  <FormLabel htmlFor={`lesson-description-${moduleId}`}>
                    Description {mode === "edit" && "(optional)"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id={`lesson-description-${moduleId}`}
                      {...field}
                      rows={3}
                      placeholder="Short description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="contentType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("contentData", "");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              mode === "create"
                                ? "Select content type"
                                : "Select type"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {ContentType.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="durationMinutes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`lesson-duration-${moduleId}`}>
                      Duration (minutes)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-none"
                        placeholder="Course Duration (in hours)"
                        {...field}
                        value={
                          field.value === undefined ? "" : String(field.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="contentData"
              control={form.control}
              render={({ field }) =>
                contentType === "text" ? (
                  <FormItem>
                    <FormLabel>
                      {mode === "create"
                        ? "Content Data"
                        : "Content (Rich Text)"}
                    </FormLabel>
                    <FormControl>
                      <Editor style="min-h-[200px]" field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : (
                  <FormItem>
                    <FormLabel htmlFor={`lesson-content-data-${moduleId}`}>
                      Content Data (URL, text, etc.)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={`lesson-content-data-${moduleId}`}
                        {...field}
                        placeholder="URL, text, or ID"
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid || isLoading}
              >
                {isLoading
                  ? mode === "create"
                    ? "Creating..."
                    : "Saving..."
                  : mode === "create"
                  ? "Create"
                  : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

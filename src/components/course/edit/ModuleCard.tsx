"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useModuleStore } from "@/stores/moduleStore";
import {
  createModuleContent,
  deleteModule,
  updateModule as updateModuleAction,
} from "@/lib/actions/module";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import LessonItem from "./LessonItem";
import { toast } from "sonner";
import LessonDialog from "./LessonDialog";
import { LessonSchema } from "@/lib/schema/module";
import DeleteDialog from "./DeleteDialog";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { updateModule, removeModule, addLesson, generateLessonIndex } =
    useModuleStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteModule = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteModule(module.id);
      if (response.success) {
        removeModule(module.id);
        toast.success("Module deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete module");
      }
    } catch (error) {
      console.error("Failed to delete module:", error);
      toast.error("Failed to delete module");
    } finally {
      setIsDeleting(false);
    }
  };

  async function onSubmit(data: LessonSchema) {
    setIsLoading(true);
    try {
      const response = await createModuleContent(module.id, {
        ...data,
        order: generateLessonIndex(module.id) + 1,
      });
      if (response.success) {
        if (response.data && typeof response.data === "object") {
          const lessonData = response.data as any;
          const newLesson: Lesson = {
            id: lessonData.id || Date.now().toString(),
            title: lessonData.title || data.title,
            moduleId: module.id,
            description: lessonData.description || data.description,
            contentType: lessonData.contentType || data.contentType,
            contentData: lessonData.contentData || data.contentData,
            durationMinutes: lessonData.durationMinutes || data.durationMinutes,
            order: generateLessonIndex(module.id) + 1,
          };
          addLesson(module.id, newLesson);
        }

        setOpen(false);
        toast.success("Lesson created successfully");
        if (response?.data?.contentType === "quiz") {
          console.log("Quiz created successfully", response.data);
          window.location.href = `/instructor/quizzes/create?lessonId=${response.data.id}`;
        }
      } else {
        toast.error(response.message || "Failed to create lesson");
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      }
    } catch (error) {
      console.error("Failed to create lesson:", error);
      toast.error("Failed to create lesson");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-500 cursor-move" />
          <div className="flex-1">
            <Input
              value={module.title}
              onChange={(e) =>
                updateModule(module.id, { title: e.target.value })
              }
              onBlur={async (e) => {
                if (e.target.value !== module.title) {
                  try {
                    await updateModuleAction(module.id, {
                      title: e.target.value,
                    });
                  } catch (error) {
                    console.error("Failed to update module title:", error);
                  }
                }
              }}
              className="text-lg font-semibold border-none bg-transparent shadow-none p-0 h-auto"
              placeholder="Module title"
            />
          </div>
          <DeleteDialog
            type="module"
            onDelete={handleDeleteModule}
            isLoading={isDeleting}
          />
        </div>
        <CardDescription>
          {module.description?.trim()
            ? module.description
            : "Organize your course content into chapters and lessons"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {module?.lessons?.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>

        <LessonDialog
          open={open}
          onOpenChange={setOpen}
          onSubmit={onSubmit}
          isLoading={isLoading}
          mode="create"
          moduleId={module.id}
        />
      </CardContent>
    </Card>
  );
}

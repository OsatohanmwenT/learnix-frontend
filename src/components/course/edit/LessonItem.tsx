import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModuleStore } from "@/stores/moduleStore";
import { deleteModuleContent, updateModuleContent } from "@/lib/actions/module";
import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LessonSchema } from "@/lib/schema/module";
import LessonDialog from "./LessonDialog";
import DeleteDialog from "./DeleteDialog";

interface LessonItemProps {
  lesson: Lesson;
}

export default function LessonItem({ lesson }: LessonItemProps) {
  const { deleteLesson, updateLesson } = useModuleStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteLesson = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteModuleContent(lesson.id);
      if (response.success) {
        deleteLesson(lesson.id);
        toast.success("Lesson deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete lesson");
      }
    } catch (error) {
      console.error("Failed to delete lesson:", error);
      toast.error("Failed to delete lesson");
    } finally {
      setIsDeleting(false);
    }
  };

  async function onSubmit(data: LessonSchema) {
    setIsLoading(true);
    try {
      const response = await updateModuleContent(lesson.id, data);
      if (response.success) {
        updateLesson(lesson.id, data);
        setOpen(false);
        toast.success("Lesson updated successfully");
        if (response?.data?.contentType === "quiz") {
          console.log("Quiz created successfully", response.data);
          window.location.href = `/instructor/quizzes/create?lessonId=${response.data.id}`;
        }
      } else {
        toast.error(response.message || "Failed to update lesson");
      }
    } catch (error) {
      console.error("Failed to update lesson:", error);
      toast.error("Failed to update lesson");
    } finally {
      setIsLoading(false);
    }
  }

  const initialData = {
    title: lesson.title,
    description: lesson.description || "",
    contentType: (lesson.contentType as any) || "file",
    contentData: lesson.contentData || "",
    durationMinutes: lesson.durationMinutes || 0,
  };

  return (
    <div className="flex items-center gap-2 py-1 px-2 border rounded-sm bg-neutral-50">
      <GripVertical className="h-4 w-4 text-gray-500 cursor-move" />
      <Input
        value={lesson.title}
        onChange={(e) => {
          updateLesson(lesson.id, { title: e.target.value });
        }}
        onBlur={async (e) => {
          if (e.target.value !== lesson.title) {
            try {
              await updateModuleContent(lesson.id, { title: e.target.value });
            } catch (error) {
              console.error("Failed to update lesson title:", error);
            }
          }
        }}
        className="flex-1 border-none bg-transparent shadow-none"
        placeholder="Lesson title"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <DeleteDialog
        type="lesson"
        onDelete={handleDeleteLesson}
        isLoading={isDeleting}
      />
      <LessonDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={onSubmit}
        isLoading={isLoading}
        mode="edit"
        initialData={initialData}
        moduleId={lesson.moduleId}
      />
    </div>
  );
}

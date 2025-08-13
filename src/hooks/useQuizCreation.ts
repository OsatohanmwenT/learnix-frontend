import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createQuiz } from "@/lib/actions/quiz";
import { CreateQuizSchema } from "@/lib/schema/quiz";

export function useQuizCreation(lessonId: string | null) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createQuizWithLessonId = async (data: CreateQuizSchema) => {
    setIsLoading(true);
    try {
      const response = await createQuiz({
        ...data,
        lessonId: lessonId ?? undefined,
      });

      if (response.success) {
        toast.success("Quiz created successfully!");
        router.push(`/instructor/quizzes/${response.data?.id}/questions`);
      } else {
        toast.error(response.message || "Failed to create quiz");
        if (response.redirectUrl) {
          router.push(response.redirectUrl);
        }
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createQuiz: createQuizWithLessonId,
    isLoading,
  };
}

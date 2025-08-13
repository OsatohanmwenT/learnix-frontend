import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchQuizById, deleteQuestion } from "@/lib/actions/quiz";
import { useQuestionStore } from "@/stores/questionStore";

export function useQuizOperations(quizId: string) {
  const router = useRouter();
  const {
    currentQuiz,
    dialog,
    setCurrentQuiz,
    setLoading,
    closeDialog,
    addQuestion,
    updateQuestion,
    removeQuestion,
  } = useQuestionStore();

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return;

      setLoading(true);
      try {
        const response = await fetchQuizById(quizId);
        console.log("Fetched quiz:", response);
        if (response.success && response.data) {
          console.log("Quiz data:", response.data);
          setCurrentQuiz(response.data);
        } else {
          toast.error(response.message || "Failed to load quiz");
          if (response.redirectUrl) {
            router.push(response.redirectUrl);
          }
        }
      } catch (error) {
        console.error("Error loading quiz:", error);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, router, setCurrentQuiz, setLoading]);

  // Handle question operations
  const handleQuestionAdded = (newQuestion: Question) => {
    addQuestion(newQuestion);
    closeDialog();
    toast.success("Question added successfully");
  };

  const handleQuestionUpdated = (updatedQuestion: Question) => {
    updateQuestion(updatedQuestion);
    closeDialog();
    toast.success("Question updated successfully");
  };

  const handleDeleteQuestion = async () => {
    if (!dialog.question?.id) return;

    try {
      const response = await deleteQuestion(dialog.question.id);
      if (response.success) {
        removeQuestion(dialog.question.id);
        toast.success("Question deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("An error occurred while deleting the question");
    } finally {
      closeDialog();
    }
  };

  return {
    currentQuiz,
    handleQuestionAdded,
    handleQuestionUpdated,
    handleDeleteQuestion,
  };
}

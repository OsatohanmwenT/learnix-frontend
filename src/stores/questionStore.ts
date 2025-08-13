import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DialogState {
  type: "add" | "edit" | "delete" | null;
  question: Question | null;
}

interface QuestionState {
  // Quiz and questions management
  currentQuiz: Quiz | null;
  questions: Question[];
  loading: boolean;
  formLoading: boolean;

  // Consolidated dialog state
  dialog: DialogState;

  // Actions
  setCurrentQuiz: (quiz: Quiz | null) => void;
  setQuestions: (questions: Question[]) => void;
  setLoading: (loading: boolean) => void;
  setFormLoading: (loading: boolean) => void;

  // Dialog management
  openDialog: (type: "add" | "edit" | "delete", question?: Question) => void;
  closeDialog: () => void;

  // Question CRUD
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  removeQuestion: (questionId: string) => void;

  // Utility functions
  getQuestionById: (questionId: string) => Question | undefined;
  reorderQuestions: (questions: Question[]) => void;
}

export const useQuestionStore = create<QuestionState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentQuiz: null,
      questions: [],
      loading: true,
      formLoading: false,
      dialog: { type: null, question: null },

      // Basic setters
      setCurrentQuiz: (quiz) =>
        set({
          currentQuiz: quiz,
          questions: quiz?.questions || [],
        }),

      setQuestions: (questions) => set({ questions }),
      setLoading: (loading) => set({ loading }),
      setFormLoading: (formLoading) => set({ formLoading }),

      // Simplified dialog management
      openDialog: (type, question) =>
        set({ dialog: { type, question: question || null } }),

      closeDialog: () => set({ dialog: { type: null, question: null } }),

      // Question CRUD operations
      addQuestion: (question) =>
        set((state) => {
          const newQuestions = [...state.questions, question].sort(
            (a, b) => a.orderIndex - b.orderIndex
          );
          return {
            questions: newQuestions,
            currentQuiz: state.currentQuiz
              ? {
                  ...state.currentQuiz,
                  questions: newQuestions,
                  totalQuestions: newQuestions.length,
                }
              : null,
          };
        }),

      updateQuestion: (updatedQuestion) =>
        set((state) => {
          const newQuestions = state.questions
            .map((question) =>
              question.id === updatedQuestion.id ? updatedQuestion : question
            )
            .sort((a, b) => a.orderIndex - b.orderIndex);
          return {
            questions: newQuestions,
            currentQuiz: state.currentQuiz
              ? { ...state.currentQuiz, questions: newQuestions }
              : null,
          };
        }),

      removeQuestion: (questionId) =>
        set((state) => {
          const newQuestions = state.questions.filter(
            (question) => question.id !== questionId
          );
          return {
            questions: newQuestions,
            currentQuiz: state.currentQuiz
              ? {
                  ...state.currentQuiz,
                  questions: newQuestions,
                  totalQuestions: newQuestions.length,
                }
              : null,
          };
        }),

      // Utility functions
      getQuestionById: (questionId) => {
        const { questions } = get();
        return questions.find((question) => question.id === questionId);
      },

      reorderQuestions: (reorderedQuestions) =>
        set((state) => ({
          questions: reorderedQuestions,
          currentQuiz: state.currentQuiz
            ? { ...state.currentQuiz, questions: reorderedQuestions }
            : null,
        })),
    }),
    { name: "question-store" }
  )
);

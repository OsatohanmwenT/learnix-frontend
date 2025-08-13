import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QuizState {
  // Quiz list management
  quizzes: Quiz[];
  loading: boolean;
  searchQuery: string;
  selectedDifficulty: string;
  selectedStatus: string;
  error: string | null;

  // Current quiz management
  currentQuiz: Quiz | null;
  currentQuizLoading: boolean;

  // UI states
  showDeleteDialog: boolean;
  quizToDelete: Quiz | null;

  // Actions
  setQuizzes: (quizzes: Quiz[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedStatus: (status: string) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  setCurrentQuizLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  openDeleteDialog: (quiz: Quiz) => void;
  closeDeleteDialog: () => void;
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quiz: Quiz) => void;
  removeQuiz: (quizId: string) => void;

  // Computed values
  filteredQuizzes: () => Quiz[];
}

export const useQuizStore = create<QuizState>()(
  devtools(
    (set, get) => ({
      // Initial state
      quizzes: [],
      loading: false,
      searchQuery: "",
      selectedDifficulty: "all",
      selectedStatus: "all",
      error: null,
      currentQuiz: null,
      currentQuizLoading: false,
      showDeleteDialog: false,
      quizToDelete: null,

      // Actions
      setQuizzes: (quizzes) => set({ quizzes, error: null }),
      setLoading: (loading) => set({ loading }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedDifficulty: (selectedDifficulty) =>
        set({ selectedDifficulty }),
      setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
      setCurrentQuiz: (currentQuiz) => set({ currentQuiz }),
      setCurrentQuizLoading: (currentQuizLoading) =>
        set({ currentQuizLoading }),
      setError: (error) => set({ error }),

      openDeleteDialog: (quiz) =>
        set({
          showDeleteDialog: true,
          quizToDelete: quiz,
        }),

      closeDeleteDialog: () =>
        set({
          showDeleteDialog: false,
          quizToDelete: null,
        }),

      addQuiz: (quiz) =>
        set((state) => ({
          quizzes: [quiz, ...state.quizzes],
        })),

      updateQuiz: (updatedQuiz) =>
        set((state) => ({
          quizzes: state.quizzes.map((quiz) =>
            quiz.id === updatedQuiz.id ? updatedQuiz : quiz
          ),
          currentQuiz:
            state.currentQuiz?.id === updatedQuiz.id
              ? updatedQuiz
              : state.currentQuiz,
        })),

      removeQuiz: (quizId) =>
        set((state) => ({
          quizzes: state.quizzes.filter((quiz) => quiz.id !== quizId),
          currentQuiz:
            state.currentQuiz?.id === quizId ? null : state.currentQuiz,
        })),

      // Computed values
      filteredQuizzes: () => {
        const { quizzes, searchQuery, selectedDifficulty, selectedStatus } =
          get();

        return quizzes.filter((quiz) => {
          const matchesSearch =
            quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesDifficulty =
            selectedDifficulty === "all" ||
            quiz.difficulty === selectedDifficulty;

          const questionCount =
            quiz.questions?.length || quiz.totalQuestions || 0;
          const matchesStatus =
            selectedStatus === "all" ||
            (selectedStatus === "published" && questionCount > 0) ||
            (selectedStatus === "draft" && questionCount === 0);

          return matchesSearch && matchesDifficulty && matchesStatus;
        });
      },
    }),
    {
      name: "quiz-store",
    }
  )
);

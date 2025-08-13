export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-green-50 border border-green-200 text-green-800";
    case "intermediate":
      return "bg-yellow-50 border border-yellow-200 text-yellow-800";
    case "advanced":
      return "bg-orange-50 border border-orange-200 text-orange-800";
    case "expert":
      return "bg-red-50 border border-red-200 text-red-800";
    default:
      return "bg-gray-50 border border-gray-200 text-gray-800";
  }
};

export const getDifficultyLabel = (difficulty: string): string => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

export const getQuestionTypeColor = (questionType: string): string => {
  switch (questionType.toLowerCase()) {
    case "multiple_choice":
      return "bg-blue-100 text-blue-800";
    case "true_false":
      return "bg-green-100 text-green-800";
    case "short_answer":
      return "bg-purple-100 text-purple-800";
    case "essay":
      return "bg-orange-100 text-orange-800";
    case "fill_in_blank":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatQuestionType = (type: string): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatQuizDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
};

export const calculateCompletionPercentage = (
  completedQuestions: number,
  totalQuestions: number
): number => {
  if (totalQuestions === 0) return 0;
  return Math.round((completedQuestions / totalQuestions) * 100);
};

export const isPassingScore = (
  score: number,
  passingScore: number
): boolean => {
  return score >= passingScore;
};

export const formatAttemptText = (attempts: number): string => {
  return attempts === 1 ? "attempt" : "attempts";
};

export const isQuizComplete = (quiz: Quiz): boolean => {
  return !!(
    quiz.title &&
    quiz.description &&
    quiz.difficulty &&
    quiz.totalQuestions &&
    quiz.totalQuestions > 0
  );
};

export const calculateEstimatedTime = (questions: Question[]): number => {
  if (!questions || questions.length === 0) return 0;

  // Base time per question type (in minutes)
  const timePerType = {
    multiple_choice: 1.5,
    true_false: 1,
    short_answer: 3,
    essay: 10,
    fill_in_blank: 2,
  };

  return Math.ceil(
    questions.reduce((total, question) => {
      const baseTime =
        timePerType[question.questionType as keyof typeof timePerType] || 2;
      return total + baseTime;
    }, 0)
  );
};

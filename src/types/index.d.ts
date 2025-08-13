type DifficultyType = "beginner" | "intermediate" | "advanced" | "expert";
type CourseStatus = "published" | "draft" | "archived";

interface Tag {
  id: string;
  label: string;
  count: number;
}

type User = {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  id: string;
  role?: "student" | "instructor" | "admin";
};

type Instructor = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

type Lesson = {
  id: string;
  title: string;
  name: string;
  order: number;
  moduleId: string;
  description?: string;
  contentType?: string;
  contentData?: string;
  durationMinutes?: number;
  isCompleted?: boolean;
};

type CreateLesson = {
  title: string;
  order: number;
  description?: string;
  contentType?: string;
  contentData?: string;
  durationMinutes?: number;
};

type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  lessons?: Lesson[];
};

type category =
  | "Web development"
  | "Data science"
  | "Graphic design"
  | "Business"
  | "Music"
  | "Photography"
  | "Science"
  | "Health & Fitness";

type Course = {
  id: string;
  title: string;
  smallDescription: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  category: CourseCategory;
  estimatedHours: number;
  status: CourseStatus;
  difficulty: DifficultyType;
  instructorName: string;
  instructorId: string;
  createdAt: string;
  updatedAt: string;
  instructor: Instructor;
  modules?: Module[];
};

interface FetchCourseByIdResponse {
  course: Course | null;
  isEnrolled: boolean;
  enrollment: {
    userId: string;
    courseId: string;
    enrolledAt: Date;
    completedAt: Date | null;
    progressPercentage: number;
    paymentReference: string | null;
  } | null;
}

interface EnrolledCourse {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  progress: number;
  nextLessonId: string;
  completedLessons: number;
  totalLessons: number;
  instructorName: string;
  enrolledAt: string;
  completedAt: string | null;
}

interface QuizAttempt {
  submissionId: string;
  quiz: {
    id: string;
    title: string;
    difficulty: string;
    passingScore: number;
    timeLimit: number;
  };
  attempt: {
    number: number;
    score: number;
    percentageScore: number;
    isPassed: boolean;
    submittedAt: string;
  };
}

interface QuizAttemptsResponse {
  attempts: QuizAttempt[];
  summary: {
    totalAttempts: number;
    passedAttempts: number;
    passRate: number;
    averageScore: number;
  };
}

interface FetchEnrolledCoursesParams {
  page?: number;
  limit?: number;
}

interface EnrolledCoursesResponse {
  courses: EnrolledCourse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCourses: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
  };
}

type FetchCourseByIdResponse = {
  course: Course | null;
  isEnrolled: boolean;
};

interface FetchCourseResponse {
  courses: Course[];
  total?: number;
  page?: number;
  limit?: number;
}

type AuthMode = "login" | "signup";

interface RecentQuiz {
  id: string;
  title: string;
  courseName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
  difficulty: string;
}

interface QuizAttempt {
  submissionId: string;
  quiz: {
    id: string;
    title: string;
    difficulty: string;
    passingScore: number;
    timeLimit: number;
  };
  attempt: {
    number: number;
    score: number;
    percentageScore: number;
    isPassed: boolean;
    submittedAt: string;
  };
}

type ModuleCreateInput = {
  title: string;
  description?: string;
  order?: number;
};

type ContentCreateInput = {
  title: string;
  description?: string;
  contentType?: string;
  contentData?: string;
  order?: number;
  durationMinutes?: number;
};

type ActionResponse<T = unknown> = {
  success: boolean;
  message?: string;
  redirectUrl?: string;
} & (T extends undefined ? {} : { data?: T });

// Quiz Types
type QuizDifficulty = "beginner" | "intermediate" | "advanced" | "expert";
type QuestionType =
  | "multiple_choice"
  | "true_false"
  | "short_answer"
  | "long_answer";

interface AnswerOption {
  id?: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
  orderIndex: number;
}

type CreateQuestion = {
  quizId: string;
  questionsCreated: number;
  questions: Question[];
};

interface Question {
  id?: string;
  text: string;
  quizId: string;
  questionType: QuestionType;
  correctAnswer?: string;
  feedback?: string;
  points: number;
  orderIndex: number;
  isActive: boolean;
  answerOptions: AnswerOption[];
  updatedAt: Date;
  createdAt: Date;
}

type FetchQuiz = {
  quizzes: Quiz[];
};

interface Quiz {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  difficulty: QuizDifficulty;
  maxAttempts: number;
  timeLimit?: number;
  passingScore: number;
  randomizeQuestions: boolean;
  showCorrectAnswers: boolean;
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
  totalQuestions?: number;
}

type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";

type QuestionType =
  | "multiple_choice"
  | "true_false"
  | "short_answer"
  | "essay"
  | "fill_in_blank";

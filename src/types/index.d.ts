type DifficultyType = "beginner" | "intermediate" | "advanced" | "expert";
type CourseStatus = "published" | "draft";

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

type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  lessons?: any[]; // Replace 'any' with a Lesson type if you have one
};

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  estimatedHours: number;
  status: string;
  difficulty: string;
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

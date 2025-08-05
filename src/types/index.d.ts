type DifficultyType = "beginner" | "intermediate" | "advanced" | "expert";
type CourseStatus = "published" | "draft";

interface Tag {
    id: string;
    label: string;
    count: number;
}

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
};

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
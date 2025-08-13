// Instructor Analytics Types
export interface InstructorSummary {
  totalCourses: number;
  totalEnrollments: number;
  totalCompletions: number;
  averageProgress: number;
  completionRate: number;
}

export interface InstructorCourse {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  totalEnrollments: number;
  averageProgress: number;
  completedStudents: number;
  createdAt: string;
}

export interface InstructorAnalyticsData {
  summary: InstructorSummary;
  courses: InstructorCourse[];
}

export interface InstructorAnalyticsResponse {
  success: boolean;
  data?: InstructorAnalyticsData | null;
  error?: string;
  redirectUrl?: string;
}

export type RecentCourse = {
  id: string;
  title: string;
  smallDescription: string;
  category: CourseCategory;
  description: string;
  price: number;
  estimatedHours: number;
  thumbnailUrl: string | null;
  enrollmentCount: number;
  status: string; // "published" | "draft"
  difficulty: string; // e.g., "beginner"
  createdAt: string;
  updatedAt: string;
};

export type FetchRecentCoursesResponse = {
  success: boolean;
  message?: string;
  data?: {
    courses: RecentCourse[];
    totalCourses: number;
    showing: number;
    limit: number;
  };
  redirectUrl?: string;
  error?: string;
};

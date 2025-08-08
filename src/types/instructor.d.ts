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

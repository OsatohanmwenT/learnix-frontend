// Types for User Statistics API Response

export interface UserStatisticsOverview {
  enrolledCourses: number;
  completedCourses: number;
  completionRate: number;
  quizzesTaken: number;
  averageQuizScore: number;
  highestQuizScore: number;
  quizzesPassed: number;
  quizPassRate: number;
}

export interface RecentQuizSubmission {
  quizTitle: string;
  score: number;
  isPassed: boolean;
  submittedAt: Date;
  attemptNumber: number;
}

export interface CourseProgress {
  courseId: string;
  courseTitle: string;
  progressPercentage: number;
  thumbnailUrl: string;
  enrolledAt: Date;
  completedAt: Date | null;
  instructorName: string;
  numberOfLessons: number;
  numberOfCompletedLessons: number;
}

export interface UserStatisticsData {
  overview: UserStatisticsOverview;
  recentActivity: {
    recentQuizzes: RecentQuizSubmission[];
    courseProgress: CourseProgress[];
  };
}

export interface UserStatisticsResponse {
  success: boolean;
  message: string;
  data?: UserStatisticsData;
  redirectUrl?: string;
  error?: string;
}

// Optional: If you want to type the individual query results before transformation
export interface EnrolledCoursesCountResult {
  count: number;
}

export interface CompletedCoursesCountResult {
  count: number;
}

export interface QuizStatsResult {
  totalQuizzesTaken: number;
  averageScore: number;
  totalQuizzesPassed: number;
  highestScore: number;
}

export interface RecentQuizResult {
  quizTitle: string;
  score: number;
  isPassed: boolean;
  submittedAt: Date;
  attemptNumber: number;
}

export interface CourseProgressResult {
  courseId: string;
  courseTitle: string;
  progressPercentage: number;
  enrolledAt: Date;
  completedAt: Date | null;
  instructorName: string;
  numberOfLessons: number;
  numberOfCompletedLessons: number;
}

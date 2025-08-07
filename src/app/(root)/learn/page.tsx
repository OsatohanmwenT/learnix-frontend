import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import EnrolledCourseCard from "@/components/dashboard/EnrolledCourseCard";
import RecentQuizCard from "@/components/dashboard/RecentQuizCard";
import { Button } from "@/components/ui/button";
import { fetchUserAnalytics } from "@/lib/actions/analytics";
import { Book, BookCheck, Database, Paperclip } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

const page = async () => {
  const analytics = await fetchUserAnalytics();
  const { data } = analytics;
  const overview = data?.overview;
  const recentActivity = data?.recentActivity;
  console.log(overview, recentActivity);

  if (analytics.redirectUrl) {
    redirect(analytics.redirectUrl);
  }

  if (!analytics.success) {
    console.error("Failed to fetch analytics:", analytics.error);
    return (
      <div className="p-4 sm:p-6 lg:px-8 flex flex-col gap-4 sm:gap-6 min-h-screen">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-hanken text-neutral-800 font-bold">
          Course Overview
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Failed to load analytics data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:px-8 flex flex-col gap-4 sm:gap-6 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-hanken text-neutral-800 font-bold">
        Course Overview
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <AnalyticsCard
          title="Total enrolled courses"
          value={overview?.enrolledCourses || 0}
          icon={<Book className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Average quiz score"
          value={overview?.averageQuizScore || 0}
          icon={<Paperclip className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Total completed Courses"
          value={overview?.completedCourses || 0}
          icon={<BookCheck className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Total quizzes attempted"
          value={overview?.quizzesTaken || 0}
          icon={<Database className="size-4 text-gray-500" />}
        />
      </div>

      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-hanken text-neutral-800 font-bold">
            Recently Enrolled Courses
          </h2>
          <Link href="/learn/my-library">
            <Button className="bg-emerald-400 hover:bg-emerald-500 transition-colors w-full sm:w-auto">
              View all
            </Button>
          </Link>
        </div>
        <div className="w-full flex pl-0 sm:pl-2 no-scrollbar overflow-x-auto space-x-3 sm:space-x-4 pb-2">
          {recentActivity?.courseProgress.map((course) => (
            <EnrolledCourseCard
              key={course.courseId}
              title={course.courseTitle}
              instructorName={course.instructorName}
              thumbnailUrl={course.thumbnailUrl}
              progress={course.progressPercentage}
              numberOfLessons={course.numberOfLessons}
              numberOfCompletedLessons={course.numberOfCompletedLessons}
            />
          ))}
        </div>
      </div>

      {/* Recent Quizzes Section */}
      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-hanken text-neutral-800 font-bold">
            Recent Quiz Results
          </h2>
          <Button className="bg-emerald-400 hover:bg-emerald-500 transition-colors w-full sm:w-auto">
            View all quizzes
          </Button>
        </div>
        <div className="w-full flex pl-0 sm:pl-2 no-scrollbar overflow-x-auto space-x-3 sm:space-x-4 pb-2">
          {recentActivity?.recentQuizzes &&
          recentActivity.recentQuizzes.length > 0 ? (
            recentActivity.recentQuizzes.map((quiz, index) => (
              <RecentQuizCard
                key={`${quiz.quizTitle}-${index}`}
                title={quiz.quizTitle}
                courseName="Course Name" // Course name not available in current API
                score={quiz.score}
                totalQuestions={10} // This data is not available in current API, using placeholder
                correctAnswers={Math.round((quiz.score / 100) * 10)} // Calculated based on score
                timeSpent={quiz.attemptNumber * 5} // Placeholder calculation
                completedAt={quiz.submittedAt.toString()}
                difficulty={
                  quiz.score >= 80
                    ? "advanced"
                    : quiz.score >= 60
                    ? "intermediate"
                    : "beginner"
                } // Derived from score
              />
            ))
          ) : (
            <div className="w-full text-center py-8">
              <p className="text-gray-500 text-lg">No recent quizzes found</p>
              <p className="text-gray-400 text-sm mt-2">
                Take some quizzes to see your results here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

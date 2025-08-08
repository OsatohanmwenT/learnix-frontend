import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import InstructorCourseCard from "@/components/dashboard/InstructorCourseCard";
import EnrollmentChartSection from "@/components/dashboard/EnrollmentChartSection";
import { Button } from "@/components/ui/button";
import { fetchInstructorAnalytics } from "@/lib/actions/instructor";
import { InstructorCourse } from "@/types/instructor";
import { Users, UserCheck, TrendingUp, Target, BookOpen } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

const page = async () => {
  const analytics = await fetchInstructorAnalytics();

  if (analytics.redirectUrl) {
    redirect(analytics.redirectUrl);
  }

  if (!analytics.success) {
    console.error("Failed to fetch instructor analytics:", analytics.error);
    return (
      <div className="p-4 sm:p-6 lg:px-8 flex flex-col gap-4 sm:gap-6 min-h-screen">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-hanken text-neutral-800 font-bold">
          Instructor Dashboard
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Failed to load instructor analytics. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const { data } = analytics;
  console.log(data);
  const summary = data?.summary;
  const courses = data?.courses || [];

  // Sample enrollment data - this would typically come from your API
  const enrollmentData = [
    { date: "Jan 1, 2024", value: 12 },
    { date: "Jan 8, 2024", value: 18 },
    { date: "Jan 15, 2024", value: 8 },
    { date: "Jan 22, 2024", value: 25 },
    { date: "Jan 29, 2024", value: 16 },
    { date: "Feb 5, 2024", value: 32 },
    { date: "Feb 12, 2024", value: 20 },
    { date: "Feb 19, 2024", value: 28 },
    { date: "Feb 26, 2024", value: 15 },
    { date: "Mar 5, 2024", value: 40 },
    { date: "Mar 12, 2024", value: 22 },
    { date: "Mar 19, 2024", value: 35 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:px-8 flex flex-col gap-4 sm:gap-6 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-hanken text-neutral-800 font-bold">
        Instructor Dashboard
      </h1>

      {/* Analytics Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <AnalyticsCard
          title="Total Courses"
          value={summary?.totalCourses || 0}
          icon={<BookOpen className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Total Enrollments"
          value={summary?.totalEnrollments || 0}
          icon={<Users className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Students Completed"
          value={summary?.totalCompletions || 0}
          icon={<UserCheck className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Average Progress"
          value={Math.round(summary?.averageProgress || 0)}
          icon={<TrendingUp className="size-4 text-gray-500" />}
        />
        <AnalyticsCard
          title="Completion Rate"
          value={Math.round(summary?.completionRate || 0)}
          icon={<Target className="size-4 text-gray-500" />}
        />
      </div>

      {/* Enrollment Chart Section */}
      <EnrollmentChartSection
        title="Enrollment Trends"
        description="Weekly student enrollments across all courses"
        data={enrollmentData}
        totalValue={summary?.totalEnrollments}
        className="w-full"
      />

      {/* My Courses Section */}
      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-hanken text-neutral-800 font-bold">
            My Courses Performance
          </h2>
          <Link href="/instructor/courses">
            <Button className="bg-emerald-400 hover:bg-emerald-500 transition-colors w-full sm:w-auto">
              Manage Courses
            </Button>
          </Link>
        </div>
        <div className="w-full flex pl-0 sm:pl-2 no-scrollbar overflow-x-auto space-x-3 sm:space-x-4 pb-2">
          {courses.length > 0 ? (
            courses.map((course: InstructorCourse) => (
              <InstructorCourseCard
                key={course.courseId}
                courseId={course.courseId}
                courseTitle={course.courseTitle}
                courseDescription={course.courseDescription}
                totalEnrollments={course.totalEnrollments}
                averageProgress={course.averageProgress}
                completedStudents={course.completedStudents}
                createdAt={course.createdAt}
              />
            ))
          ) : (
            <div className="w-full text-center py-8">
              <p className="text-gray-500 text-lg">No courses created yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Create your first course to start teaching!
              </p>
              <Link href="/instructor/courses/create">
                <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                  Create Your First Course
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-hanken text-neutral-800 font-bold">
            Recent Activity
          </h2>
          <Button className="bg-emerald-400 hover:bg-emerald-500 transition-colors w-full sm:w-auto">
            View All Activity
          </Button>
        </div>
        <div className="w-full text-center py-8">
          <p className="text-gray-500 text-lg">
            Recent activity feed coming soon
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Track student enrollments, course completions, and more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

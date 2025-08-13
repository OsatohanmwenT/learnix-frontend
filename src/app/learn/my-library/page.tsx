import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUserEnrolledCourses } from "@/lib/actions/user";
import EnrolledCourseCard from "@/components/dashboard/EnrolledCourseCard";
import { redirect } from "next/navigation";

const page = async () => {
  try {
    const enrolledCoursesData = await fetchUserEnrolledCourses({
      page: 1,
      limit: 50,
    });

    if (!enrolledCoursesData) {
      throw new Error("No enrolled courses data found");
    }

    const { courses } = enrolledCoursesData;

    // Filter courses by status
    const allCourses = courses;
    const inProgressCourses = courses.filter(
      (course) => course.progress > 0 && course.progress < 100
    );
    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );

    return (
      <div className="container mx-auto font-hanken px-20 py-6">
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Library</h1>
          <p className="text-gray-600">
            Manage your enrolled courses and learning progress
          </p>
        </div>
        <div>
          <Tabs defaultValue="all" className="w-full font-hanken">
            <TabsList className="*:data-[state=active]:bg-dark-blue space-x-2 bg-transparent h-auto *:data-[state=active]:text-white">
              <TabsTrigger
                value="all"
                className="h-auto px-2 py-2 rounded-xs bg-neutral-200 cursor-pointer"
              >
                All Courses ({allCourses.length})
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="h-auto px-2 py-2 bg-neutral-200 rounded-xs cursor-pointer"
              >
                In Progress ({inProgressCourses.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="h-auto px-2 py-2 bg-neutral-200 rounded-xs cursor-pointer"
              >
                Completed ({completedCourses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="bg-transparent">
                {allCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {allCourses.map((course) => (
                      <EnrolledCourseCard
                        key={course.id}
                        title={course.title}
                        instructorName={course.instructorName}
                        thumbnailUrl={
                          course.thumbnailUrl ||
                          "https://placehold.co/600x400.png"
                        }
                        nextLessonId={course.nextLessonId}
                        progress={course.progress}
                        numberOfLessons={course.totalLessons}
                        numberOfCompletedLessons={course.completedLessons}
                        id={course.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No courses enrolled yet
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Start exploring courses to build your library!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="mt-6">
              <div className="bg-transparent">
                {inProgressCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {inProgressCourses.map((course) => (
                      <EnrolledCourseCard
                        key={course.id}
                        title={course.title}
                        instructorName={course.instructorName}
                        thumbnailUrl={
                          course.thumbnailUrl ||
                          "https://placehold.co/600x400.png"
                        }
                        nextLessonId={course.nextLessonId}
                        progress={course.progress}
                        numberOfLessons={course.totalLessons}
                        numberOfCompletedLessons={course.completedLessons}
                        id={course.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No courses in progress
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Start learning to see your progress here!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="bg-transparent">
                {completedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {completedCourses.map((course) => (
                      <EnrolledCourseCard
                        id={course.id}
                        key={course.id}
                        title={course.title}
                        instructorName={course.instructorName}
                        thumbnailUrl={
                          course.thumbnailUrl ||
                          "https://placehold.co/600x400.png"
                        }
                        progress={course.progress}
                        numberOfLessons={course.totalLessons}
                        numberOfCompletedLessons={course.completedLessons}
                        nextLessonId={course.nextLessonId}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No completed courses yet
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Keep learning to complete your first course!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in my-library page:", error);
    // Handle authentication errors by redirecting
    if (error instanceof Error && error.message.includes("Authentication")) {
      redirect("/sign-in");
    }

    return (
      <div className="container mx-auto font-hanken px-8 py-6">
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Library</h1>
          <p className="text-gray-600">
            Manage your enrolled courses and learning progress
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default page;

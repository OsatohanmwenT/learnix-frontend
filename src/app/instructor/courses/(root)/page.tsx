import ICourseCard from "@/components/instructor/ICourseCard";
import { Button } from "@/components/ui/button";
import { fetchInstructorRecentCourses } from "@/lib/actions/instructor";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const res = await fetchInstructorRecentCourses({ limit: 20 });

  if (res.redirectUrl) {
    redirect(res.redirectUrl);
  }

  const courses = res.success ? res.data?.courses ?? [] : [];
  const total = res.success ? res.data?.totalCourses ?? 0 : 0;
  const showing = res.success ? res.data?.showing ?? courses.length : 0;

  return (
    <div className="p-4 sm:p-6 lg:px-8 !pb-20 flex flex-col gap-4 sm:gap-6 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-hanken text-neutral-800 font-bold">
            Your Courses
          </h1>
          <p className="text-neutral-600 mt-1">
            Showing {showing} of {total} courses
          </p>
        </div>
        <Link href="/instructor/courses/create">
          <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-sm">
            Create Course
          </Button>
        </Link>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {courses.map((c) => (
            <ICourseCard
              key={c.id}
              id={c.id}
              title={c.title}
              description={c.smallDescription}
              thumbnailUrl={c.thumbnailUrl}
              status={c.status === "published" ? "Published" : "Draft"}
              duration={`${c.estimatedHours}h`}
              level={c.difficulty}
              enrollmentCount={c.enrollmentCount}
              editHref={`/instructor/courses/edit/${c.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl w-full p-8 border border-neutral-200 text-center">
          <p className="text-neutral-700">No recent courses available.</p>
          <p className="text-neutral-500 text-sm mt-1">
            Create a course to see it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;

import { updateCourse } from "@/lib/actions/courses";
import { CourseSchemaType, EditCourseFormType } from "@/lib/schema/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useCourseUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (courseId: string, data: EditCourseFormType) => {
    try {
      setIsLoading(true);

      const estimatedHours = parseFloat(data.estimatedHours);
      const price = parseFloat(data.price);

      const courseData: CourseSchemaType = {
        title: data.title.trim(),
        smallDescription: data.smallDescription.trim(),
        description: data.description,
        estimatedHours,
        category: data.category,
        price,
        thumbnailUrl: data.thumbnailUrl.trim(),
        status: data.status,
        difficulty: data.difficulty,
      };

      const result = await updateCourse(courseId, courseData);

      if (result.success) {
        toast.success(result.message || "Course updated successfully!");
      } else {
        if (result.redirectUrl) {
          router.push(result.redirectUrl);
        } else {
          toast.error(result.message || "Failed to update course");
        }
      }
    } catch (error) {
      console.error("Course update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update course"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
}

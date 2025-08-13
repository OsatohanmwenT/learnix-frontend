import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { fetchCourseByLessonId } from "@/lib/actions/lesson";
import { Play, FileText, Link as LinkIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressSidebarProps {
  courseId: string;
}

const ProgressSidebar = async ({ courseId }: ProgressSidebarProps) => {
  const courseResult = await fetchCourseByLessonId(courseId);

  if (!courseResult.success || !courseResult.data) {
    return (
      <div className="w-[300px] fixed border-l right-0 top-0 font-hanken bg-white p-4 pt-23 h-full">
        <p className="font-semibold">Course Progress</p>
        <div className="mt-3 text-center text-gray-500">
          Failed to load course data
        </div>
      </div>
    );
  }

  const course = courseResult.data;
  const progressPercentage = course.progressPercentage || 0;

  const getContentIcon = (contentType?: string) => {
    switch (contentType) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "text":
        return <FileText className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-[300px] fixed border-l right-0 top-0 font-hanken bg-white p-4 pt-23 h-full overflow-y-auto">
      <p className="font-semibold">Your Course Progress</p>
      <div className="mt-3">
        <div className="h-2 w-full rounded-full bg-emerald-200/50">
          <div
            className="bg-light-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="font-hanken mt-1 font-medium text-gray-600 text-sm flex items-center justify-between">
          <span>{progressPercentage}%</span>
          <span>100%</span>
        </div>
      </div>
      <Separator className="mt-3" />
      <div className="mt-3">
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        {course.modules && course.modules.length > 0 ? (
          <Accordion type="multiple" className="w-full space-y-2">
            {course.modules.map((module, moduleIndex) => (
              <AccordionItem
                key={module.id}
                className="border-b-0"
                value={`module-${module.id}`}
              >
                <AccordionTrigger className="bg-neutral-50 border rounded-xs px-4">
                  Module {moduleIndex + 1}: {module.title}
                </AccordionTrigger>
                <AccordionContent className="pl-3 border-l-2 py-1 mt-2">
                  {module.lessons && module.lessons.length > 0 ? (
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCurrentLesson =
                          lesson.id === course.currentLessonId;
                        const isCompleted = lesson.isCompleted || false;
                        return (
                          <Link
                            key={lesson.id}
                            href={`/learn/courses/${courseId}/lessons/${lesson.id}`}
                            className={cn(
                              "flex items-center gap-3 py-3 px-2 rounded-xs border-l-2 transition-colors",
                              isCurrentLesson
                                ? "bg-emerald-50 border-l-emerald-500"
                                : "bg-gray-100 border-l-transparent hover:bg-gray-200"
                            )}
                          >
                            <div
                              className={cn(
                                "h-7 w-7 rounded-full flex items-center justify-center",
                                isCompleted
                                  ? "bg-emerald-500 text-white"
                                  : isCurrentLesson
                                  ? "bg-emerald-200 text-emerald-700"
                                  : "bg-gray-300 text-gray-600"
                              )}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                getContentIcon(lesson.contentType)
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm font-medium truncate",
                                  isCurrentLesson
                                    ? "text-emerald-700"
                                    : "text-gray-900"
                                )}
                              >
                                Lesson {lessonIndex + 1}: {lesson.name}
                              </p>
                              {lesson.durationMinutes && (
                                <p className="text-xs text-gray-500">
                                  {lesson.durationMinutes} min
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-3 px-2 text-gray-500 text-sm">
                      No lessons available
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No modules available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressSidebar;

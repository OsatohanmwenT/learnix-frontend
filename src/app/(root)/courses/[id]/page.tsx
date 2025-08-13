import React from "react";
import Image from "next/image";
import EnrollButton from "@/components/course/EnrollButton";
import CustomBreadCrumb from "@/components/shared/CustomBreadCrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchCourseByIdAuthenticated } from "@/lib/actions/courses";
import {
  BookUser,
  Clock,
  Play,
  Video,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import RenderDescription from "@/components/rich-editor/RenderDescription";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const result = await fetchCourseByIdAuthenticated(id);
  const course = result?.course;
  const isEnrolled = result?.isEnrolled;
  
  if (isEnrolled) {
    redirect(`/learn/`);
  }
  
  if (!course) return null;


  return (
    <div className="min-h-screen font-hanken bg-[#f7f7fc] pt-16">
      <div className="p-5 lg:px-10 border-b xl:px-18 bg-white w-full">
        <CustomBreadCrumb />
      </div>
      <div className="p-5 lg:px-10 xl:px-16 flex gap-10">
        <div className="h-full border bg-white p-8 rounded-md w-full">
          <h1 className="text-4xl font-hanken font-bold mb-4">
            {course?.title}
          </h1>
          <div className="flex items-center gap-3">
            <p>
              A Course by{" "}
              <span className="underline font-medium">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </span>
            </p>
            <div className="bg-gray-300 rounded-full mt-1 w-1.5 h-1.5" />
            <div className="flex items-center gap-1">
              <BookUser className="text-gray-400" />
              <p className="font-medium text-sm">{course?.difficulty}</p>
            </div>
            <div className="bg-gray-300 rounded-full mt-1 w-1.5 h-1.5" />
            <div className="flex items-center gap-1">
              <Clock className="text-gray-400" />
              <p className="font-medium text-sm">
                {course?.estimatedHours} hours
              </p>
            </div>
          </div>
          <div className="mt-6">
            <EnrollButton isEnrolled={isEnrolled} id={course?.id || ""} />
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold">About the Course</h2>
            <p className="text-gray-500 text-base mt-4">
              {course?.smallDescription}
            </p>

            <RenderDescription json={JSON.parse(course.description)} />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="grid grid-cols-1">
              <Accordion type="multiple">
                {course?.modules?.map((module, idx) => (
                  <AccordionItem
                    key={module.id || idx}
                    className="flex last:border-b-1 flex-col px-4 w-full rounded-sm border border-gray-200 mb-2"
                    value={`item-${idx}`}
                  >
                    <AccordionTrigger className="flex cursor-pointer py-3 w-full items-center">
                      <div className="flex w-full gap-4 justify-start items-center">
                        <div className="bg-gray-200 p-2 rounded-full flex items-center justify-center">
                          <Play className="text-gray-600 size-4" />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold text-lg hover:underline text-gray-900">
                            Module {idx + 1}: {module.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <BookOpen className="size-3" />
                              {module.lessons?.length || 0} lessons
                            </span>
                            <div className="bg-gray-400 rounded-full size-1"></div>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <Clock className="size-3" />2 hours
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="py-2 flex flex-col gap-2 px-2">
                        <p className="text-sm font-normal text-gray-800">
                          {module.description}
                        </p>
                        <p className="font-medium text-lg mt-2 mb-1">
                          What's included
                        </p>
                        <div className="flex flex-wrap gap-4 items-center mb-2">
                          <span className="flex items-center gap-1 text-gray-700 text-sm">
                            <Video className="inline-block size-5" />0 videos
                          </span>
                          <span className="flex items-center gap-1 text-gray-700 text-sm">
                            <BookOpen className="inline-block size-5" />0
                            readings
                          </span>
                          <span className="flex items-center gap-1 text-gray-700 text-sm">
                            <ClipboardList className="inline-block size-5" />0
                            assignments
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <div className="h-full border bg-white p-4 rounded-md w-full max-w-[400px]">
          <div className="aspect-video w-full h-fit rounded-lg">
            <Image
              src={course?.thumbnailUrl || "https://placehold.co/600x400.png"}
              alt={course?.title || ""}
              className="rounded-lg w-full object-cover"
              width={400}
              loading="lazy"
              height={300}
            />
          </div>
          <div className="mt-4">
            <p className="text-gray-600 text-sm font-medium">
              Price of this course
            </p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-5xl font-bold text-gray-900">
                {course?.price ? course.price.toFixed(2) : "299.99"}
              </span>
              <span className="text-lg font-semibold text-gray-600 ml-1">
                USD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

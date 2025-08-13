import RenderDescription from "@/components/rich-editor/RenderDescription";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLessonById } from "@/lib/actions/lesson";
import { redirect } from "next/navigation";
import { Play, FileText, Link as LinkIcon } from "lucide-react";
import LessonCompleteButton from "@/components/learn/LessonCompleteButton";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ lessonId: string; id: string }>;
}) => {
  const { lessonId, id } = await params;
  const lessonResult = await fetchLessonById(lessonId);

  if (lessonResult.redirectUrl) {
    redirect(lessonResult.redirectUrl);
  }

  console.log(lessonResult);

  if (!lessonResult.success || !lessonResult.data) {
    return (
      <div className="p-6 flex font-hanken flex-col gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            {lessonResult.message || "Failed to load lesson. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  const lesson = lessonResult.data;

  const renderContent = () => {
    switch (lesson.contentType) {
      case "video":
        return (
          <div className="w-full h-96 bg-white rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Play className="w-16 h-16 text-gray-400" />
              <p className="text-gray-600">
                Video content will be displayed here
              </p>
              {lesson.contentData && (
                <a
                  href={lesson.contentData}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open Video
                </a>
              )}
            </div>
          </div>
        );

      case "text":
        return (
          <div className="w-full min-h-96 bg-white border rounded-lg p-6">
            {lesson.contentData ? (
              <div className="prose prose-li:marker:text-light-green">
                {typeof lesson.contentData === "string" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: lesson.contentData }}
                  />
                ) : (
                  <RenderDescription json={lesson.contentData as any} />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <FileText className="w-8 h-8 text-gray-400 mr-2" />
                <p className="text-gray-600">No text content available</p>
              </div>
            )}
          </div>
        );

      case "link":
        return (
          <div className="w-full h-96 bg-white border rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <LinkIcon className="w-16 h-16 text-gray-400" />
              <p className="text-gray-600">External Resource</p>
              {lesson.contentData && (
                <a
                  href={lesson.contentData}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open Resource
                </a>
              )}
            </div>
          </div>
        );

      default:
        return <Skeleton className="h-96 rounded-lg w-full" />;
    }
  };

  return (
    <div className="p-6 flex font-hanken flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
        {lesson.durationMinutes && (
          <p className="text-gray-600">
            Duration: {lesson.durationMinutes} minutes
          </p>
        )}
      </div>

      {renderContent()}

      {lesson.description && (
        <div className="bg-white border rounded-xs p-4">
          <h3 className="font-semibold text-lg mb-2">About this lesson</h3>
          <p className="text-gray-700">{lesson.description}</p>
        </div>
      )}

      <LessonCompleteButton lessonId={lesson.id} />
    </div>
  );
};

export default page;

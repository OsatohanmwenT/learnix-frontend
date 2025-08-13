import Image from "next/image";
import React from "react";
import { Progress } from "../ui/progress";
import Link from "next/link";

interface EnrolledCourseCardProps {
  id: string
  title: string;
  nextLessonId: string;
  instructorName: string;
  thumbnailUrl: string;
  progress: number;
  numberOfLessons: number;
  numberOfCompletedLessons: number;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({
  id,
  title,
  instructorName,
  nextLessonId,
  thumbnailUrl,
  progress,
  numberOfLessons,
  numberOfCompletedLessons,
}) => {
  return (
    <Link href={`/learn/courses/${id}/lessons/${nextLessonId}`}>
    <div className="rounded-lg h-[320px] cursor-pointer flex flex-col overflow-hidden border min-w-[200px] sm:min-w-[250px] max-w-[240px] font-hanken border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <div className="overflow-hidden">
        <Image
          width={350}
          height={250}
          src={thumbnailUrl || "https://placehold.co/600x400.png"}
          alt={title}
          className="w-full h-32 sm:h-38 transition-all duration-300 hover:scale-105 object-cover"
        />
      </div>
      <div className="p-3 flex flex-1 flex-col justify-between sm:p-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">
            A Course by {instructorName}
          </p>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2 mb-2 leading-tight">
            {title}
          </h3>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm font-medium text-emerald-600">
              Progress: {progress}%
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              {numberOfCompletedLessons} / {numberOfLessons} lessons
            </p>
          </div>
          <Progress barColor="bg-emerald-500" value={progress} max={100} />
        </div>
      </div>
    </div>
    </Link>
  );
};

export default EnrolledCourseCard;

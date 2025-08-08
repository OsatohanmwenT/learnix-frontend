import React from "react";
import { Progress } from "../ui/progress";
import { Users, CheckCircle } from "lucide-react";

interface InstructorCourseCardProps {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  totalEnrollments: number;
  averageProgress: number;
  completedStudents: number;
  createdAt: string;
}

const InstructorCourseCard: React.FC<InstructorCourseCardProps> = ({
  courseId,
  courseTitle,
  courseDescription,
  totalEnrollments,
  averageProgress,
  completedStudents,
  createdAt,
}) => {
  const completionRate =
    totalEnrollments > 0 ? (completedStudents / totalEnrollments) * 100 : 0;

  return (
    <div className="rounded-lg h-[280px] flex flex-col overflow-hidden border min-w-[200px] sm:min-w-[250px] max-w-[240px] font-hanken border-neutral-200 hover:border-neutral-400 transition-all duration-200 bg-white">
      <div className="p-3 flex flex-1 flex-col justify-between sm:p-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">
            Created {new Date(createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2 mb-2 leading-tight">
            {courseTitle}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {courseDescription}
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          {/* Enrollment Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Users className="size-3 text-gray-500" />
              <p className="text-xs text-gray-600">
                {totalEnrollments} enrolled
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="size-3 text-emerald-500" />
              <p className="text-xs text-emerald-600">
                {completedStudents} completed
              </p>
            </div>
          </div>

          {/* Average Progress */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-700">Avg Progress</p>
              <p className="text-xs text-gray-600">{averageProgress}%</p>
            </div>
            <Progress
              barColor="bg-blue-500"
              value={averageProgress}
              max={100}
            />
          </div>

          {/* Completion Rate */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-700">
                Completion Rate
              </p>
              <p className="text-xs text-gray-600">
                {completionRate.toFixed(1)}%
              </p>
            </div>
            <Progress
              barColor="bg-emerald-500"
              value={completionRate}
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;

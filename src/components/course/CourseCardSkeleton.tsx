import React from "react";
import { Skeleton } from "../ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="flex gap-4 justify-between flex-col p-4 border border-neutral-300 rounded-lg">
      <Skeleton className="w-full h-[245px] rounded-lg" />
      <div className="flex flex-col gap-2">

      <Skeleton className="w-2/3 h-6" />
        <Skeleton className="w-1/3 h-3" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-full h-2.5" />
        <Skeleton className="w-full h-2.5" />
      </div>
        <Skeleton className="w-full h-12" />
      </div>
        <Skeleton className="w-full h-8" />
    </div>
  );
};

export default CourseCardSkeleton;

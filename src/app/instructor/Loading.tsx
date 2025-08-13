"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-4 sm:p-6 lg:px-8 flex flex-col gap-4 sm:gap-6 min-h-screen">
      {/* Page Title */}
      <Skeleton className="h-7 sm:h-9 w-40 sm:w-64" />

      {/* Analytics Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center justify-between"
          >
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ))}
      </div>

      {/* Enrollment Chart Section */}
      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="mb-4 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-48 sm:h-56 w-full" />
      </div>

      {/* My Courses Section */}
      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="w-full flex pl-0 sm:pl-2 no-scrollbar overflow-x-auto space-x-3 sm:space-x-4 pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[260px] max-w-[280px] bg-white rounded-lg border border-neutral-200 p-4"
            >
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-3 w-56 mb-4" />
              <Skeleton className="h-2.5 w-full rounded" />
              <div className="mt-3 flex items-center justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl w-full p-4 sm:p-6 border border-neutral-200">
        <div className="flex items-center justify-between mb-4 gap-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;

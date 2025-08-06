"use client";

import CourseSection from "@/components/course/CourseSection";
import FilterSection from "@/components/course/FilterSection";
import HeaderSection from "@/components/course/HeaderSection";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";

  return (
    <main className="min-h-screen pt-18 w-full">
      <div className="flex w-full min-h-[calc(100vh-88px)] px-5 lg:px-9 xl:px-16 py-6 lg:py-8 gap-12">
        <FilterSection />
        <div className="flex flex-col flex-1">
          <HeaderSection query={query} />
          <CourseSection query={query} sortBy={sortBy} />
        </div>
      </div>
    </main>
  );
};

export default page;

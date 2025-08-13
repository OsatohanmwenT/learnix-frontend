"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { fetchCourses as fetchAllCourses } from "@/lib/actions/courses";
import CourseCardSkeleton from "./CourseCardSkeleton";
import { useFilterStore } from "@/stores/filterStore";

const CourseSection = ({
  query,
  sortBy,
}: {
  query: string;
  sortBy: string;
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedLevels, selectedDurations } = useFilterStore();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllCourses({
          limit: 100,
          page: 1,
          query,
          sortBy,
          difficulty: selectedLevels,
          duration: selectedDurations,
        });
        setCourses(response.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [query, sortBy, selectedLevels, selectedDurations]);

  if (isLoading) {
    return (
      <div className="w-full flex-1 grid grid-cols-1 p-4 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }


  if (courses.length === 0) {
    return (
      <div className="w-full flex h-full justify-center items-center py-32">
        <div className="text-dark-green font-hanken text-6xl">
          No courses available.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 p-4 pr-0 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4">
      {courses.map((course) => (
        <CourseCard {...course} key={course.id} />
      ))}
    </div>
  );
};

export default CourseSection;

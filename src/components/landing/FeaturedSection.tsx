import { fetchCourses } from "@/lib/actions/courses";
import React from "react";
import CourseCard from "../course/CourseCard";
import { FadeUp, FadeIn, AnimatedCard } from "../ui/animations";

const FeaturedSection = async () => {
  const { courses } = await fetchCourses({ limit: 3, query: "" });

  if( !courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="p-5 pb-32 mx-auto bg-gray-100">
      <FadeUp className="text-4xl md:text-5xl font-bold text-center font-poppins my-12">
        Our Featured{" "}
        <span className="text-[#278576] font-semibold font-dm-serif">
          Courses
        </span>
      </FadeUp>

      <FadeIn
        delay={0.3}
        className="grid grid-cols-1 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {courses.map((course, index) => (
          <AnimatedCard key={course.id} index={index}>
            <CourseCard {...course} />
          </AnimatedCard>
        ))}
      </FadeIn>
    </div>
  );
};

export default FeaturedSection;

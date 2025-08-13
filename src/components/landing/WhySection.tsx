"use client";

import React from "react";
import { FadeUp } from "../ui/animations";
import { Globe } from "lucide-react";
import Image from "next/image";
import { BookPlay, CartPlus } from "../icons";

const WhySection = () => {
  return (
    <div className="pt-12 relative pb-32 mx-auto">
      <FadeUp className="text-4xl md:text-5xl font-semibold text-center font-poppins my-6">
        Discover, Enroll &{" "}
        <span className="text-[#278576] font-semibold font-dm-serif">
          Learn
        </span>
      </FadeUp>
      <FadeUp delay={0.2}>
        <p className="font-medium sm:text-lg text-center mx-auto text-neutral-500 font-hanken max-w-md sm:max-w-xl">
          Follow these simple steps to choose, purchase, and start learning from
          expertly designed courses tailored to your goals.
        </p>
      </FadeUp>
      <FadeUp
        delay={0.4}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto"
      >
        <div className="flex flex-col group items-center">
          <div className="flex items-center justify-center p-3 bg-neutral-100 border border-neutral-200 rounded-xl">
            <Globe className="stroke-1 transition-all duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110 relative z-10 size-10 text-light-green" />
          </div>
          <h3 className="text-xl font-semibold text-center mt-4 font-hanken">
            1. Explore All Courses
          </h3>
          <p className="text-center max-w-xs text-neutral-500 font-hanken mt-2">
            Browse through a diverse range of courses tailored to different
            skills and interests. Use filters like category.
          </p>
        </div>
        <div className="absolute max-md:hidden md:left-[28%] 2xl:left-[32%] transform items-center justify-center">
          <Image src="/down-curve.svg" alt="" width={220} height={100} />
        </div>
        <div className="flex flex-col group items-center">
          <div className="absolute max-md:hidden md:right-[28%] 2xl:right-[32%] top-1/2 transform items-center justify-center">
            <Image src="/up-curve.svg" alt="" width={220} height={100} />
          </div>
          <div className="flex items-center justify-center p-3 bg-neutral-100 border border-neutral-200 rounded-xl">
            <CartPlus
              className="group-hover:scale-110 text-light-green transition-transform duration-300"
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-xl font-semibold text-center mt-4 font-hanken">
            2. Purchase Desired Course
          </h3>
          <p className="text-center max-w-xs text-neutral-500 font-hanken mt-2">
            Select your chosen course and complete the one-time payment process.
            You’ll gain lifetime access to the course.
          </p>
        </div>
        <div className="flex flex-col group items-center">
          <div className="flex items-center justify-center p-3 bg-neutral-100 border border-neutral-200 rounded-xl">
            <BookPlay
              className="group-hover:scale-110 text-light-green transition-transform duration-300"
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-xl font-semibold text-center mt-4 font-hanken">
            3. Start Learning Anytime
          </h3>
          <p className="text-center max-w-xs text-neutral-500 font-hanken mt-2">
            Access your course materials anytime, anywhere. Enjoy a flexible
            learning experience at your own pace.
          </p>
        </div>
      </FadeUp>
    </div>
  );
};

export default WhySection;

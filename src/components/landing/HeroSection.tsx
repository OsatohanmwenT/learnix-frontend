"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { TextReveal } from "../ui/text-reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="h-screen pt-5 px-5 overflow-x-clip relative bg-[#181818]">
      <div className="flex h-[20rem] absolute top-0 w-full items-center justify-center">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:80px_80px]",
            "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#181818] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="my-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10"
          >
            <div className="font-hanken items-center mb-5 justify-center flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="text-2xl font-semibold">
                  <Image src="/star.svg" alt="Star" width={24} height={24} />
                </span>
              ))}{" "}
              <span className="text-white font-hanken">4.9 (15,008)</span>
            </div>
          </motion.div>
          <div className="flex items-center justify-center">
            <TextReveal
              className={cn(
                `text-5xl sm:text-6xl lg:text-8xl leading-[1em] mx-auto font-hanken text-white font-semibold max-w-5xl text-center`
              )}
              from="bottom"
              split="letter"
            >
              Unlock Your Potential
            </TextReveal>
          </div>
          <div className="flex items-center justify-center">
            <TextReveal
              className={cn(
                `text-5xl sm:text-6xl lg:text-8xl leading-[1em] mx-auto text-light-green font-medium font-dm-serif max-w-5xl text-center`
              )}
              from="bottom"
              split="letter"
            >
              With New Skills
            </TextReveal>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p className="font-medium sm:text-lg text-center mx-auto mt-6 text-neutral-500 font-hanken max-w-md sm:max-w-2xl">
              Unlock a world of opportunities and take control of your future by
              mastering new skills that empower you to achieve your goals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-10"
          >
            <div className="flex items-center justify-center mt-10">
              <Link
                href="/courses"
                className="bg-light-green hover:bg-white text-white hover:text-light-green transition-all duration-300 flex items-center gap-4 pl-5 pr-2 py-2 rounded-full font-hanken font-medium text-lg group"
              >
                Explore Courses
                <div className="bg-white group-hover:bg-light-green text-light-green group-hover:text-white rounded-full p-2 transition-all duration-300">
                  <ArrowDown className="-rotate-[135deg] group-hover:-rotate-90 transition-all duration-300" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

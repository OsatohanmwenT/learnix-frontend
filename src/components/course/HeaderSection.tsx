"use client";

import React from "react";
import TagSection from "./TagSection";

const HeaderSection = ({ query }: { query: string }) => {
  // const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="w-full pl-5 lg:pt-4 lg:mb-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-hanken text-lg md:text-2xl font-medium">
            {query ? `Search results for: ${query}` : "All Courses"}
          </p>
        </div>
      </div>
      <TagSection />
    </div>
  );
};

export default HeaderSection;

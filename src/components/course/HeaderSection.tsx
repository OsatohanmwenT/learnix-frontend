"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SORT_OPTIONS,
} from "@/constants";
import { useFilterStore } from "@/stores/filterStore";
import TagSection from "./TagSection";

const HeaderSection = ({ query }: { query: string }) => {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="w-full pl-5 lg:pt-4 lg:mb-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-hanken text-lg md:text-2xl font-medium">
            {query ? `Search results for: ${query}` : "All Courses"}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <label className="font-hanken font-medium text-nowrap">
            Sort by:
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full shadow-none px-4 !py-5 rounded-full font-hanken font-medium text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  className="font-medium font-hanken"
                  key={option.id}
                  value={option.id}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <TagSection />
    </div>
  );
};

export default HeaderSection;

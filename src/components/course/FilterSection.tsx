"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { useFilterStore } from "@/stores/filterStore";
import {
  COURSE_LEVELS,
  DURATION_RANGES,
  CATEGORIES,
  SKILLS,
} from "@/constants";
import { X, RotateCcw } from "lucide-react";
import FilterGroup from "./FilterGroup";

const FilterSection = () => {
  const {
    selectedLevels,
    selectedDurations,
    selectedCategories,
    selectedSkills,
    showFreeOnly,
    toggleLevel,
    toggleDuration,
    toggleCategory,
    toggleSkill,
    toggleFreeOnly,
    clearAllFilters,
    getActiveFiltersCount,
    initializeFromURL,
  } = useFilterStore();

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Initialize filters from URL on component mount
  useEffect(() => {
    initializeFromURL();
  }, [initializeFromURL]);

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="max-w-[280px] max-lg:hidden w-full bg-white font-hanken sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto no-scrollbar pr-2">
      <div className="py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-2xl">Filters By</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="default" className="ml-2 text-sm">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              <RotateCcw className="size-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Free Only Toggle */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="free-only"
              className="shadow-none size-6 cursor-pointer"
              checked={showFreeOnly}
              onCheckedChange={toggleFreeOnly}
            />
            <label htmlFor="free-only" className="text-base cursor-pointer">
              Free courses only
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1 h-[calc(100vh-280px)] no-scrollbar overflow-y-auto py-1 pr-2">
        <Accordion
          type="multiple"
          defaultValue={["level", "type"]}
          className="w-full"
        >
          <FilterGroup
            title="Level"
            items={COURSE_LEVELS}
            selectedItems={selectedLevels}
            onToggle={toggleLevel}
          />

          <FilterGroup
            title="Category"
            items={CATEGORIES}
            selectedItems={selectedCategories}
            onToggle={toggleCategory}
            showAll={showAllCategories}
            onToggleShowAll={() => setShowAllCategories(!showAllCategories)}
          />
        </Accordion>
      </div>
    </div>
  );
};

export default FilterSection;

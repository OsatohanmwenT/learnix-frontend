import React from "react";
import { COURSE_LEVELS, CATEGORIES, DURATION_RANGES } from "@/constants";
import { useFilterStore } from "@/stores/filterStore";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import CustomBadge from "./CustomBadge";

const TagSection = () => {
  const {
    selectedLevels,
    selectedDurations,
    selectedCategories,
    showFreeOnly,
    toggleLevel,
    toggleDuration,
    toggleCategory,
    toggleFreeOnly,
    getActiveFiltersCount,
  } = useFilterStore();

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div>
      {activeFiltersCount > 0 && (
        <div className="pb-4">
          <div className="flex flex-wrap gap-2">
            {selectedLevels.map((level) => {
              const item = COURSE_LEVELS.find((l) => l.id === level);
              return (
                <CustomBadge
                  key={level}
                  item={item}
                  onRemove={() => toggleLevel(level)}
                />
              );
            })}
            {selectedDurations.map((duration) => {
              const item = DURATION_RANGES.find((d) => d.id === duration);
              return (
                <CustomBadge
                  key={duration}
                  item={item}
                  onRemove={() => toggleDuration(duration)}
                />
              );
            })}
            {selectedCategories.map((category) => {
              const item = CATEGORIES.find((c) => c.id === category);
              return (
                <CustomBadge
                  key={category}
                  item={item}
                  onRemove={() => toggleCategory(category)}
                />
              );
            })}
            {showFreeOnly && (
              <CustomBadge
                item={{ id: "free", label: "Free" }}
                onRemove={toggleFreeOnly}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSection;

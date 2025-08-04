import React from "react";
import { COURSE_LEVELS, SUBJECTS, DURATION_RANGES } from "@/constants";
import { useFilterStore } from "@/stores/filterStore";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import CustomBadge from "./CustomBadge";

const TagSection = () => {
  const {
    selectedLevels,
    selectedDurations,
    selectedSubjects,
    showFreeOnly,
    toggleLevel,
    toggleDuration,
    toggleSubject,
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
            {selectedSubjects.map((subject) => {
              const item = SUBJECTS.find((s) => s.id === subject);
              return (
                <CustomBadge
                  key={subject}
                  item={item}
                  onRemove={() => toggleSubject(subject)}
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

import { create } from "zustand";

interface FilterState {
  // Filter selections
  selectedLevels: string[];
  selectedDurations: string[];
  selectedSubjects: string[];
  selectedSkills: string[];

  // Sort and search
  sortBy: string;
  showFreeOnly: boolean;

  // Actions
  toggleLevel: (level: string) => void;
  toggleDuration: (duration: string) => void;
  toggleSubject: (subject: string) => void;
  toggleSkill: (skill: string) => void;
  setSortBy: (sort: string) => void;
  toggleFreeOnly: () => void;
  clearAllFilters: () => void;
  getActiveFiltersCount: () => number;
  updateURL: () => void;
  initializeFromURL: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  // Initial state
  selectedLevels: [],
  selectedTypes: [],
  selectedDurations: [],
  selectedSubjects: [],
  selectedSkills: [],
  selectedLanguages: [],
  selectedPartners: [],
  sortBy: "best-match",
  showFreeOnly: false,

  // Actions
  toggleLevel: (level) =>
    set((state) => {
      const newSelectedLevels = state.selectedLevels.includes(level)
        ? state.selectedLevels.filter((l) => l !== level)
        : [...state.selectedLevels, level];

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (newSelectedLevels.length > 0) {
          url.searchParams.set("difficulty", newSelectedLevels.join(","));
        } else {
          url.searchParams.delete("difficulty");
        }
        window.history.replaceState({}, "", url.toString());
      }

      return { selectedLevels: newSelectedLevels };
    }),

  toggleDuration: (duration) =>
    set((state) => {
      const newSelectedDurations = state.selectedDurations.includes(duration)
        ? state.selectedDurations.filter((d) => d !== duration)
        : [...state.selectedDurations, duration];

      // Update URL with duration parameter
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (newSelectedDurations.length > 0) {
          url.searchParams.set("duration", newSelectedDurations.join(","));
        } else {
          url.searchParams.delete("duration");
        }
        window.history.replaceState({}, "", url.toString());
      }

      return { selectedDurations: newSelectedDurations };
    }),

  toggleSubject: (subject) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.includes(subject)
        ? state.selectedSubjects.filter((s) => s !== subject)
        : [...state.selectedSubjects, subject],
    })),

  toggleSkill: (skill) =>
    set((state) => ({
      selectedSkills: state.selectedSkills.includes(skill)
        ? state.selectedSkills.filter((s) => s !== skill)
        : [...state.selectedSkills, skill],
    })),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleFreeOnly: () => set((state) => ({ showFreeOnly: !state.showFreeOnly })),

  clearAllFilters: () => {
    set({
      selectedLevels: [],
      selectedDurations: [],
      selectedSubjects: [],
      selectedSkills: [],
      showFreeOnly: false,
    });

    // Clear URL parameters
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("difficulty");
      url.searchParams.delete("duration");
      window.history.replaceState({}, "", url.toString());
    }
  },

  getActiveFiltersCount: () => {
    const state = get();
    return (
      state.selectedLevels.length +
      state.selectedDurations.length +
      state.selectedSubjects.length +
      state.selectedSkills.length +
      (state.showFreeOnly ? 1 : 0)
    );
  },

  updateURL: () => {
    if (typeof window !== "undefined") {
      const state = get();
      const url = new URL(window.location.href);

      // Update difficulty parameter
      if (state.selectedLevels.length > 0) {
        url.searchParams.set("difficulty", state.selectedLevels.join(","));
      } else {
        url.searchParams.delete("difficulty");
      }

      // Update duration parameter
      if (state.selectedDurations.length > 0) {
        url.searchParams.set("duration", state.selectedDurations.join(","));
      } else {
        url.searchParams.delete("duration");
      }

      window.history.replaceState({}, "", url.toString());
    }
  },

  initializeFromURL: () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const difficultyParam = url.searchParams.get("difficulty");
      const durationParam = url.searchParams.get("duration");

      const updates: Partial<FilterState> = {};

      if (difficultyParam) {
        const selectedLevels = difficultyParam
          .split(",")
          .filter((level) => level.trim() !== "");
        updates.selectedLevels = selectedLevels;
      }

      if (durationParam) {
        const selectedDurations = durationParam
          .split(",")
          .filter((duration) => duration.trim() !== "");
        updates.selectedDurations = selectedDurations;
      }

      if (Object.keys(updates).length > 0) {
        set(updates);
      }
    }
  },
}));

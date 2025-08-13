import { create } from "zustand";

interface ModuleStore {
  modules: Module[];
  setInitialModules: (modules: Module[]) => void;
  addModule: (module: Module) => void;
  updateModule: (moduleId: string, updatedData: Partial<Module>) => void;
  removeModule: (moduleId: string) => void;
  generateLessonIndex: (moduleId: string) => number;
  reorderModules: (sourceIndex: number, destinationIndex: number) => void;
  addLesson: (moduleId: string, lesson: Lesson) => void;
  editLesson: (lessonId: string, title: string) => void;
  updateLesson: (lessonId: string, updatedData: Partial<Lesson>) => void;
  deleteLesson: (lessonId: string) => void;
  reorderLessons: (
    moduleId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
}

export const useModuleStore = create<ModuleStore>((set, get) => ({
  modules: [],
  setInitialModules: (modules) => set({ modules }),
  addModule: (module) =>
    set((state) => ({ modules: [...state.modules, module] })),
  updateModule: (moduleId, updatedData) =>
    set((state) => ({
      modules: state.modules.map((module) =>
        module.id === moduleId ? { ...module, ...updatedData } : module
      ),
    })),
  removeModule: (moduleId) =>
    set((state) => ({
      modules: state.modules.filter((module) => module.id !== moduleId),
    })),
    generateLessonIndex: (moduleId) => {
      const module = get().modules.find((mod) => mod.id === moduleId);
      if (module && module.lessons) {
        return module.lessons.length;
      }
      return 0;
    },
  reorderModules: (sourceIndex, destinationIndex) =>
    set((state) => {
      const newModules = [...state.modules];
      const [reorderedModule] = newModules.splice(sourceIndex, 1);
      newModules.splice(destinationIndex, 0, reorderedModule);
      return { modules: newModules };
    }),
  addLesson: (moduleId, lesson) =>
    set((state) => ({
      modules: state.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: [...(module.lessons || []), lesson] }
          : module
      ),
    })),
  editLesson: (lessonId, title) =>
    set((state) => ({
      modules: state.modules.map((module) => ({
        ...module,
        lessons: module.lessons?.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, title } : lesson
        ),
      })),
    })),
  updateLesson: (lessonId, updatedData) =>
    set((state) => ({
      modules: state.modules.map((module) => ({
        ...module,
        lessons: module.lessons?.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, ...updatedData } : lesson
        ),
      })),
    })),
  deleteLesson: (lessonId) =>
    set((state) => ({
      modules: state.modules.map((module) => ({
        ...module,
        lessons: module.lessons?.filter((lesson) => lesson.id !== lessonId),
      })),
    })),
  reorderLessons: (moduleId, sourceIndex, destinationIndex) =>
    set((state) => ({
      modules: state.modules.map((module) => {
        if (module.id === moduleId && module.lessons) {
          const newLessons = [...module.lessons];
          const [reorderedLesson] = newLessons.splice(sourceIndex, 1);
          newLessons.splice(destinationIndex, 0, reorderedLesson);
          return { ...module, lessons: newLessons };
        }
        return module;
      }),
    })),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  order?: number;
  type?: 'video' | 'text' | 'quiz' | 'assignment';
  duration?: number; // in minutes
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  order?: number;
  description?: string;
  isCompleted?: boolean;
}

interface ContentStore {
  modules: Module[];
  
  // Module actions
  setModules: (modules: Module[]) => void;
  addModule: () => void;
  deleteModule: (moduleId: string) => void;
  updateModule: (moduleId: string, updates: Partial<Omit<Module, 'id' | 'lessons'>>) => void;
  reorderModules: (startIndex: number, endIndex: number) => void;
  
  // Lesson actions
  addLesson: (moduleId: string, lessonData?: Partial<Lesson>) => void;
  deleteLesson: (lessonId: string) => void;
  updateLesson: (lessonId: string, updates: Partial<Omit<Lesson, 'id' | 'moduleId'>>) => void;
  reorderLessons: (moduleId: string, startIndex: number, endIndex: number) => void;
  
  // Utility
  generateId: () => string;
  resetStore: () => void;
  getModuleById: (moduleId: string) => Module | undefined;
  getLessonById: (lessonId: string) => { lesson: Lesson; module: Module } | undefined;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialModules: Module[] = [
  {
    id: "1",
    title: "Introduction",
    description: "Get started with the course fundamentals",
    order: 0,
    isCompleted: false,
    lessons: [
      { 
        id: "1", 
        title: "Welcome & Overview", 
        moduleId: "1", 
        order: 0, 
        type: 'video',
        duration: 10,
        isCompleted: false 
      },
      { 
        id: "2", 
        title: "Course Structure", 
        moduleId: "1", 
        order: 1, 
        type: 'text',
        duration: 5,
        isCompleted: false 
      },
      { 
        id: "3", 
        title: "Prerequisites", 
        moduleId: "1", 
        order: 2, 
        type: 'text',
        duration: 3,
        isCompleted: false 
      },
    ],
  },
];

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      modules: initialModules,
      
      // Module actions
      setModules: (modules) => set({ modules }),
      
      addModule: () => set((state) => {
        const newModule: Module = {
          id: generateId(),
          title: "New Chapter",
          description: "",
          order: state.modules.length,
          isCompleted: false,
          lessons: [],
        };
        return { modules: [...state.modules, newModule] };
      }),
      
      deleteModule: (moduleId) => set((state) => ({
        modules: state.modules.filter((module) => module.id !== moduleId)
      })),
      
      updateModule: (moduleId, updates) => set((state) => ({
        modules: state.modules.map((module) =>
          module.id === moduleId ? { ...module, ...updates } : module
        )
      })),
      
      reorderModules: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.modules);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        
        // Update order property
        const updatedModules = result.map((module, index) => ({
          ...module,
          order: index
        }));
        
        return { modules: updatedModules };
      }),
      
      // Lesson actions
      addLesson: (moduleId, lessonData = {}) => set((state) => {
        const targetModule = state.modules.find(m => m.id === moduleId);
        if (!targetModule) return state;
        
        const newLesson: Lesson = {
          id: generateId(),
          title: "New Lesson",
          moduleId,
          order: targetModule.lessons.length,
          type: 'video',
          duration: 0,
          isCompleted: false,
          ...lessonData,
        };
        
        return {
          modules: state.modules.map((module) =>
            module.id === moduleId
              ? { ...module, lessons: [...module.lessons, newLesson] }
              : module
          )
        };
      }),
      
      deleteLesson: (lessonId) => set((state) => ({
        modules: state.modules.map((module) => ({
          ...module,
          lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
        }))
      })),
      
      updateLesson: (lessonId, updates) => set((state) => ({
        modules: state.modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, ...updates } : lesson
          ),
        }))
      })),
      
      reorderLessons: (moduleId, startIndex, endIndex) => set((state) => {
        const moduleIndex = state.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex === -1) return state;
        
        const module = state.modules[moduleIndex];
        const result = Array.from(module.lessons);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        
        // Update order property
        const updatedLessons = result.map((lesson, index) => ({
          ...lesson,
          order: index
        }));
        
        const updatedModules = [...state.modules];
        updatedModules[moduleIndex] = { ...module, lessons: updatedLessons };
        
        return { modules: updatedModules };
      }),
      
      // Utility functions
      generateId,
      
      resetStore: () => set({ modules: initialModules }),
      
      getModuleById: (moduleId) => {
        return get().modules.find(module => module.id === moduleId);
      },
      
      getLessonById: (lessonId) => {
        const modules = get().modules;
        for (const module of modules) {
          const lesson = module.lessons.find(l => l.id === lessonId);
          if (lesson) {
            return { lesson, module };
          }
        }
        return undefined;
      },
      
      getTotalLessons: () => {
        return get().modules.reduce((total, module) => total + module.lessons.length, 0);
      },
      
      getTotalDuration: () => {
        return get().modules.reduce((total, module) => 
          total + module.lessons.reduce((moduleTotal, lesson) => 
            moduleTotal + (lesson.duration || 0), 0
          ), 0
        );
      },
      
      getCompletionStats: () => {
        const modules = get().modules;
        const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
        const completedLessons = modules.reduce((total, module) => 
          total + module.lessons.filter(lesson => lesson.isCompleted).length, 0
        );
        
        return {
          completed: completedLessons,
          total: totalLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        };
      },
    }),
    {
      name: 'course-structure-storage',
      // Only persist essential data, exclude functions
      partialize: (state) => ({ modules: state.modules }),
    }
  )
);

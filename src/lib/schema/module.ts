import z from "zod";

export const ContentType = [
  "text",
  "video",
  "audio",
  "image",
  "quiz",
  "assignment",
  "file",
] as const;

export const moduleSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
});

export const lessonSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters"),
  contentType: z.enum(ContentType),
  contentData: z
    .string()
    .min(1, "Content data is required")
    .max(1000, "Content data must be less than 1000 characters"),
  durationMinutes: z.coerce
    .number()
    .min(0, "Duration must be positive")
    .optional(),
    order: z.number().optional()
});

export type ModuleSchema = z.infer<typeof moduleSchema>;
export type CreateLessonSchema = z.input<typeof lessonSchema>;
export type LessonSchema = z.infer<typeof lessonSchema>;

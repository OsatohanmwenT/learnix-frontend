import { z } from "zod";

export const difficulty = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

export const difficultySchema = z.enum(difficulty, {
  message: "Invalid difficulty level",
});

export const category = [
  "Web development",
  "Data science",
  "Graphic design",
  "Business",
  "Music",
  "Photography",
  "Science",
  "Health & Fitness",
] as const;

export const status = ["draft", "published", "archived"] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100),
  smallDescription: z
    .string()
    .min(10, {
      message: "Small description must be at least 10 characters long",
    })
    .max(200),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  category: z.enum(category, {
    message: "Invalid course category",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500),
  estimatedHours: z.coerce
    .number({ message: "Estimated hours must be a valid number" })
    .min(1, { message: "Estimated hours must be at least 1 hour" })
    .max(500),
  thumbnailUrl: z.string({ message: "Invalid URL format" }),
  status: z.enum(status, {
    message: "Invalid course status",
  }),
  difficulty: difficultySchema,
});

// Form schema that accepts strings for numeric fields
export const editCourseFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100),
  smallDescription: z
    .string()
    .min(10, {
      message: "Small description must be at least 10 characters long",
    })
    .max(200),
  price: z.string().min(1, { message: "Price is required" }),
  category: z.enum(category, {
    message: "Invalid course category",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500),
  estimatedHours: z.string().min(1, { message: "Estimated hours is required" }),
  thumbnailUrl: z.string({ message: "Invalid URL format" }),
  status: z.enum(status, {
    message: "Invalid course status",
  }),
  difficulty: z.enum(difficulty, {
    message: "Invalid difficulty level",
  }),
});

export type EditCourseFormType = z.infer<typeof editCourseFormSchema>;

export type CreateCourseInput = z.input<typeof courseSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;

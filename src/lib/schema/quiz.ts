import { z } from "zod";

export const questionTypes = [
  "multiple_choice",
  "true_false",
  "short_answer",
  "long_answer",
] as const;

export const difficultyLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

export const createQuizSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  lessonId: z.string().uuid().optional(),
  difficulty: z.enum(difficultyLevels).default("intermediate"),
  maxAttempts: z
    .number()
    .min(1, "Max attempts must be at least 1")
    .max(10, "Max attempts cannot exceed 10")
    .default(1),
  timeLimit: z
    .number()
    .min(1, "Time limit must be at least 1 minute")
    .max(480, "Time limit cannot exceed 480 minutes")
    .optional(),
  passingScore: z
    .number()
    .min(0, "Passing score must be at least 0")
    .max(100, "Passing score cannot exceed 100")
    .default(70),
  randomizeQuestions: z.boolean().default(false),
  showCorrectAnswers: z.boolean().default(true),
});

// Answer option schema
export const answerOptionSchema = z.object({
  text: z
    .string()
    .min(1, "Answer option text is required")
    .max(500, "Answer option text must be less than 500 characters"),
  isCorrect: z.boolean(),
  explanation: z
    .string()
    .max(1000, "Explanation must be less than 1000 characters")
    .optional(),
  orderIndex: z.number().min(1, "Order index must be at least 1"),
});

// Question schema
export const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  questionType: z.enum([
    "multiple_choice",
    "true_false",
    "short_answer",
    "long_answer",
  ]),
  points: z.number().min(1).max(100),
  feedback: z.string().optional(),
  answerOptions: z
    .array(
      z.object({
        text: z.string().min(1, "Answer text is required"),
        isCorrect: z.boolean(),
      })
    )
    .optional(),
  correctAnswer: z.string().optional(),
});

export const createQuestionsSchema = z.object({
  quizQuestions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export const questionFormSchema = z
  .object({
    text: z
      .string()
      .min(1, "Question text is required")
      .max(1000, "Question text must be less than 1000 characters"),
    questionType: z.enum(questionTypes),
    correctAnswer: z
      .string()
      .max(1000, "Correct answer must be less than 1000 characters")
      .optional(),
    feedback: z
      .string()
      .max(1000, "Feedback must be less than 1000 characters")
      .optional(),
    points: z.number().min(1, "Points must be at least 1"),
    answerOptions: z
      .array(
        z.object({
          text: z.string().min(1, "Answer option text is required"),
          isCorrect: z.boolean(),
        })
      )
      .optional(),
  })
  .refine(
    (data) =>
      data.questionType !== "multiple_choice" ||
      (data.answerOptions && data.answerOptions.length >= 2),
    {
      message: "Multiple choice questions must have at least 2 options",
      path: ["answerOptions"],
    }
  );


export const editQuestionSchema = questionSchema.extend({
  id: z.uuid().optional(),
});

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
export type QuestionFormData = z.infer<typeof questionFormSchema>;
export type AnswerOptionSchema = z.infer<typeof answerOptionSchema>;
export type CreateQuestionsSchema = z.infer<typeof createQuestionsSchema>;
export type EditQuestionSchema = z.infer<typeof editQuestionSchema>;

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { addQuestionsToQuiz, updateQuestion } from "@/lib/actions/quiz";
import { BasicQuestionFields } from "./QuestionForm/BasicQuestionFields";
import { AnswerOptionsSection } from "./QuestionForm/AnswerOptionsSection";
import {
  QuestionFormData,
  questionFormSchema,
} from "@/lib/schema/quiz";
import { useState } from "react";

interface QuestionFormProps {
  quizId: string;
  question?: Question;
  onSuccess: (question: Question) => void;
  onCancel: () => void;
}

export default function QuestionForm({
  quizId,
  question,
  onSuccess,
  onCancel,
}: QuestionFormProps) {
  const isEditing = !!question;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      text: question?.text ?? "",
      questionType: question?.questionType ?? "multiple_choice",
      points: question?.points ?? 1,
      feedback: question?.feedback ?? "",
      answerOptions: question?.answerOptions?.map((option) => ({
        text: option.text ?? "",
        isCorrect: !!option.isCorrect,
      })) ?? [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
      correctAnswer: question?.correctAnswer ?? "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answerOptions",
  });

  const onSubmit = async (data: QuestionFormData) => {
    setIsLoading(true);
    console.log("Submitting question data:", data);
    const questionData = {
      ...data,
      orderIndex: question?.orderIndex || 1,
      isActive: true,
      answerOptions: (data.answerOptions || []).map((option, index) => ({
        text: option.text,
        isCorrect: option.isCorrect,
        explanation: "",
        orderIndex: index + 1,
      })),
    };
    try {
      if (isEditing && question?.id) {
        const questionResponse = await updateQuestion(question.id, questionData);
        if (!questionResponse.success) {
          throw new Error(questionResponse.message);
        }

        if (questionResponse.data) {
          onSuccess(questionResponse.data);
        }
        toast.success("Question updated successfully");
      } else {
          const questionResponse = await addQuestionsToQuiz(quizId, {
          quizQuestions: [questionData],
        });
        
        let createdQuestion;
        if (questionResponse.data) {
          if ('questions' in questionResponse.data && Array.isArray(questionResponse.data.questions)) {
            createdQuestion = questionResponse.data.questions[0];
          }
        }
        
        if (createdQuestion) {
          onSuccess(createdQuestion);
        }
        
        toast.success("Question added successfully");
      }
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update question" : "Failed to add question"
      );
    } finally {
      setIsLoading(false);
      onCancel()
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicQuestionFields
          form={form}
          questionType={form.watch("questionType")}
        />

        <AnswerOptionsSection
          form={form}
          fields={fields}
          append={append}
          remove={remove}
          questionType={form.watch("questionType")}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEditing ? "Updating..." : "Adding..."}
              </div>
            ) : isEditing ? (
              "Update Question"
            ) : (
              "Add Question"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

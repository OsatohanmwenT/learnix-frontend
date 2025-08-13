"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuestionForm from "@/components/quiz/QuestionForm";
import {
  LoadingPage,
  EmptyState,
  DeleteConfirmDialog,
} from "@/components/shared";
import { QuestionCard, QuizInfoCard } from "@/components/quiz";
import { useQuestionStore } from "@/stores/questionStore";
import { useQuizOperations } from "@/hooks/useQuizOperations";

export default function QuizQuestionsPage() {
  const params = useParams();
  const quizId = params.id as string;

  const { questions, loading, dialog, openDialog, closeDialog } =
    useQuestionStore();

  const {
    currentQuiz,
    handleQuestionAdded,
    handleQuestionUpdated,
    handleDeleteQuestion,
  } = useQuizOperations(quizId);

  if (loading) {
    return <LoadingPage text="Loading quiz..." />;
  }

  if (!currentQuiz) {
    return (
      <div className="container mx-auto p-6">
        <EmptyState
          icon={ArrowLeft}
          title="Quiz not found"
          description="The quiz you're looking for doesn't exist."
          actionLabel="Back to Quizzes"
          actionHref="/instructor/quizzes"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <Link
          href="/instructor/quizzes"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Link>
      </div>

      <QuizInfoCard quiz={currentQuiz} className="mb-6" />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Questions</CardTitle>
              <CardDescription>
                Manage the questions for this quiz
              </CardDescription>
            </div>
            <Button onClick={() => openDialog("add")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!questions || questions.length === 0 ? (
            <EmptyState
              icon={Plus}
              title="No questions yet"
              description="Start building your quiz by adding the first question."
              actionLabel="Add First Question"
              onAction={() => openDialog("add")}
            />
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  onEdit={(question) => openDialog("edit", question)}
                  onDelete={(question) => openDialog("delete", question)}
                  isDraggable={true}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Question Dialog */}
      <Dialog open={dialog.type === "add"} onOpenChange={() => closeDialog()}>
        <DialogContent className="w-full !max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
          </DialogHeader>
          <QuestionForm
            quizId={quizId}
            onSuccess={handleQuestionAdded}
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Question Dialog */}
      <Dialog open={dialog.type === "edit"} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          {dialog.question && (
            <QuestionForm
              quizId={quizId}
              question={dialog.question}
              onSuccess={handleQuestionUpdated}
              onCancel={closeDialog}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Question Confirmation */}
      <DeleteConfirmDialog
        isOpen={dialog.type === "delete"}
        onClose={closeDialog}
        onConfirm={handleDeleteQuestion}
        title="Delete Question"
        description="Are you sure you want to delete this question? This action cannot be undone."
      />
    </div>
  );
}

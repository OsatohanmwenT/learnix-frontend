"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Search, Filter, FileQuestion } from "lucide-react";
import { fetchInstructorQuizzes, deleteQuiz } from "@/lib/actions/quiz";
import { useQuizStore } from "@/stores/quizStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  LoadingPage,
  EmptyState,
  DeleteConfirmDialog,
} from "@/components/shared";
import { QuizCard } from "@/components/quiz";

export default function InstructorQuizzesPage() {
  const {
    loading,
    searchQuery,
    showDeleteDialog,
    quizToDelete,
    setQuizzes,
    setLoading,
    setSearchQuery,
    openDeleteDialog,
    closeDeleteDialog,
    removeQuiz,
    filteredQuizzes,
  } = useQuizStore();

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const response = await fetchInstructorQuizzes();
        console.log(response.data);
        if (response.success && response.data) {
          setQuizzes(response.data.quizzes);
        } else {
          toast.error(response.message || "Failed to load quizzes");
          if (response.redirectUrl) {
            window.location.href = response.redirectUrl;
          }
        }
      } catch (error) {
        console.error("Error loading quizzes:", error);
        toast.error("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [setQuizzes, setLoading]);

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;

    setIsDeleting(true);
    try {
      const response = await deleteQuiz(quizToDelete.id);
      if (response.success) {
        removeQuiz(quizToDelete.id);
        toast.success("Quiz deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete quiz");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    } finally {
      setIsDeleting(false);
      closeDeleteDialog();
    }
  };

  if (loading) {
    return <LoadingPage text="Loading quizzes..." />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Quizzes</h1>
          <p className="text-gray-600 mt-1">
            Create and manage quizzes for your courses
          </p>
        </div>
        <Link
          href="/instructor/quizzes/create"
          className={buttonVariants({ className: "mt-4 sm:mt-0" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Quiz
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {filteredQuizzes().length === 0 ? (
        <EmptyState
          icon={FileQuestion}
          title={searchQuery ? "No quizzes found" : "No quizzes yet"}
          description={
            searchQuery
              ? "Try adjusting your search terms"
              : "Create your first quiz to get started"
          }
          actionLabel={!searchQuery ? "Create Your First Quiz" : undefined}
          actionHref={!searchQuery ? "/instructor/quizzes/create" : undefined}
          showAction={!searchQuery}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredQuizzes().map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={openDeleteDialog} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteQuiz}
        title="Delete Quiz"
        description={`Are you sure you want to delete "${quizToDelete?.title}"? This action cannot be undone and will remove all associated questions and student attempts.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

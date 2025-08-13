"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { completeLessonById } from "@/lib/actions/lesson";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LessonCompleteButtonProps {
  lessonId: string;
  className?: string;
}

const LessonCompleteButton = ({
  lessonId,
  className,
}: LessonCompleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCompleteLesson = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await completeLessonById(lessonId);

      if (result.success) {
        toast.success(result.message || "Lesson completed successfully!");
        // Refresh the page to update progress
        router.refresh();
      } else {
        if (result.redirectUrl) {
          router.push(result.redirectUrl);
        } else {
          toast.error(result.message || "Failed to complete lesson");
        }
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
      toast.error("Failed to complete lesson. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCompleteLesson}
      disabled={isLoading}
      className={`bg-emerald-500 hover:bg-light-green ${
        className || ""
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Completing...
        </>
      ) : (
        <>
          <CheckCircle className="w-4 h-4" />
          Mark as Complete
        </>
      )}
    </Button>
  );
};

export default LessonCompleteButton;

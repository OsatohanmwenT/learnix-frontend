"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  type: "module" | "lesson";
  onDelete: () => Promise<void>;
  isLoading?: boolean;
}

const DeleteDialog = ({
  type,
  onDelete,
  isLoading = false,
}: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete();
      setOpen(false);
    } catch (error) {
      // Error handling is done in the parent component
      console.error(`Failed to delete ${type}:`, error);
    }
  };

  const getTitle = () => {
    return type === "module" ? "Delete Module" : "Delete Lesson";
  };

  const getDescription = () => {
    if (type === "module") {
      return "This action cannot be undone. This will permanently delete this module and all its lessons from the course.";
    }
    return "This action cannot be undone. This will permanently delete this lesson from the module.";
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          <AlertDialogDescription>{getDescription()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;

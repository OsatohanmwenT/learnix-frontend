import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Edit, Trash2 } from "lucide-react";
import { getQuestionTypeColor, formatQuestionType } from "@/lib/utils/quiz";
import { AnswerOptions } from "./AnswerOptions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
  isDraggable?: boolean;
}

export function QuestionCard({
  question,
  index,
  onEdit,
  onDelete,
  isDraggable = false,
}: QuestionCardProps) {
  return (
    <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {isDraggable && (
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
              )}
              <span className="text-sm font-medium text-gray-500">
                Question {index + 1}
              </span>
              <Badge className={cn("border rounded-xs",getQuestionTypeColor(question.questionType))}>
                {formatQuestionType(question.questionType)}
              </Badge>
              <Badge className="border rounded-xs" variant="outline">
                {question.points} point{question.points !== 1 ? "s" : ""}
              </Badge>
            </div>

            {/* Question Text */}
            <h4 className="font-medium text-gray-900 mb-3 leading-relaxed">
              {question.text}
            </h4>

            {/* Answer Options */}
            <AnswerOptions question={question} />

            {/* Feedback */}
            {question.feedback && (
              <p className="text-sm text-gray-600 mt-3 p-2 bg-blue-50 border border-blue-200 rounded italic">
                <span className="font-medium">Feedback:</span>{" "}
                {question.feedback}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(question)}
              className="h-8 w-8 p-0"
              title="Edit question"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(question)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Delete question"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

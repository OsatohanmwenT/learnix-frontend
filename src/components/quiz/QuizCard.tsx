import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Users,
  Target,
  FileQuestion,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import {
  getDifficultyColor,
  formatQuizDuration,
  formatAttemptText,
} from "@/lib/utils/quiz";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: Quiz;
  onDelete?: (quiz: Quiz) => void;
  showActions?: boolean;
  baseUrl?: string;
}

export function QuizCard({
  quiz,
  onDelete,
  showActions = true,
  baseUrl = "/instructor/quizzes",
}: QuizCardProps) {
  const questionCount = quiz.questions?.length || quiz.totalQuestions || 0;

  return (
    <Card className="hover:shadow-lg rounded-sm transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{quiz.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {quiz.description}
            </CardDescription>
          </div>

          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`${baseUrl}/${quiz.id}/questions`}>
                    <FileQuestion className="h-4 w-4 mr-2" />
                    Manage Questions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${baseUrl}/${quiz.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Quiz
                  </Link>
                </DropdownMenuItem>
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(quiz)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge
            className={cn("rounded-xs", getDifficultyColor(quiz.difficulty))}
          >
            {quiz.difficulty}
          </Badge>
          {quiz.timeLimit && (
            <Badge className="rounded-xs" variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {formatQuizDuration(quiz.timeLimit)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <FileQuestion className="h-4 w-4 mr-1" />
              {questionCount} questions
            </span>
            <span className="flex items-center text-gray-600">
              <Target className="h-4 w-4 mr-1" />
              {quiz.passingScore}% to pass
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              {quiz.maxAttempts} {formatAttemptText(quiz.maxAttempts)}
            </span>
            <span className="text-gray-500">{formatDate(quiz.createdAt)}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Link href={`${baseUrl}/${quiz.id}/questions`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                {questionCount === 0 ? "Add Questions" : "Manage Questions"}
              </Button>
            </Link>
            <Link href={`${baseUrl}/${quiz.id}/results`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                disabled={questionCount === 0}
              >
                View Results
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

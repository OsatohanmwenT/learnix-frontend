import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDifficultyColor, formatQuizDuration } from "@/lib/utils/quiz";
import { cn } from "@/lib/utils";

interface QuizInfoCardProps {
  quiz: Quiz;
  className?: string;
}

interface QuizStatItem {
  label: string;
  value: string | number;
}

export function QuizInfoCard({ quiz, className }: QuizInfoCardProps) {
  const stats: QuizStatItem[] = [
    {
      label: "Questions",
      value: quiz.totalQuestions || 0,
    },
    {
      label: "Passing Score",
      value: `${quiz.passingScore}%`,
    },
    {
      label: "Max Attempts",
      value: quiz.maxAttempts,
    },
    {
      label: "Time Limit",
      value: quiz.timeLimit ? formatQuizDuration(quiz.timeLimit) : "No limit",
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription className="mt-2 text-base">
              {quiz.description}
            </CardDescription>
          </div>
          <Badge className={cn("!rounded-xs text-sm font-hanken", getDifficultyColor(quiz.difficulty))}>
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-gray-500">{stat.label}</p>
              <p className="font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

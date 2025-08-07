import React from "react";
import { Progress } from "../ui/progress";
import { Trophy, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";

interface RecentQuizCardProps {
  title: string;
  courseName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  completedAt: string;
  difficulty: string;
}

const RecentQuizCard: React.FC<RecentQuizCardProps> = ({
  title,
  courseName,
  score,
  totalQuestions,
  correctAnswers,
  timeSpent,
  completedAt,
  difficulty,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isPassed = score >= 70;

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 min-w-[280px] max-w-[320px] font-hanken cursor-pointer hover:shadow-sm transition-all duration-200">
      {/* Header with Icon and Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
          <Trophy className="size-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">
            {title}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide">QUIZ</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Score</span>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${getScoreColor(score)}`}>
              {score}%
            </span>
            {isPassed ? (
              <CheckCircle className="size-4 text-green-500" />
            ) : (
              <XCircle className="size-4 text-red-500" />
            )}
          </div>
        </div>
        <Progress
          barColor={getScoreBarColor(score)}
          value={score}
          max={100}
          className="h-2"
        />
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <span>
            {correctAnswers}/{totalQuestions} correct
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="size-3" />
          <span>{timeSpent}m</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">{formatDate(completedAt)}</span>
        <div className="flex gap-2">
          <Button className="px-3 py-1.5 text-xs border border-gray-300 rounded-md transition-colors">
            Review
          </Button>
          <Button className="px-3 py-1.5 cursor-pointer text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Retake
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentQuizCard;

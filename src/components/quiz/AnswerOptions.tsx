import { CheckCircle } from "lucide-react";

interface AnswerOptionsProps {
  question: Question;
}

export function AnswerOptions({ question }: AnswerOptionsProps) {
  return (
    <div className="space-y-2 mt-3">
      <p className="text-sm font-medium text-gray-700 mb-2">Answer Options:</p>
      {question.answerOptions.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className={`text-sm px-3 py-2 rounded-xs border flex items-center justify-between transition-colors ${
            option.isCorrect
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-gray-50 border-gray-200 text-gray-700"
          }`}
        >
          <span>
            <span className="font-medium mr-2">
              {String.fromCharCode(65 + optionIndex)}.
            </span>
            {option.text}
          </span>
          {option.isCorrect && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Correct</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

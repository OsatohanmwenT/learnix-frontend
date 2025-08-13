import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({
  size = "md",
  className,
  text,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-b-2 border-gray-900",
          sizeClasses[size],
          className
        )}
      />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
}

interface LoadingPageProps {
  text?: string;
  className?: string;
}

export function LoadingPage({
  text = "Loading...",
  className,
}: LoadingPageProps) {
  return (
    <div className={cn("container mx-auto p-6", className)}>
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  showAction?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  showAction = true,
}: EmptyStateProps) {
  const renderAction = () => {
    if (!showAction || !actionLabel) return null;

    if (actionHref) {
      return (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      );
    }

    if (onAction) {
      return <Button onClick={onAction}>{actionLabel}</Button>;
    }

    return null;
  };

  return (
    <Card className={cn("text-center py-12", className)}>
      <CardContent>
        <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {renderAction()}
      </CardContent>
    </Card>
  );
}

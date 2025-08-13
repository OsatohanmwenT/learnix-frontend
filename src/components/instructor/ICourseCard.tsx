import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock, Layers, Users } from "lucide-react";

type ICourseCardProps = {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string | null;
  status?: "Published" | "Draft";
  duration?: string; // e.g., "50h"
  level?: string; // e.g., "Beginner"
  enrollmentCount?: number;
  editHref?: string; // optional override
};

const ICourseCard: React.FC<ICourseCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
  status = "Published",
  duration,
  level,
  enrollmentCount,
  editHref,
}) => {
  const href = editHref || `/instructor/courses/${id}`;

  return (
    <div className="bg-white h-full rounded-sm font-hanken overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all">
      {/* Thumbnail */}
      <div className="relative w-full h-44 sm:h-56">
        <Image
          src={
            thumbnailUrl || "https://placehold.co/600x400.png" // fallback from public/
          }
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
        {/* Status Badge */}
        {status && (
          <span className="absolute top-3 right-3 text-[11px] sm:text-xs px-2 py-1 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
            {status}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-800 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 line-clamp-2">
            {description}
          </p>
        )}

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-neutral-600">
          {duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {duration}
            </span>
          )}
          {level && (
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" /> {level}
            </span>
          )}
          {typeof enrollmentCount === "number" && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {enrollmentCount} enrolled
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 self-end sm:px-4 pb-4">
        <Link href={href} className="block w-full">
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-[15px] rounded-sm py-2 transition-colors">
            Edit Course
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ICourseCard;

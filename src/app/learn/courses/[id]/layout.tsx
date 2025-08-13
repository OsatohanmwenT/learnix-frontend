import ProgressSidebar from "@/components/learn/ProgressSidebar";
import React, { ReactNode } from "react";

const CourseIDLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string, lessonId: string }>;
}) => {
  const { id, lessonId } = await params;

  return (
    <div className="flex h-full gap-4 relative">
      <div className="w-[calc(100%-300px)]">{children}</div>
      <ProgressSidebar courseId={id} />
    </div>
  );
};

export default CourseIDLayout;

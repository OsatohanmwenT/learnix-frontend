import Navbar from "@/components/shared/Navbar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import { requireInstructorOrAdmin } from "@/lib/auth/permissions";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  await requireInstructorOrAdmin();

  return (
    <div className="flex relative bg-[#f7f8fa] min-h-screen">
      <Navbar />
      <InstructorSidebar />
      <main className="w-full pt-17 pl-64 overflow-auto">{children}</main>
    </div>
  );
};

export default layout;

import Navbar from "@/components/shared/Navbar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative bg-[#f7f8fa] h-screen">
      <Navbar />
      <InstructorSidebar />
      <main className="w-full pt-17 pl-64 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default layout;

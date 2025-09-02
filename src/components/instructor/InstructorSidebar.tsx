"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  FileQuestion,
  Plus,
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/instructor",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    label: "Courses",
    href: "/instructor/courses",
    icon: <BookOpen className="size-5" />,
  },
  {
    label: "Quizzes",
    href: "/instructor/quizzes",
    icon: <FileQuestion className="size-5" />,
  },
];

const InstructorSidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/instructor") {
      return pathname === "/instructor";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 h-screen fixed left-0 top-0 z-10 flex flex-col">
      {/* Header */}
      <div className="p-5 border-neutral-200">
        <h2 className="text-xl font-hanken font-bold text-neutral-800">
          Instructor Portal
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {/* Quick Create Course Button */}
        <div className="mb-6">
          <Link href="/instructor/courses/create" className="block">
            <Button className="w-full bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 rounded-sm justify-start font-hanken font-medium">
              <Plus className="size-4 mr-2" />
              Quick Create Course
            </Button>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <div
                className={`flex items-center px-3 py-2 rounded-sm text-sm font-hanken font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 font-hanken">
          Instructor Dashboard v1.0
        </p>
      </div>
    </aside>
  );
};

export default InstructorSidebar;

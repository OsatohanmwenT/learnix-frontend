"use client";

import { Book, Lightbulb, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "../ui/separator";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sections: {
  heading?: string;
  items: NavItem[];
}[] = [
  {
    items: [
      { label: "Progress", href: "/learn", icon: <Rocket className="size-5" /> },
      {
        label: "My Library",
        href: "/learn/my-library",
        icon: <Book className="size-5" />,
      },
    ],
  },
  {
    heading: "LEARN",
    items: [
      {
        label: "Courses",
        href: "/learn/courses",
        icon: <Lightbulb className="size-5" />,
      },
      {
        label: "Assessments",
        href: "/learn/assessments",
        icon: <Lightbulb className="size-5" />,
      },
    ],
  },
];

const SideNavbar = () => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  console.log("segments", segments);

  return (
    <aside className="bg-dark-blue mt-16 w-[280px] h-[calc(100vh-64px)]">
      <nav className="py-4 px-2 font-poppins h-full w-full text-sm font-medium space-y-6 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.heading && (
              <>
                <Separator className="bg-gray-500 my-3" />
                <span className="px-2 tracking-wide text-xs text-gray-300">
                  {section.heading}
                </span>
              </>
            )}

            <ul className="mt-3 space-y-3">
              {section.items.map((item) => {
                // Improved active state logic
                const isActive = (() => {
                  // Exact match
                  if (pathname === item.href) {
                    return true;
                  }
                  
                  // For nested routes, but exclude the base /learn route
                  // to prevent it from being active when on /learn/my-library
                  if (item.href !== "/learn" && pathname.startsWith(item.href + "/")) {
                    return true;
                  }
                  
                  return false;
                })();

                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <div
                        className={`flex items-center space-x-3 px-4 py-1 transition-all hover:border-l-4 ${
                          isActive
                            ? "border-emerald-400 border-l-4 text-white bg-emerald-800/10"
                            : "border-transparent text-neutral-400 hover:border-emerald-400"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SideNavbar;
"use client";

import React from "react";
import { cn } from "@/lib/utils"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/")
  const query = useSearchParams().get("query") || "";
  const [searchQuery, setSearchQuery] = React.useState(query);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/courses?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center max-lg:hidden gap-4 relative">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search courses, topics, instructors..."
        className={cn("h-auto shadow-none !text-sm border-2 min-w-[400px] py-2.5 rounded-full w-full", segments[1] === "learn" ? "border-neutral-200 text-black" : "border-gray-400 text-white")}
      />
      <Button
        onClick={handleSearch}
        className="bg-[#278576] hover:bg-[#2a7c6e] absolute h-3 w-8 px-4 py-4 rounded-full right-1.5"
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;

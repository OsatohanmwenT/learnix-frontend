"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
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
        className="h-auto shadow-none border-3 !text-sm text-white border-white/80 min-w-[500px] py-3 rounded-full w-full"
      />
      <Button
        onClick={handleSearch}
        className="bg-[#278576] hover:bg-[#2a7c6e] absolute h-4 w-8 px-4 py-4 rounded-full right-2"
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;

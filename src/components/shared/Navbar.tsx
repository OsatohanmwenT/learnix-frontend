"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MenuIcon, Search } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  console.log("Current Pathname:", pathname);

  return (
    <>
      <header className={cn("p-4 px-5 lg:px-9 xl:px-16 fixed font-hanken z-20 w-full", pathname === "/" ? "bg-neutral-900/80 backdrop-blur-xl border-neutral-200" : "bg-[#002333] border-dark-green")}>
        <nav className="flex items-center justify-between mx-auto">
          <div className="flex items-center gap-4">
            <div>
              <Logo size="md" variant="light" />
            </div>
            <SearchInput />
          </div>
          <button
            className="lg:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon className="size-8" />
          </button>
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="bg-[#278576] text-white hover:bg-[#599f93] transition-all px-5 py-2 rounded-3xl font-hanken text-lg"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-[#278576] transition-all border-2 border-[#278576] px-5 py-2 rounded-3xl font-hanken text-lg"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>
      <div
        className={cn(
          "lg:hidden h-screen fixed inset-0 z-50 transition-all duration-500 top-16 left-0 right-0 bg-white p-6",
          !menuOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex flex-col space-y-4">
          <button className="w-fit" onClick={() => setMenuOpen(false)}>
            <Link
              href="/courses"
              className="text-[#278576] font-medium font-hanken text-lg hover:text-[#2a7c6e]"
            >
              Explore
            </Link>
          </button>
          <Link
            href="/sign-in"
            className="text-[#278576] font-medium font-hanken text-lg hover:text-[#2a7c6e]"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-[#278576] font-medium font-hanken text-lg hover:text-[#2a7c6e]"
          >
            Get started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

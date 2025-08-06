"use client";

import Link from "next/link";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
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
      <header className={cn("p-3 px-5 lg:px-9 xl:px-16 fixed font-hanken z-20 w-full", pathname === "/" ? "bg-neutral-900/80 backdrop-blur-xl border-neutral-200" : "bg-[#002333] border-dark-green")}>
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
            <button className="w-fit px-3 text-sm py-1 transition-all rounded-sm text-white hover:border-emerald-400 border-white h-fit border-2">
            <Link
              href="/sign-in"
              className="bg-transparent font-hanken"
            >
              Sign In
            </Link>
            </button>
            <button  className="text-dark-green font-medium transition-all border-2 bg-white border-white hover:bg-emerald-500 hover:border-emerald-500 px-3 py-1 rounded-sm text-sm font-hanken">
            <Link
              href="/sign-up"
            >
              Get started
            </Link>
            </button>
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

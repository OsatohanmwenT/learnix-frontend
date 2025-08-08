"use client";

import Link from "next/link";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import { useUser } from "@/context/UserContext";
import UserDropdown from "../dashboard/UserDropdown";
import { Button } from "../ui/button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <header
        className={cn(
          "p-4 lg:p-3 px-5 lg:px-9 fixed font-hanken border-b z-100 w-full",
          pathname === "/"
            ? "bg-neutral-900 xl:px-16 backdrop-blur-xl border-neutral-900"
            : "bg-[#002333] border-dark-green",
          segments[1] === "learn" ||
            (segments[1] === "instructor" &&
              "bg-white border-neutral-200 !px-5")
        )}
      >
        <nav className="flex items-center justify-between mx-auto">
          <div className="flex items-center gap-4">
            <div>
              <Logo size="md" variant="dark" />
            </div>
            <SearchInput />
          </div>

          <button
            className="lg:hidden cursor-pointer text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon className="size-8" />
          </button>

          {!user ? (
            <div className="hidden lg:flex items-center space-x-4">
              <button
                className={cn(
                  "w-fit px-3 py-1 cursor-pointer transition-all rounded-sm h-fit border-2",
                  segments[1] === "learn"
                    ? "text-neutral-950 hover:bg-emerald-400 border-emerald-400"
                    : "text-white hover:border-emerald-400 border-white"
                )}
              >
                <Link href="/sign-in">Sign In</Link>
              </button>
              <button
                className={cn(
                  "font-medium transition-all border-2 px-3 py-1 rounded-sm font-hanken",
                  segments[1] === "learn" || segments[1] === "instructor"
                    ? "text-neutral-950"
                    : "text-dark-green"
                )}
              >
                <Link href="/sign-up">Get started</Link>
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-3">
              {segments[1] !== "learn" && segments[1] !== "instructor" ? (
                <Link
                  href={
                    user.role === "instructor" || user.role === "admin"
                      ? "/instructor"
                      : "/learn"
                  }
                >
                  <Button className="bg-green-400 text-dark-blue font-hanken px-5 rounded-sm font-medium hover:text-white text-sm shadow-none">
                    My Dashboard
                  </Button>
                </Link>
              ) : (
                <UserDropdown user={user} />
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Mobile menu */}
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

          {!user ? (
            <>
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
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

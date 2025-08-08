import React from "react";
import {
  User,
  Settings,
  HelpCircle,
  BookOpen,
  LogOut,
  GraduationCap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

const UserDropdown = ({ user }: { user: User }) => {
  const isInstructorOrAdmin =
    user.role === "instructor" || user.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <button className="relative h-9 w-9 rounded-full cursor-pointer transition-colors focus:outline-none">
          <Avatar className="h-9 w-9">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.firstName || "User"} />
            ) : (
              <AvatarFallback className="bg-purple-500 text-white font-medium">
                {getInitials(`${user?.firstName} ${user?.lastName}` || "U S")}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 font-hanken mt-2">
        {isInstructorOrAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/learn"
                className="flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="h-4 w-4" />
                Learner Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link
            href="/learn/portfolio"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4" />
            My Portfolio
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/account/settings"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/support"
            className="flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="h-4 w-4" />
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/learn/library"
            className="flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="h-4 w-4" />
            My Library
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

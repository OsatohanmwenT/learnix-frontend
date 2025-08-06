"use client";

import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "light" | "dark";
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "default",
}) => {

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const getColors = () => {
    switch (variant) {
      case "light":
        return {
          primary: "#278576",
          secondary: "#4ade80",
          text: "#278576",
        };
      case "dark":
        return {
          primary: "#278576",
          secondary: "#4ade80",
          text: "#ffffff",
        };
      default:
        return {
          primary: "#278576",
          secondary: "#4ade80",
          text: "#278576",
        };
    }
  };

  const colors = getColors();

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={`font-poppins text-2xl tracking-wide !text-emerald-500 font-medium leading-none`}
          // style={{ color: colors.text }}
        >
          Learnix
        </span>
        {size === "lg" || size === "xl" ? (
          <span
            className="text-xs font-hanken opacity-75 -mt-1"
            style={{ color: colors.text }}
          >
            Learn • Grow • Excel
          </span>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;

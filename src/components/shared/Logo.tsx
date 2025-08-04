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
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

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
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Background Circle with Gradient */}
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main Circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#logoGradient)"
            filter="url(#glow)"
          />

          {/* Book/Learning Symbol */}
          <g transform="translate(20, 20)">
            {/* Open Book */}
            <path
              d="M-8 -6 L-8 6 L-1 4 L0 4 L1 4 L8 6 L8 -6 L1 -4 L0 -4 L-1 -4 Z"
              fill="white"
              stroke="white"
              strokeWidth="0.5"
            />

            {/* Book Pages Lines */}
            <line
              x1="-6"
              y1="-2"
              x2="-2"
              y2="-3"
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity="0.7"
            />
            <line
              x1="-6"
              y1="0"
              x2="-2"
              y2="-1"
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity="0.7"
            />
            <line
              x1="-6"
              y1="2"
              x2="-2"
              y2="1"
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity="0.7"
            />

            <line
              x1="2"
              y1="-3"
              x2="6"
              y2="-2"
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity="0.7"
            />
            <line
              x1="2"
              y1="-1"
              x2="6"
              y2="0"
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity="0.7"
            />
            <line
              x1="2"
              y1="1"
              x2="6"
              y2="2"
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity="0.7"
            />

            {/* Center Binding */}
            <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="1" />

            {/* Knowledge/Lightbulb Accent */}
            <circle cx="0" cy="-8" r="2" fill="white" opacity="0.9" />
            <circle cx="0" cy="-8" r="1" fill={colors.secondary} />
          </g>
        </svg>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span
          className={`font-poppins font-bold ${textSizeClasses[size]} leading-none`}
          style={{ color: colors.text }}
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

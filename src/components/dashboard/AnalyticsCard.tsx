"use client";

import React, { ReactNode } from "react";

type dashboardType = "admin" | "instructor" | "learn";

interface AnalyticsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

const AnalyticsCard = ({ title, value, icon }: AnalyticsCardProps) => {
  return (
    <div className="bg-white font-hanken border flex flex-col gap-3 sm:gap-4 border-neutral-300 p-3 sm:p-4 rounded-sm hover:border-neutral-400 transition-all duration-200">
      <div className="flex gap-2 sm:gap-3 items-center">
        <div className="flex-shrink-0">{icon}</div>
        <p className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">
          {title}
        </p>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default AnalyticsCard;

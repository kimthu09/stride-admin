"use client";

import React from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  className = "bg-blue-500",
}: DashboardCardProps) {
  return (
    <div
      className={`flex-1 rounded-2xl shadow-md p-5 bg-white flex items-center justify-between hover:shadow-lg transition ${className}`}
    >
      <div>
        <p className="text-white">{title}</p>
        <p className="text-5xl font-semibold text-white pt-1">{value}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white`}
      >
        {icon}
      </div>
    </div>
  );
}

import React from "react";
import { Skeleton } from "../ui/skeleton";

const ReportViewSkeleton = () => {
  return (
    <div className="md:p-10 p-4 w-full flex flex-col gap-5">
      <Skeleton className="w-72 h-10" />
      <Skeleton className="w-full h-10" />
      <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
        <Skeleton className="flex-1 rounded-2xl h-24" />
        <Skeleton className="flex-1 rounded-2xl h-24" />
        <Skeleton className="flex-1 rounded-2xl h-24" />
        <Skeleton className="flex-1 rounded-2xl h-24" />
        <Skeleton className="flex-1 rounded-2xl h-24" />
      </div>
      <Skeleton className="w-full rounded-2xl h-[300px]" />
    </div>
  );
};

export default ReportViewSkeleton;

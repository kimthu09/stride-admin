"use client";
import React, { useEffect } from "react";
import ReportFilter, { ReportFilterValue } from "./report-filter";
import { useReport } from "@/hooks/useReport";
import { FilterParams } from "@/hooks/useFilterList";
import DashboardCard from "./report-card";
import encodeParams from "@/lib/helpers/params";
import { useRouter } from "next/navigation";
import { SportReportView } from "./sport-report-view";
import SportListView from "./sport-list-view";
import { SportTypeChart } from "./sport-type-chart";
import { ActivityTable } from "./activity-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatSecondsToTime } from "@/lib/utils";
import { SportTypeAreaChart } from "./sport-type-area-chart";
import ReportViewSkeleton from "./report-view-skeleton";

const ReportView = () => {
  const router = useRouter();
  const { filters, data, isLoading, error } = useReport();

  const activityData = data?.data.activity;
  const sportData = data?.data.sportReport;
  const sportChartData = data?.data.sportMapTypes ?? [];
  const activities = data?.data.activity.recentActivities;

  const classColor = "bg-gradient-to-br from-cyan-400 to-blue-600";
  const onApplyFilters = (data: ReportFilterValue) => {
    const filterParams: FilterParams = {
      ...data,
    };
    const queryParams = encodeParams(filterParams, false);
    router.push(`?${queryParams.toString()}`);
  };

  useEffect(() => {
    if (!filters.fromDate) {
      const now = new Date().setHours(23, 59, 59, 999);
      const initialFilters: FilterParams = {
        toDate: now.toString(),
        fromDate: (now - 2592000000).toString(),
      };
      const queryParams = encodeParams(initialFilters, false);
      router.push(`?${queryParams.toString()}`);
    }
  }, [router, filters]);
  if (!data || isLoading) return <ReportViewSkeleton />;
  else if (error) return <>Failed to load.</>;
  return (
    <div className="-m-4 md:-m-10 w-[calc(100%+2rem)] md:w-[calc(100%+5rem)] bg-slate-100">
      <div className="md:p-10 p-4 w-full flex flex-col gap-5">
        <ReportFilter filters={filters} onApplyFilters={onApplyFilters} />
        <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
          <DashboardCard
            title="Activities"
            value={activityData?.numberActivity ?? 0}
            className={classColor}
          />
          <DashboardCard
            title="Distance"
            value={activityData?.totalDistance ?? 0}
            className={classColor}
          />
          <DashboardCard
            title="Time"
            value={formatSecondsToTime(activityData?.totalTime ?? 0)}
            className={classColor}
          />
          <DashboardCard
            title="Elevation Gain"
            value={activityData?.totalElevationGain ?? 0}
            className={classColor}
          />
          <DashboardCard
            title="New User"
            value={activityData?.numberUsers ?? 0}
            className={classColor}
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-5">
          <div className="flex xl:flex-col lg:flex-row flex-col gap-5">
            {sportData?.sportMapTypes &&
              sportData.sportMapTypes.length > 0 &&
              sportData.sportMapTypes.findIndex(
                (item) => item.numberActivities > 0
              ) > -1 && (
                <SportReportView
                  items={sportData?.sportMapTypes ?? []}
                  total={sportData?.numberSports ?? 0}
                />
              )}

            {sportData?.sports && sportData.sports.length > 0 && (
              <div className="flex-1">
                <SportListView items={sportData?.sports ?? []} />
              </div>
            )}
          </div>
          <SportTypeChart
            sportMapTypes={sportChartData}
            fromDate={+filters.fromDate}
            toDate={+filters.toDate}
          />
        </div>
        <SportTypeAreaChart
          sportMapTypes={sportChartData}
          fromDate={+filters.fromDate}
          toDate={+filters.toDate}
        />
        <Card className="flex flex-col flex-1">
          <CardHeader className="self-center">
            <CardTitle>Activities</CardTitle>
          </CardHeader>

          <CardContent>
            <ActivityTable
              activities={activities ?? []}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportView;

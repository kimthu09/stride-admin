"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RecentActivity } from "@/lib/types";
import TableSkeleton from "../table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatMetersToKilometers, formatSecondsToTime } from "@/lib/utils";

export const columns: ColumnDef<RecentActivity>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <span className="font-semibold">ID</span>;
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "sport",
    header: () => {
      return <span className="font-semibold">Sport</span>;
    },
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Avatar className="rounded-sm h-5 w-5">
          <AvatarImage src={row.original.sport.image ?? ""} alt="img" />
          <AvatarFallback className="rounded-sm">img</AvatarFallback>
        </Avatar>
        <span>{row.original.sport.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: () => {
      return <div className="flex justify-end">Time</div>;
    },
    cell: ({ row }) => (
      <div className="flex justify-end">
        {formatSecondsToTime(row.original.time)}
      </div>
    ),
  },
  {
    accessorKey: "gain",
    header: () => {
      return <div className="flex justify-end">Elev gain</div>;
    },
    cell: ({ row }) => (
      <div className="flex justify-end">{row.original.elevationGain} m</div>
    ),
  },
  {
    accessorKey: "distance",
    header: () => {
      return <div className="flex justify-end">Distance</div>;
    },
    cell: ({ row }) => (
      <div className="flex justify-end">
        {formatMetersToKilometers(row.original.distance ?? 0)}
      </div>
    ),
  },
  {
    accessorKey: "calories",
    header: () => {
      return <div className="flex justify-end">Calories</div>;
    },
    cell: ({ row }) => (
      <div className="flex justify-end">{row.original.calories}</div>
    ),
  },
  {
    accessorKey: "avgHeartRate",
    header: () => {
      return <div className="flex justify-end">Avg Heart Rate</div>;
    },
    cell: ({ row }) => (
      <div className="flex justify-end">{row.original.avgHeartRate}</div>
    ),
  },
];

export function ActivityTable({
  isLoading,
  activities,
}: {
  isLoading: boolean;
  activities: RecentActivity[];
}) {
  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading || !activities) {
    return (
      <TableSkeleton
        isHasExtensionAction={false}
        isHasFilter={true}
        isHasSearch={true}
        isHasChooseVisibleRow={false}
        isHasCheckBox={false}
        isHasPaging={true}
        numberRow={5}
        cells={[
          {
            percent: 1,
          },
          {
            percent: 5,
          },
          {
            percent: 1,
          },
        ]}
      ></TableSkeleton>
    );
  } else
    return (
      <div className="w-full">
        <div className="rounded-md border overflow-x-auto min-w-full max-w-[50vw] mt-4">
          <Table className="min-w-full w-max">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nothing found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
}

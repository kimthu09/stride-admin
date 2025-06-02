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

import { Sport } from "@/lib/types";
import CreateSportDialog from "./create-sport";
// import EditSportDialog from "./edit-sport";
import TableSkeleton from "../table-skeleton";
import Paging from "../paging";
import { useSportList } from "@/hooks/useSport";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapTypeView } from "./order-status-view";
import CategoryList from "../category/category-list";
import encodeParams from "@/lib/helpers/params";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LuFilter } from "react-icons/lu";
import DeleteSport from "./delete-sport";
import EditSportDialog from "./edit-sport";

export const columns: ColumnDef<Sport>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <span className="font-semibold">ID</span>;
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: () => {},
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Avatar className="rounded-sm h-7 w-7">
          <AvatarImage src={row.original.image ?? ""} alt="img" />
          <AvatarFallback className="rounded-sm">img</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => {
      return <span className="font-semibold">Name</span>;
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: () => {
      return <span className="font-semibold">Category</span>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category.name}</div>
    ),
  },
  {
    accessorKey: "color",
    header: () => {
      return <span className="font-semibold">Color</span>;
    },
    cell: ({ row }) => (
      <div
        className="h-10 w-10 aspect-square rounded-md border p-[2px]  bg-transparent"
      >
        <div
          className="h-full w-full rounded-sm"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "sportMapType",
    header: () => {
      return <span className="font-semibold">Map Type</span>;
    },
    cell: ({ row }) => (
      <div className="capitalize w-min">
        <MapTypeView type={row.original.sportMapType} />
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => {
      return <div className="font-semibold">Actions</div>;
    },
    cell: () => <></>,
  },
];

export function SportTable() {
  const router = useRouter();

  const { filters, data, isLoading, error, mutate } = useSportList();
  const [categoryIdSearch, setCategoryIdSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  const sports: Sport[] = data?.data.data || [];
  const table = useReactTable({
    data: sports,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setCategoryIdSearch(filters.categoryId);
    setNameSearch(filters.name);
  }, [filters]);

  if (isLoading || !data) {
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
  } else if (error) {
    return <div>Failed to load</div>;
  } else
    return (
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="table___title">Manage Sport</h1>
          <CreateSportDialog onAdded={() => void mutate()} />
        </div>
        <div className="py-4 flex gap-2">
          <div className="w-52">
            <CategoryList
              isId
              category={categoryIdSearch}
              setCategory={(value: string | number) => {
                setCategoryIdSearch(value.toString());
              }}
              className="w-52"
            />
          </div>

          <Input
            placeholder="Search by name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <Button
            variant={"outline"}
            onClick={() => {
              const newFilters = {
                ...filters,
                categoryId: categoryIdSearch,
                name: nameSearch,
              };
              const queryParams = encodeParams(newFilters);
              router.push(`?${queryParams.toString()}`);
            }}
          >
            Filter
            <LuFilter className="ml-1 h-4 w-4" />
          </Button>
        </div>
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
                    {row.getVisibleCells().map((cell) =>
                      cell.id.includes("actions") ? (
                        <TableCell key={cell.id} className="flex py-2 gap-2">
                          <EditSportDialog
                            sport={row.original}
                            onAdded={() => void mutate()}
                          />
                          <DeleteSport
                            id={row.original.id}
                            onDelete={() => void mutate()}
                          />
                        </TableCell>
                      ) : (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
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

        <div className="flex items-center justify-end space-x-2 py-4">
          <Paging
            page={data?.data.page.index.toString() ?? "1"}
            totalPage={data?.data.page.totalPages ?? 1}
          />
        </div>
      </div>
    );
}

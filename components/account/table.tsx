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
import { useState } from "react";

import { useRouter } from "next/navigation";

import Paging from "../paging";
import { FormFilterValues, Account } from "@/lib/types";
import { accountFilterValues } from "@/lib/constants";
import Filter from "../filter/filter";

import TableSkeleton from "../table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAccountList } from "@/hooks/useAccountList";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import CreateAccountDialog from "./create-account";
import EditAccountDialog from "./edit-account";
import CreateUserDialog from "./create-user";
import BlockAccountDialog from "./block-account";

export const columns: ColumnDef<Account>[] = [
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
        <Avatar>
          <AvatarImage src={row.original.ava ?? ""} alt="img" />
          <AvatarFallback>{row.original.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => {
      return <span className="font-semibold">Name</span>;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: () => {
      return <div className="font-semibold">Email</div>;
    },
    cell: ({ row }) => (
      <div className="lg:max-w-[16rem] max-w-[4rem] truncate">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "dob",
    header: () => {
      return <div className="font-semibold">DoB</div>;
    },
    cell: ({ row }) => (
      <div className="lg:max-w-[16rem] max-w-[4rem] truncate">
        {row.getValue("dob")}
      </div>
    ),
  },
  {
    accessorKey: "isAdmin",
    header: () => {
      return <div className="font-semibold">Type</div>;
    },
    cell: ({ row }) => {
      if (row.original.isAdmin) {
        return (
          <div className="px-3 py-1 rounded-full w-min bg-cyan-100 border border-cyan-600 text-cyan-700">
            Admin
          </div>
        );
      } else {
        return (
          <div className="px-3 py-1 rounded-full w-min bg-orange-100 border border-orange-600 text-orange-600">
            User
          </div>
        );
      }
    },
  },
  {
    accessorKey: "isBlocked",
    header: () => {
      return <div className="font-semibold">State</div>;
    },
    cell: ({ row }) => {
      if (row.original.isBlocked) {
        return (
          <div className="text-rose-700">
            <MdBlock className="h-7 w-7" title="blocked" />
          </div>
        );
      } else {
        return (
          <div className="text-green-600">
            <FaRegCircleCheck className="h-7 w-7" title="active" />
          </div>
        );
      }
    },
  },
  {
    accessorKey: "actions",
    header: () => {
      return <div className="font-semibold">Actions</div>;
    },
    cell: () => <></>,
  },
];

export function AccountTable() {
  const router = useRouter();

  const { filters, data, isLoading, error, mutate } = useAccountList();

  const accounts: Account[] = data?.data.data || [];
  const table = useReactTable({
    data: accounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [openFilter, setOpenFilter] = useState(false);

  const onApplyFilters = (data: FormFilterValues) => {
    const updatedParams = new URLSearchParams();
    data.filters.forEach(({ type, value }) => {
      if (value) {
        updatedParams.set(type, value);
      } else {
        updatedParams.delete(type);
      }
    });
    setOpenFilter(false);
    router.push(`?${updatedParams.toString()}`);
  };

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
          <h1 className="table___title">Manage Account</h1>
          <div className="flex md:gap-4 gap-2">
            <CreateAccountDialog onAdded={() => void mutate()} />
            <CreateUserDialog onAdded={() => void mutate()} />
          </div>
        </div>
        <Filter
          title="Filter accounts"
          filters={filters}
          filterValues={accountFilterValues}
          open={openFilter}
          onOpenChange={(open) => {
            setOpenFilter(open);
          }}
          onApplyFilters={onApplyFilters}
        />
        <div className="rounded-md border overflow-x-auto min-w-full max-w-[50vw]">
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
                        <TableCell key={cell.id} className="flex py-4 gap-2">
                          {row.original.isAdmin && (
                            <EditAccountDialog
                              account={row.original}
                              onAdded={() => void mutate()}
                            />
                          )}
                          {!row.original.isAdmin && (
                            <BlockAccountDialog
                              id={row.original.id}
                              isBlocked={!row.original.isBlocked}
                              onDelete={() => void mutate()}
                            />
                          )}
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

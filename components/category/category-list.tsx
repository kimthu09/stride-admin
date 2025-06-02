"use client";

import React, { useEffect, useState } from "react";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Category } from "@/lib/types";
import { useCategoryList } from "@/hooks/useCategory";
import clsx from "clsx";

export interface CategoryListProps {
  category: string | number;
  setCategory: (category: string | number, name?: string) => void;
  isId: boolean;
  readonly?: boolean;
  className?: string;
}
const CategoryList = ({
  isId,
  category,
  setCategory,
  readonly,
  className,
}: CategoryListProps) => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useCategoryList(false);
  const [categoryList, setCategoryList] = useState<Array<Category>>([]);
  useEffect(() => {
    if (data) {
      setCategoryList(data.data.data.concat({ name: "None", id: "" }));
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (isLoading || !data) {
    return <Skeleton className={clsx("h-10 w-full", className)} />;
  } else if (data.data.data.length < 1) {
    return null;
  } else {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={readonly}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={clsx("justify-between w-full h-10", className)}
          >
            {category && category !== ""
              ? categoryList.find(
                  (item) =>
                    (isId && item.id.toString() === category.toString()) ||
                    (!isId && item.name === category)
                )?.name
              : "Choose category"}
            <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="PopoverContent rounded-md w-full p-1">
          <Command className="w-full">
            <CommandInput placeholder="Find category's name" />
            <CommandEmpty className="py-2 px-6">
              <div className="text-sm">Not found</div>
            </CommandEmpty>
            <CommandList>
              <CommandGroup>
                {categoryList.map((item) => (
                  <CommandItem
                    value={item.name}
                    key={item.id}
                    onSelect={() => {
                      if (isId) {
                        setCategory(item.id, item.name);
                      } else {
                        setCategory(item.name, item.name);
                      }

                      setOpen(false);
                    }}
                  >
                    {category && (
                      <LuCheck
                        className={cn(
                          "mr-2 h-4 w-4",
                          isId
                            ? item.id.toString() === category.toString()
                              ? "opacity-100"
                              : "opacity-0"
                            : item.name === category
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    )}
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
};

export default CategoryList;

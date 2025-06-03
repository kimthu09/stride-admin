import { SportInReport } from "@/lib/types";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PiMapTrifold } from "react-icons/pi";
import { formatSportType } from "./sport-report-view";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";

const ITEMS_PER_PAGE = 3;
const SportListView = ({ items }: { items: SportInReport[] }) => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-6">
        <CardTitle>Current Sports</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <>
          <div className="space-y-4">
            {paginatedItems.map(
              ({ id, name, image, numberActivities, sportMapType }) => (
                <div
                  key={id}
                  className="flex items-center gap-4 p-4 py-2 border shadow rounded-md hover:shadow-md transition"
                >
                  <Avatar className="rounded-sm h-6 w-6">
                    <AvatarImage src={image ?? ""} alt="img" />
                    <AvatarFallback className="rounded-sm">img</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col flex-grow">
                    <span className="font-semibold text-lg">{name}</span>
                    <span className=" text-gray-500">
                      Activities: {numberActivities}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    {formatSportType(sportMapType)}
                    <PiMapTrifold className="h-6 w-6 text-slate-500" />
                  </div>
                </div>
              )
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(0)}
                disabled={page === 0}
              >
                <LuChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <LuChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
              >
                <LuChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(totalPages - 1)}
                disabled={page >= totalPages - 1}
              >
                <LuChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default SportListView;

import SWRProvider from "@/components/auth/swr-provider";
import ReportView from "@/components/report/report-view";
import ReportViewSkeleton from "@/components/report/report-view-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<ReportViewSkeleton />}>
        <SWRProvider>
          <ReportView />
        </SWRProvider>
      </Suspense>
    </>
  );
}

import SWRProvider from "@/components/auth/swr-provider";
import { AccountTable } from "@/components/account/table";

import TableSkeleton from "@/components/table-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Manage Account",
};

const AccountPage = () => {
  return (
    <Suspense
      fallback={
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
      }
    >
      <SWRProvider>
        <AccountTable />
      </SWRProvider>
    </Suspense>
  );
};

export default AccountPage;

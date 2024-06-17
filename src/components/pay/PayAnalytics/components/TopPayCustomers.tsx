import { useState } from "react";
import { CopyAddressButton } from "../../../../@/components/ui/CopyAddressButton";
import { CardHeading, NoDataAvailable } from "./common";
import {
  usePayTopCustomers,
  type PayTopCustomersData,
} from "../hooks/usePayTopCustomers";
import { Button } from "../../../../@/components/ui/button";
import { ScrollShadow } from "../../../../@/components/ui/ScrollShadow/ScrollShadow";
import { ExportToCSVButton } from "./ExportToCSVButton";
import { SkeletonContainer } from "../../../../@/components/ui/skeleton";

type UIData = {
  customers: Array<{
    walletAddress: string;
    totalSpendUSDCents: number;
  }>;
  showViewMore: boolean;
};

export function TopPayCustomers(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const [itemsToLoad, setItemsToLoad] = useState(100);

  const topCustomersQuery = usePayTopCustomers({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    take: itemsToLoad,
    skip: 0,
  });

  function getUIData(): {
    data?: UIData;
    isError?: boolean;
    isLoading?: boolean;
  } {
    if (topCustomersQuery.isLoading) {
      return { isLoading: true };
    }

    if (topCustomersQuery.isError) {
      return { isError: true };
    }

    if (topCustomersQuery.data.customers.length === 0) {
      return { isError: true };
    }

    const filteredCustomers = topCustomersQuery.data?.customers.filter(
      (x) => x.totalSpendUSDCents > 0,
    );

    const totalCount = topCustomersQuery.data.count;
    const currentLoadedCount = topCustomersQuery.data.customers.length;
    const showViewMore = currentLoadedCount < totalCount;

    return {
      data: {
        customers: filteredCustomers,
        showViewMore,
      },
    };
  }

  const uiData = getUIData();
  const customersData = uiData.data?.customers;

  return (
    <div className="flex flex-col relative overflow-auto">
      {/* header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:items-center">
        <CardHeading> Top customers by spend </CardHeading>
        {customersData && (
          <ExportToCSVButton
            fileName="top_customers"
            getData={() => {
              return getCSVData(customersData);
            }}
          />
        )}
      </div>

      <div className="h-5" />

      {!uiData.isError ? (
        <RenderData
          data={uiData.data}
          loadMore={() => {
            setItemsToLoad(itemsToLoad + 50);
          }}
        />
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
}

function RenderData(props: { data?: UIData; loadMore: () => void }) {
  return (
    <ScrollShadow scrollableClassName="h-[250px]" disableTopShadow={true}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border sticky top-0 bg-background z-10">
            <TableHeading> Wallet Address </TableHeading>
            <TableHeading> Total spend </TableHeading>
          </tr>
        </thead>
        <tbody>
          {props.data ? (
            props.data?.customers.map((customer) => {
              return (
                <TableRow key={customer.walletAddress} customer={customer} />
              );
            })
          ) : (
            <>
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
              <TableRow />
            </>
          )}
        </tbody>
      </table>

      {props.data?.showViewMore && (
        <div className="flex justify-center py-3">
          <Button
            className="text-sm text-link-foreground p-2 h-auto"
            variant="ghost"
            onClick={props.loadMore}
          >
            View More
          </Button>
        </div>
      )}
    </ScrollShadow>
  );
}

function TableRow(props: {
  customer?: {
    walletAddress: string;
    totalSpendUSDCents: number;
  };
}) {
  return (
    <tr className="border-b border-border">
      <TableData>
        <SkeletonContainer
          className="inline-flex"
          loadedData={props.customer?.walletAddress}
          skeletonData="0x0000000000000000000000000000000000000000"
          render={(v) => {
            return (
              <CopyAddressButton
                address={v}
                variant="ghost"
                className="text-secondary-foreground"
              />
            );
          }}
        />
      </TableData>
      <TableData>
        <SkeletonContainer
          className="inline-flex"
          loadedData={props.customer?.totalSpendUSDCents}
          skeletonData={20000}
          render={(v) => {
            return (
              <p>
                {(v / 100).toLocaleString("en-US", {
                  currency: "USD",
                  style: "currency",
                })}
              </p>
            );
          }}
        />
      </TableData>
    </tr>
  );
}

function TableData({ children }: { children: React.ReactNode }) {
  return <td className="px-0 py-2 text-sm">{children}</td>;
}

function TableHeading(props: { children: React.ReactNode }) {
  return (
    <th className="text-left px-0 py-3 text-sm font-medium text-muted-foreground min-w-[150px]">
      {props.children}
    </th>
  );
}

function getCSVData(data: PayTopCustomersData["customers"]) {
  const header = ["Wallet Address", "Total spend"];
  const rows = data.map((customer) => [
    customer.walletAddress,
    (customer.totalSpendUSDCents / 100).toLocaleString("en-US", {
      currency: "USD",
      style: "currency",
    }),
  ]);

  return { header, rows };
}

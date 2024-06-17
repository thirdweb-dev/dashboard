import { useState } from "react";
import { CopyAddressButton } from "../../../../@/components/ui/CopyAddressButton";
import { CardHeading, LoadingGraph, NoDataAvailable } from "./common";
import {
  usePayTopCustomers,
  type PayTopCustomersData,
} from "../hooks/usePayTopCustomers";
import { Button } from "../../../../@/components/ui/button";
import { ScrollShadow } from "../../../../@/components/ui/ScrollShadow/ScrollShadow";
import { ExportToCSVButton } from "./ExportToCSVButton";

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

  const filteredData = topCustomersQuery.data?.customers.filter(
    (x) => x.totalSpendUSDCents > 0,
  );

  let showViewMore = false;
  if (topCustomersQuery.data) {
    const totalCount = topCustomersQuery.data.count;
    const currentLoadedCount = topCustomersQuery.data.customers.length;

    showViewMore = currentLoadedCount < totalCount;
  }

  return (
    <div className="flex flex-col relative overflow-auto">
      {/* header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:items-center">
        <CardHeading> Top customers by spend </CardHeading>
        {filteredData && filteredData?.length > 0 && (
          <ExportToCSVButton
            fileName="top_customers"
            getData={() => {
              return getCSVData(filteredData);
            }}
          />
        )}
      </div>

      <div className="h-5" />

      {topCustomersQuery.isLoading ? (
        <LoadingGraph />
      ) : filteredData && filteredData.length > 0 ? (
        <RenderData
          data={filteredData}
          loadMore={
            showViewMore
              ? () => {
                  setItemsToLoad(itemsToLoad + 50);
                }
              : undefined
          }
        />
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
}

function RenderData(props: {
  data: PayTopCustomersData["customers"];
  loadMore?: () => void;
}) {
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
          {props.data.map((customer) => {
            return (
              <tr
                key={customer.walletAddress}
                className="border-b border-border"
              >
                <TableData>
                  <CopyAddressButton
                    address={customer.walletAddress}
                    variant="ghost"
                    className="text-secondary-foreground"
                  />
                </TableData>
                <TableData>
                  {(customer.totalSpendUSDCents / 100).toLocaleString("en-US", {
                    currency: "USD",
                    style: "currency",
                  })}
                </TableData>
              </tr>
            );
          })}
        </tbody>
      </table>

      {props.loadMore && (
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

import { useState } from "react";
import { usePayPurchases, type PayPurchasesData } from "./usePayPurchases";
import { CardHeading, LoadingGraph, NoDataAvailable } from "./common";
import { CopyAddressButton } from "../../../@/components/ui/CopyAddressButton";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../@/components/ui/badge";
import { cn } from "../../../@/lib/utils";
import { format } from "date-fns";
import { ScrollShadow } from "../../../@/components/ui/ScrollShadow/ScrollShadow";
import { Spinner } from "../../../@/components/ui/Spinner/Spinner";
import { ExportToCSVButton } from "./exportToCSV";
import { useTokenInfo } from "./hooks/useTokenInfo";
import { Skeleton } from "../../../@/components/ui/skeleton";

export function TransactionHistoryCard(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const [itemsToLoad, setItemsToLoad] = useState(100);
  const purchasesQuery = usePayPurchases({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    take: itemsToLoad,
    skip: 0,
  });

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:items-center">
        <CardHeading> Transaction History</CardHeading>
        {purchasesQuery.data && purchasesQuery.data.purchases?.length > 0 && (
          <ExportToCSVButton
            fileName="transaction_history"
            getData={() => {
              return getCSVData(purchasesQuery.data.purchases);
            }}
          />
        )}
      </div>

      <div className="h-5" />

      {purchasesQuery.isLoading ? (
        <LoadingGraph className="h-[400px]" />
      ) : purchasesQuery.data && purchasesQuery.data.purchases.length > 0 ? (
        <RenderData
          data={purchasesQuery.data}
          loadMore={() => setItemsToLoad(itemsToLoad + 100)}
          isLoadingMore={purchasesQuery.isFetching}
        />
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
}

function RenderData(props: {
  data: PayPurchasesData;
  loadMore: () => void;
  isLoadingMore: boolean;
}) {
  const totalItems = props.data.count;
  const itemsLoaded = props.data.purchases.length;
  const showLoadMore = totalItems > itemsLoaded;

  return (
    <ScrollShadow scrollableClassName="max-h-[700px]" disableTopShadow={true}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border sticky top-0 bg-background z-10">
            <TableHeading>Amount</TableHeading>
            <TableHeading>Type</TableHeading>
            <TableHeading> Paid </TableHeading>
            <TableHeading> Bought </TableHeading>
            <TableHeading>Status</TableHeading>
            <TableHeading>Recipient</TableHeading>
            <TableHeading>Date</TableHeading>
          </tr>
        </thead>
        <tbody>
          {props.data.purchases.map((purchase) => {
            return <TableRow key={purchase.purchaseId} purchase={purchase} />;
          })}
        </tbody>
      </table>

      {showLoadMore ? (
        <div className="flex justify-center py-3">
          <Button
            className="text-sm text-link-foreground p-2 h-auto gap-2 items-center"
            variant="ghost"
            onClick={props.loadMore}
            disabled={props.isLoadingMore}
          >
            {props.isLoadingMore ? "Loading" : "View More"}
            {props.isLoadingMore && <Spinner className="size-3" />}
          </Button>
        </div>
      ) : (
        <p className="text-center py-5 text-muted-foreground">
          {totalItems === 0 ? "No transactions found" : "No more transactions"}
        </p>
      )}
    </ScrollShadow>
  );
}

function TableRow(props: { purchase: PayPurchasesData["purchases"][0] }) {
  const { purchase } = props;

  const fromToken = useTokenInfo({
    chainId: purchase.fromChainId,
    tokenAddress: purchase.fromTokenAddress,
  });

  const toToken = useTokenInfo({
    chainId: purchase.toChainId,
    tokenAddress: purchase.toTokenAddress,
  });

  return (
    <tr key={purchase.purchaseId} className="border-b border-border">
      {/* Amount */}
      <TableData>
        {(purchase.toAmountUSDCents / 100).toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        })}
      </TableData>

      {/* Type */}
      <TableData>
        <Badge
          variant={"secondary"}
          className={cn(
            "capitalize",
            purchase.purchaseType === "ONRAMP"
              ? "bg-lime-200/50 dark:bg-lime-800/50 text-lime-800 dark:text-lime-200"
              : "bg-sky-200/50 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200",
          )}
        >
          {purchase.purchaseType}
        </Badge>
      </TableData>

      {/* From */}
      <TableData>
        {purchase.purchaseType === "SWAP" ? (
          <>
            {fromToken.isLoading ? (
              <Skeleton className="h-4 w-14" />
            ) : (
              fromToken.data?.symbol || "Failed to Load"
            )}
          </>
        ) : (
          purchase.fromCurrencySymbol
        )}
      </TableData>

      {/* To */}
      <TableData>
        {toToken.isLoading ? (
          <Skeleton className="h-4 w-14" />
        ) : (
          toToken.data?.symbol || "Failed to Load"
        )}
      </TableData>

      {/* Status */}
      <TableData>
        <Badge
          variant={
            purchase.status === "COMPLETED"
              ? "success"
              : purchase.status === "PENDING"
                ? "warning"
                : "destructive"
          }
          className="capitalize"
        >
          {purchase.status}
        </Badge>
      </TableData>

      {/* Address */}
      <TableData>
        <CopyAddressButton
          address={purchase.toAddress}
          variant="ghost"
          className="text-secondary-foreground"
        />
      </TableData>

      {/* Date */}
      <TableData>
        {format(new Date(purchase.updatedAt), "LLL dd, y h:mm a")}
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

function getCSVData(data: PayPurchasesData["purchases"]) {
  const header = [
    "Amount",
    "Type",
    "Status",
    // to
    "Buy Token address",
    "Buy Token chain",
    // from
    "From Token address",
    "From Token chain",
    "From currency",
    // status
    "Recipient",
    // recipient
    "Date",
  ];

  const rows: string[][] = data.map((purchase) => [
    // amount
    (purchase.toAmountUSDCents / 100).toLocaleString("en-US", {
      currency: "USD",
      style: "currency",
    }),
    // type
    purchase.purchaseType,
    // status
    purchase.status,
    // to
    purchase.toTokenAddress,
    `${purchase.toChainId}`,
    // from
    purchase.purchaseType === "SWAP" ? purchase.fromTokenAddress : "",
    purchase.purchaseType === "SWAP" ? `${purchase.fromChainId}` : "",
    purchase.purchaseType === "ONRAMP" ? purchase.fromCurrencySymbol : "",
    // recipient
    purchase.toAddress,
    format(new Date(purchase.updatedAt), "LLL dd y h:mm a"),
  ]);

  return { header, rows };
}

import { useState } from "react";
import {
  usePayPurchases,
  type PayPurchasesData,
} from "../hooks/usePayPurchases";
import { CardHeading, NoDataAvailable } from "./common";
import { CopyAddressButton } from "../../../../@/components/ui/CopyAddressButton";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../../@/components/ui/badge";
import { cn } from "../../../../@/lib/utils";
import { format } from "date-fns";
import { ScrollShadow } from "../../../../@/components/ui/ScrollShadow/ScrollShadow";
import { Spinner } from "../../../../@/components/ui/Spinner/Spinner";
import { ExportToCSVButton } from "./ExportToCSVButton";
import { Skeleton } from "../../../../@/components/ui/skeleton";

type UIData = {
  purchases: PayPurchasesData["purchases"];
  showLoadMore: boolean;
};

export function PaymentHistory(props: {
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

  function getUIData(): {
    data?: UIData;
    isLoading?: boolean;
    isError?: boolean;
  } {
    if (purchasesQuery.isLoading) {
      return { isLoading: true };
    }
    if (purchasesQuery.isError) {
      return { isError: true };
    }

    if (purchasesQuery.data.purchases.length === 0) {
      return { isError: true };
    }

    const totalItems = purchasesQuery.data.count;
    const itemsLoaded = purchasesQuery.data.purchases.length;
    const showLoadMore = totalItems > itemsLoaded;

    return {
      data: {
        purchases: purchasesQuery.data.purchases,
        showLoadMore,
      },
    };
  }

  const uiData = getUIData();
  const purchases = uiData.data?.purchases;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:items-center">
        <CardHeading> Transaction History</CardHeading>
        {purchases && (
          <ExportToCSVButton
            fileName="transaction_history"
            getData={() => {
              return getCSVData(purchases);
            }}
          />
        )}
      </div>

      <div className="h-5" />

      {!uiData.isError ? (
        <RenderData
          data={uiData.data}
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
  data?: UIData;
  loadMore: () => void;
  isLoadingMore: boolean;
}) {
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
          {props.data ? (
            <>
              {props.data.purchases.map((purchase) => {
                return (
                  <TableRow key={purchase.purchaseId} purchase={purchase} />
                );
              })}
            </>
          ) : (
            <>
              {new Array(20).fill(0).map((_, i) => (
                <SkeletonTableRow key={i} />
              ))}
            </>
          )}
        </tbody>
      </table>

      {props.data && (
        <>
          {props.data?.showLoadMore ? (
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
              No more transactions
            </p>
          )}
        </>
      )}
    </ScrollShadow>
  );
}

function TableRow(props: { purchase: PayPurchasesData["purchases"][0] }) {
  const { purchase } = props;

  // const fromToken = useTokenInfo(
  //   purchase.purchaseType === "SWAP"
  //     ? {
  //         chainId: purchase.fromToken.chainId,
  //         tokenAddress: purchase.fromToken.tokenAddress,
  //       }
  //     : undefined,
  // );

  // const toToken = useTokenInfo({
  //   chainId: purchase.toToken.chainId,
  //   tokenAddress: purchase.toToken.tokenAddress,
  // });

  return (
    <tr
      key={purchase.purchaseId}
      className="border-b border-border fade-in-0 duration-300"
    >
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
            "uppercase",
            purchase.purchaseType === "ONRAMP"
              ? "bg-lime-200/50 dark:bg-lime-800/50 text-lime-800 dark:text-lime-200"
              : "bg-sky-200/50 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200",
          )}
        >
          {purchase.purchaseType === "ONRAMP" ? "Fiat" : "Crypto"}
        </Badge>
      </TableData>

      {/* Paid */}
      <TableData>
        {purchase.purchaseType === "SWAP"
          ? purchase.fromToken.symbol
          : purchase.fromCurrencySymbol}
      </TableData>

      {/* Bought */}
      <TableData>{purchase.toToken.symbol}</TableData>

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

function SkeletonTableRow() {
  return (
    <tr className="border-b border-border">
      <TableData>
        <Skeleton className="h-7 w-20" />
      </TableData>
      <TableData>
        <Skeleton className="h-7 w-20" />
      </TableData>
      <TableData>
        <Skeleton className="h-7 w-20" />
      </TableData>
      <TableData>
        <Skeleton className="h-7 w-20" />
      </TableData>
      <TableData>
        <Skeleton className="h-7 w-20" />
      </TableData>
      <TableData>
        <Skeleton className="h-7 w-20" />
      </TableData>
      <TableData>
        <Skeleton className="h-7 w-20" />
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
    "Buy Token Symbol",
    // from
    "From Token address",
    "From Token chain",
    "From Token Symbol",
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
    purchase.purchaseType === "ONRAMP" ? "Fiat" : "Crypto",
    // status
    purchase.status,
    // to
    purchase.toToken.tokenAddress,
    `${purchase.toToken.chainId}`,
    purchase.toToken.symbol,
    // from
    purchase.purchaseType === "SWAP" ? purchase.fromToken.tokenAddress : "",
    purchase.purchaseType === "SWAP" ? `${purchase.fromToken.chainId}` : "",
    purchase.purchaseType === "SWAP" ? purchase.fromToken.symbol : "",
    purchase.purchaseType === "ONRAMP" ? purchase.fromCurrencySymbol : "",

    // recipient
    purchase.toAddress,
    format(new Date(purchase.updatedAt), "LLL dd y h:mm a"),
  ]);

  return { header, rows };
}

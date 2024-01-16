import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { Card, Text } from "tw-components";
import { FiatCurrency } from "@3rdweb-sdk/react/hooks/usePayments";
import { Transaction } from "graphql/generated_types";
import { baseFiatCurrencyUnitToCurrency, prettyPrintPrice } from "./utils";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { Tooltip } from "@chakra-ui/react";
import { format, formatDistanceToNowStrict } from "date-fns";

interface PaymentsTransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<Transaction>();

export const PaymentsTransactionsTable: React.FC<
  PaymentsTransactionsTableProps
> = ({ transactions, isLoading, isFetched }) => {
  const columns = [
    columnHelper.accessor((row) => row, {
      header: "Fiat Value",
      cell: (cell) => {
        const fiatCurrency =
          cell.row.original.fiat_currency || FiatCurrency.USD;
        return (
          <Text>
            {prettyPrintPrice({
              price: baseFiatCurrencyUnitToCurrency({
                value: cell.row.original.total_price_usd_cents || 0,
                fiatCurrency,
              }),
              currency: fiatCurrency,
            })}
          </Text>
        );
      },
    }),

    columnHelper.accessor((row) => row, {
      header: "Crypto Value",
      cell: (cell) => {
        const value = cell.row.original.value_in_currency
          ? parseFloat(cell.row.original.value_in_currency) *
            cell.row.original.quantity
          : 0;
        return (
          <Text>
            {value} {cell.row.original.currency || ""}
          </Text>
        );
      },
    }),
    columnHelper.accessor("wallet_address", {
      header: "Created At",
      cell: (cell) => {
        const walletAddress = cell.getValue();

        if (!walletAddress) {
          return null;
        }

        return <AddressCopyButton address={walletAddress || ""} />;
      },
    }),
    columnHelper.accessor("payment_method", {
      header: "Payment Method",
      cell: (cell) => {
        return (
          <Text>{parsePaymentMethod(cell.getValue() as PaymentMethod)}</Text>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      header: "Created At",
      cell: (cell) => {
        const value = cell.getValue();
        if (!value) {
          return;
        }

        const date = new Date(value);
        return (
          <Tooltip
            borderRadius="md"
            bg="transparent"
            boxShadow="none"
            label={
              <Card bgColor="backgroundHighlight">
                <Text>{format(date, "PP pp z")}</Text>
              </Card>
            }
            shouldWrapChildren
          >
            <Text>{formatDistanceToNowStrict(date, { addSuffix: true })}</Text>
          </Tooltip>
        );
      },
    }),
  ];

  return (
    <TWTable
      title="transactions"
      data={transactions}
      columns={columns}
      isLoading={isLoading}
      isFetched={isFetched}
      showMore={{
        pageSize: 10,
      }}
    />
  );
};

export enum PaymentMethod {
  NATIVE_MINT = "NATIVE_MINT",
  BUY_WITH_CARD = "BUY_WITH_CARD",
  BUY_WITH_BANK = "BUY_WITH_BANK",
  BUY_WITH_CRYPTO = "BUY_WITH_CRYPTO",
  ENQUEUED_JOB = "ENQUEUED_JOB",
  FREE_CLAIM_AND_TRANSFER = "FREE_CLAIM_AND_TRANSFER",
  BUY_WITH_IDEAL = "BUY_WITH_IDEAL",
}

const parsePaymentMethod = (paymentMethod: PaymentMethod) => {
  switch (paymentMethod) {
    case PaymentMethod.NATIVE_MINT:
      return "Mint";
    case PaymentMethod.BUY_WITH_CARD:
      return "Card";
    case PaymentMethod.BUY_WITH_BANK:
      return "Bank";
    case PaymentMethod.BUY_WITH_CRYPTO:
      return "Crypto";
    case PaymentMethod.ENQUEUED_JOB:
      return "Job";
    case PaymentMethod.FREE_CLAIM_AND_TRANSFER:
      return "Free Claim";
    case PaymentMethod.BUY_WITH_IDEAL:
      return "iDEAL";
    default:
      return "Unknown";
  }
};

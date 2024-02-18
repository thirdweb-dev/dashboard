import {
  BackendWallet,
  useEngineBackendWalletBalance,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useChain } from "@thirdweb-dev/react";
import { TWTable } from "components/shared/TWTable";
import { useState } from "react";
import { LinkButton, Text } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { prettyPrintCurrency } from "../utils";

interface CompanyWalletsTreasuryTableProps {
  wallets: BackendWallet[];
  instanceUrl: string;
  isLoading: boolean;
  isFetched: boolean;
}

interface CompanyWalletsTreasuryDashboard extends BackendWallet {
  balance: string;
}

const columnHelper = createColumnHelper<CompanyWalletsTreasuryDashboard>();

const setColumns = (instanceUrl: string) => [
  columnHelper.accessor("address", {
    header: "Address",
    cell: (cell) => {
      const address = cell.getValue();
      return (
        <AddressCopyButton address={address} shortenAddress={false} size="xs" />
      );
    },
  }),
  columnHelper.accessor("label", {
    header: "Label",
    cell: (cell) => {
      return (
        <Text isTruncated maxW={300}>
          {cell.getValue()}
        </Text>
      );
    },
  }),
  columnHelper.accessor("address", {
    header: "Balance",
    cell: (cell) => {
      const address = cell.getValue();
      return (
        <CompanyWalletsTreasuryBalanceCell
          instance={instanceUrl}
          address={address}
        />
      );
    },
    id: "balance",
  }),
];

interface CompanyWalletsTreasuryBalanceCellProps {
  instance: string;
  address: string;
}

const CompanyWalletsTreasuryBalanceCell: React.FC<
  CompanyWalletsTreasuryBalanceCellProps
> = ({ instance, address }) => {
  const { data: CompanyWalletsTreasuryBalance } = useEngineBackendWalletBalance(
    instance,
    address,
  );
  const chain = useChain();
  if (!chain || !CompanyWalletsTreasuryBalance) {
    return;
  }

  const balanceDisplay = prettyPrintCurrency({
    amount: CompanyWalletsTreasuryBalance.displayValue,
    symbol: CompanyWalletsTreasuryBalance.symbol,
  });

  const balanceComponent = (
    <Text
      fontWeight={
        CompanyWalletsTreasuryBalance.value === "0" ? "light" : "bold"
      }
    >
      {balanceDisplay}
    </Text>
  );

  const explorer = chain.explorers?.[0];
  if (!explorer) {
    return balanceComponent;
  }

  return (
    <LinkButton
      variant="ghost"
      isExternal
      size="xs"
      href={`${explorer.url}/address/${address}`}
    >
      {balanceComponent}
    </LinkButton>
  );
};

export const CompanyWalletsTable: React.FC<
  CompanyWalletsTreasuryTableProps
> = ({ wallets, instanceUrl, isLoading, isFetched }) => {
  const columns = setColumns(instanceUrl);
  const [selectedCompanyWalletsTreasury, setSelectedCompanyWalletsTreasury] =
    useState<CompanyWalletsTreasury>();

  return (
    <>
      <TWTable
        title="backend wallets"
        data={wallets}
        columns={columns as ColumnDef<CompanyWalletsTreasury, string>[]}
        isLoading={isLoading}
        isFetched={isFetched}
      />
    </>
  );
};

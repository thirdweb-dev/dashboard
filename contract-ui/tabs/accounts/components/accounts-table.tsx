import { useDashboardEVMChainId } from "@3rdweb-sdk/react";
import { createColumnHelper } from "@tanstack/react-table";
import { AccountEvent, useAccounts, useAddress } from "@thirdweb-dev/react";
import { TWTable } from "components/shared/TWTable";
import { useRouter } from "next/router";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

const columnHelper = createColumnHelper<AccountEvent>();

const columns = [
  columnHelper.accessor("account", {
    header: "Smart Wallet",
    cell: (info) => (
      <AddressCopyButton address={info.getValue()} shortenAddress={false} />
    ),
  }),
  columnHelper.accessor("admin", {
    header: "Admin",
    cell: (info) => <AddressCopyButton address={info.getValue()} />,
  }),
];

interface AccountsTableProps {
  accountsQuery: ReturnType<typeof useAccounts>;
  accountsForAddress?: string[];
}

export const AccountsTable: React.FC<AccountsTableProps> = ({
  accountsQuery,
  accountsForAddress,
}) => {
  const router = useRouter();
  const network = useDashboardEVMChainId();
  const address = useAddress();

  const defaultAccounts: AccountEvent[] = (accountsForAddress || []).map(
    (account: string) => ({
      account,
      admin: address || "",
    }),
  );

  return (
    <TWTable
      title="account"
      columns={columns}
      data={accountsQuery.data || defaultAccounts}
      isLoading={accountsQuery.isLoading}
      isFetched={accountsQuery.isFetched}
      onRowClick={(row) => {
        router.push(`/${network}/${row.account}`);
      }}
    />
  );
};

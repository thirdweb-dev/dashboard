import { BackendWallet } from "@3rdweb-sdk/react/hooks/useEngine";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { Text } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

interface BackendWalletsTableProps {
  wallets: BackendWallet[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<BackendWallet>();

const columns = [
  columnHelper.accessor("address", {
    header: "Address",
    cell: (cell) => {
      const address = cell.getValue();
      return <AddressCopyButton address={address} />;
    },
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (cell) => {
      const value = cell.getValue();

      return (
        <Text textTransform="capitalize">
          {value === "aws-kms"
            ? "AWS KMS"
            : value === "gcp-kms"
            ? "GCP KMS"
            : value}
        </Text>
      );
    },
  }),
];

export const BackendWalletsTable: React.FC<BackendWalletsTableProps> = ({
  wallets,
  isLoading,
  isFetched,
}) => {
  return (
    <TWTable
      title="backend wallets"
      data={wallets}
      columns={columns}
      isLoading={isLoading}
      isFetched={isFetched}
    />
  );
};

import {
  AuthorizedWallet,
  useRevokeAuthorizedWallet,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { format } from "date-fns";
import { useState } from "react";
import { Button, Text } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import { AuthorizedWalletRevokeModal } from "./AuthorizedWalletRevokeModal";
import { isAddress } from "ethers/lib/utils";
import { shortenString } from "utils/usedapp-external";

interface AuthorizedWalletsTableProps {
  authorizedWallets: AuthorizedWallet[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<AuthorizedWallet>();

export const AuthorizedWalletsTable: ComponentWithChildren<
  AuthorizedWalletsTableProps
> = ({ authorizedWallets, isLoading, isFetched }) => {
  const toast = useToast();
  const { mutateAsync: revokeAccess } = useRevokeAuthorizedWallet();
  const [revokeAuthorizedWalletId, setRevokeAuthorizedWalletId] = useState<
    string | undefined
  >(undefined);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const columns = [
    columnHelper.accessor("deviceName", {
      header: "Device Name",
      cell: (cell) => {
        const value = cell.getValue();
        if (!value) {
          return;
        }
        if (isAddress(value)) {
          return <Text>{shortenString(value, false)}</Text>;
        }
        return <Text>{value}</Text>;
      },
    }),

    columnHelper.accessor("createdAt", {
      header: "Authorized at",
      cell: (cell) => {
        const value = cell.getValue();

        if (!value) {
          return;
        }
        const createdDate = format(new Date(value), "MMM dd, yyyy");
        return <Text>{createdDate}</Text>;
      },
    }),

    columnHelper.accessor("id", {
      header: "",
      cell: (cell) => {
        const value = cell.getValue();
        if (!value) {
          return;
        }
        return (
          <Button
            onClick={() => handleOpen(value)}
            variant="outline"
            color="red"
            size="sm"
          >
            Revoke Access
          </Button>
        );
      },
    }),
  ];

  const handleOpen = (authorizedWalletId: AuthorizedWallet["id"]) => {
    setRevokeAuthorizedWalletId(authorizedWalletId);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setRevokeAuthorizedWalletId(undefined);
  };

  const handleSubmit = async () => {
    if (!revokeAuthorizedWalletId) {
      return;
    }
    try {
      await revokeAccess({
        authorizedWalletId: revokeAuthorizedWalletId,
      });
      toast({
        title: "Device revoked",
        description: "The selected device has been revoked.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong while revoking the device",
        description: "Please contact us at https://discord.gg/thirdweb",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      handleClose();
    }
  };

  return (
    <>
      {revokeAuthorizedWalletId && (
        <AuthorizedWalletRevokeModal
          isOpen={isOpen}
          onClose={handleClose}
          authorizedWalletId={revokeAuthorizedWalletId || ""}
          onSubmit={handleSubmit}
        />
      )}

      <TWTable
        title="Authorized Wallets"
        columns={columns}
        data={authorizedWallets}
        isLoading={isLoading}
        isFetched={isFetched}
      />
    </>
  );
};

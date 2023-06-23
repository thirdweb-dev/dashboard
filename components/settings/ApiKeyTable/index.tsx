import { CopyApiKeyButton } from "./CopyButton";
import { ApiKeyDrawer } from "./KeyDrawer";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { useDisclosure } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { format } from "date-fns";
import { useState } from "react";
import { Text } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

interface ApiKeyTableProps {
  keys: ApiKey[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<ApiKey>();

export const ApiKeyTable: ComponentWithChildren<ApiKeyTableProps> = ({
  keys,
  isLoading,
  isFetched,
}) => {
  const [activeKey, setActiveKey] = useState<ApiKey>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (cell) => <Text>{cell.getValue()}</Text>,
    }),

    columnHelper.accessor("key", {
      header: "Key",
      cell: (cell) => (
        <CopyApiKeyButton apiKey={cell.getValue()} label="API Key" />
      ),
    }),

    columnHelper.accessor("secretMasked", {
      header: "Secret",
      cell: (cell) => <Text fontFamily="mono">{cell.getValue()}</Text>,
    }),

    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: (cell) => {
        const value = cell.getValue();

        if (!value) {
          return;
        }
        const createdDate = format(new Date(value), "MMM dd, yyyy");
        return <Text>{createdDate}</Text>;
      },
    }),

    columnHelper.accessor("lastAccessedAt", {
      header: "Last accessed",
      cell: (cell) => {
        const value = cell.getValue() as string;

        const accessedDate = value
          ? format(new Date(value), "MMM dd, yyyy")
          : "Unknown";
        return <Text>{accessedDate}</Text>;
      },
    }),
  ];

  const handleOpen = (apiKey: ApiKey) => {
    setActiveKey(apiKey);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setActiveKey(undefined);
  };

  return (
    <>
      {activeKey && (
        <ApiKeyDrawer
          open={isOpen}
          onClose={handleClose}
          apiKey={activeKey}
          onSubmit={setActiveKey}
        />
      )}

      <TWTable
        title="api key"
        columns={columns}
        data={keys}
        isLoading={isLoading}
        isFetched={isFetched}
        onRowClick={handleOpen}
      />
    </>
  );
};

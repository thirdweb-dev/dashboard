import CopyApiKeyButton from "./CopyButton";
import RevokeApiKeyButton from "./RevokeButton";
import { ApiKeyInfo } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { FiMoreVertical } from "react-icons/fi";
import { Text, TrackedIconButton } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

interface ApiKeyInfoColumn extends ApiKeyInfo {
  keyActions: string;
}

interface ApiKeyTableProps {
  keys: ApiKeyInfo[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<ApiKeyInfoColumn>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (cell) => <Text>{cell.getValue() || "Unnamed"}</Text>,
  }),

  columnHelper.accessor("key", {
    header: "Key",
    cell: (cell) => <CopyApiKeyButton apiKey={cell.getValue()} />,
  }),

  columnHelper.accessor("createdAt", {
    header: "Created",
  }),

  columnHelper.accessor("keyActions", {
    header: "",
    cell: (cell) => {
      return (
        <Flex width="100%" justify="flex-end">
          <Menu isLazy>
            <MenuButton
              as={TrackedIconButton}
              variant="ghost"
              icon={<FiMoreVertical />}
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList onClick={(e) => e.stopPropagation()}>
              <RevokeApiKeyButton apiKey={cell.getValue()} />
            </MenuList>
          </Menu>
        </Flex>
      );
    },
  }),
];

export const ApiKeyTable: ComponentWithChildren<ApiKeyTableProps> = ({
  keys,
  isLoading,
  isFetched,
}) => {
  return (
    <TWTable
      title="api key"
      columns={columns}
      data={keys as ApiKeyInfoColumn[]}
      isLoading={isLoading}
      isFetched={isFetched}
    />
  );
};

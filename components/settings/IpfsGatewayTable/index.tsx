import { CopyIpfsGatewayButton } from "./CopyButton";
import { DeleteGatewayButton } from "./DeleteGatewayButton";
import { Flex, Icon, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { useCallback, useMemo, useState } from "react";
import { FiEdit2, FiMoreVertical } from "react-icons/fi";
import { MenuItem, Text, TrackedIconButton } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

export type IpfsGatewayInfo = {
  key: string;
  label: string;
  url: string;
};

interface IpfsGatewayTableProps {
  gateways: IpfsGatewayInfo[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<IpfsGatewayInfo>();

export const IpfsGatewayTable: ComponentWithChildren<IpfsGatewayTableProps> = ({
  gateways,
  isLoading,
  isFetched,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<IpfsGatewayInfo>();
  const handleEditKey = useCallback(
    (ipfsGateway: string) => {
      const foundKey = gateways.find((item) => item.url === ipfsGateway);
      if (foundKey) {
        setActiveKey(foundKey);
        setEditModalOpen(true);
      }
    },
    [gateways],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("label", {
        header: "Label",
        cell: (cell) => <Text>{cell.getValue()}</Text>,
      }),

      columnHelper.accessor("url", {
        header: "Gateway URL",
        cell: (cell) => <CopyIpfsGatewayButton ipfsGateway={cell.getValue()} />,
      }),

      columnHelper.accessor("url", {
        header: "",
        id: "key-actions",
        cell: (cell) => {
          return (
            <Flex width="100%" justify="flex-end">
              <Menu isLazy>
                <MenuButton
                  as={TrackedIconButton}
                  variant="ghost"
                  icon={<FiMoreVertical />}
                />
                <MenuList>
                  <MenuItem
                    onClick={() => handleEditKey(cell.getValue())}
                    icon={<Icon as={FiEdit2} />}
                  >
                    Edit
                  </MenuItem>
                  <DeleteGatewayButton ipfsGateway={cell.getValue()} />
                </MenuList>
              </Menu>
            </Flex>
          );
        },
      }),
    ],
    [handleEditKey],
  );

  return (
    <>
      {/* <EditApiKeyModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        apiKey={activeKey}
      /> */}

      <TWTable
        title="ipfs gateway"
        columns={columns}
        data={gateways}
        isLoading={isLoading}
        isFetched={isFetched}
      />
    </>
  );
};

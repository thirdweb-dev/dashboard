import { CopyIpfsGatewayButton } from "./CopyButton";
import { DeleteGatewayButton } from "./DeleteGatewayButton";
import { Flex, Icon, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { IpfsGatewayInfo } from "hooks/useGetCustomIpfsGateways";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { FiEdit2, FiMoreVertical } from "react-icons/fi";
import { MenuItem, Text, TrackedIconButton } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

const columnHelper = createColumnHelper<IpfsGatewayInfo>();

type IpfsGatewayTableProps = {
  gateways: IpfsGatewayInfo[];
  setGateways: Dispatch<SetStateAction<IpfsGatewayInfo[]>>;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setActiveGateway: Dispatch<SetStateAction<IpfsGatewayInfo | undefined>>;
};

export const IpfsGatewayTable: ComponentWithChildren<IpfsGatewayTableProps> = ({
  gateways,
  setGateways,
  setEditModalOpen,
  setActiveGateway,
}) => {
  const handleEditKey = useCallback(
    (ipfsGateway: string) => {
      const foundKey = gateways.find((item) => item.url === ipfsGateway);
      if (foundKey) {
        setActiveGateway(foundKey);
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
                  <DeleteGatewayButton
                    setGateways={setGateways}
                    gatewayUrl={cell.getValue()}
                  />
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
    <TWTable
      title="ipfs gateway"
      columns={columns}
      data={gateways}
      isLoading={false}
      isFetched={true}
    />
  );
};

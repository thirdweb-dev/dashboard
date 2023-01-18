import { ConfiguredNetworkInfo } from "./types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Icon,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "tw-components";

interface ConfiguredNetworkListProps {
  onDelete: (network: ConfiguredNetworkInfo) => void;
  networks: ConfiguredNetworkInfo[];
  onClick: (network: ConfiguredNetworkInfo) => void;
}

export const ConfiguredNetworkList: React.FC<ConfiguredNetworkListProps> = (
  props,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [deleteNetwork, setDeleteNetwork] =
    useState<ConfiguredNetworkInfo | null>(null);
  return (
    <>
      <List
        spacing={0}
        maxH="550px"
        overflow="scroll"
        pb={8}
        sx={{
          "mask-image":
            "linear-gradient(to bottom, black 90%, transparent 100%)",
        }}
      >
        {props.networks.map((network) => (
          <ListItem key={network.chainId} display="flex" alignItems="center">
            <Button
              display="flex"
              justifyContent="flex-start"
              w="100%"
              background="transparent"
              fontWeight={500}
              fontSize="14px"
              color="highlight"
              p={0}
              _hover={{
                color: "HighlightText",
                background: "transparent",
              }}
              onClick={() => props.onClick(network)}
              whiteSpace="normal"
              textAlign="left"
              lineHeight={1.5}
            >
              {network.name}
            </Button>
            <Icon
              as={MdDelete}
              cursor="pointer"
              color="highlight"
              opacity={0.5}
              _hover={{
                opacity: 1,
              }}
              onClick={() => {
                setDeleteNetwork(network);
                onOpen();
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Alert Dialog for Deletion */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Configured Network
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  props.onDelete(deleteNetwork as ConfiguredNetworkInfo);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

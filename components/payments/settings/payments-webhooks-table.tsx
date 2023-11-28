import { PaymentsWebhooksType, isValidWebhookUrl } from "@3rdweb-sdk/react/hooks/usePayments";
import {
  ButtonGroup,
  FormLabel,
  FormControl,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { format } from "date-fns";
import { Button, Text } from "tw-components";
import { BiPencil } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import { FaXmark } from "react-icons/fa6";
import { TWTable } from "components/shared/TWTable";


export interface PaymentsWebhooksTableProps {
  webhooks: PaymentsWebhooksType[];
  onCreate: (url: string) => void;
  onUpdate: (webhookId: PaymentsWebhooksType["id"], newUrl: string) => void;
  onDelete: (webhookId: PaymentsWebhooksType["id"]) => void;
  isLoading: boolean;
  isFetched: boolean;
};

type AddWebhookType = Partial<PaymentsWebhooksType>;

type TableWebhookType = PaymentsWebhooksType | AddWebhookType;

const columnHelper = createColumnHelper<TableWebhookType>();


interface UrlInputFieldProps {
  webhookUrl: string;
  onBlur: () => void;
};

const UrlInputField = React.forwardRef<HTMLInputElement, UrlInputFieldProps>(
  ({ webhookUrl, onBlur }, ref) => {
    const [inputValue, setInputValue] = React.useState(webhookUrl);
    const isValid = isValidWebhookUrl(inputValue);

    const handleOnBlur = () => {

      setTimeout(onBlur, 100);
    }

    return (
      <FormControl isInvalid={!isValid && !!inputValue}>
        <Input
          ref={ref}
          type="url"
          id="webhook-url"
          placeholder="Webhook URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleOnBlur}
        />
      </FormControl>
    );
  }
);

export const PaymentsWebhooksTable: React.FC<PaymentsWebhooksTableProps> = ({
  webhooks,
  onUpdate,
  onDelete,
  onCreate,
  isLoading,
  isFetched
}) => {
  const [editId, setEditId] = React.useState<PaymentsWebhooksType["id"]>("");

  const editWebhookRef = React.useRef<HTMLInputElement>(null);
  const createWebhookRef = React.useRef<HTMLInputElement>(null);

  const [webhookToRevoke, setWebhookToRevoke] = React.useState<TableWebhookType>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    // When the editId changes, focus on the corresponding input
    if (editId && editWebhookRef.current) {
      editWebhookRef.current.focus();
      editWebhookRef.current.select();
    }
  }, [editId]);


  const onEdit = (webhook: TableWebhookType) => {
    if (webhook.id) {
      setEditId(webhook.id);
    }
  };

  const onCancelEdit = () => {
    setEditId(""); // Reset the editing state
  };

  const onAcceptEdit = () => {
    if (editWebhookRef.current) {
      onUpdate(editId, editWebhookRef.current.value);
      setEditId("");
    }
  };

  const onConfirmDelete = () => {
    onClose();
    if (webhookToRevoke && webhookToRevoke.id) {
      onDelete(webhookToRevoke.id);
    }
  }

  const _onCreate = () => {
    if (createWebhookRef.current) {
      onCreate(createWebhookRef.current.value);
    }
  }

  const _onDelete = (webhook: TableWebhookType) => {
    if(webhook.id)
    {
      setWebhookToRevoke(webhook);
      onOpen();
    }
  }

  const canAddNewWebhook = webhooks.length < 3;

  const columns = [
    columnHelper.accessor("url", {
      header: "Url",
      cell: (cell) => {
        if (cell.row.original.id) { // exists case
          if (cell.row.original.id === editId) { // edit case
            return (
              <UrlInputField
                ref={editWebhookRef}
                webhookUrl={cell.row.original.url ?? ""}
                onBlur={onCancelEdit}
              />
            );
          }
          else { // non-edit case
            return (<Text>{cell.row.original.url}</Text>);
          }
        }
        else { // add case 
          return (
            <UrlInputField
              ref={createWebhookRef}
              webhookUrl=""
              onBlur={() => { }}
            />
          )
        }
      },
    }),
    columnHelper.accessor((row) => row, {
      header: "actions",
      id: "actions",
      cell: (cell) => {

        if (cell.row.original.id) { // exists case
          if (cell.row.original.id === editId) { // edit case
            return (
              <>
                <ButtonGroup variant="ghost" gap={2}>
                  <IconButton
                    onClick={onAcceptEdit}
                    icon={<Icon as={FaCheck} boxSize={4} />}
                    aria-label="Accept"
                  />
                  <IconButton
                    onClick={onCancelEdit} // call delete
                    icon={<Icon as={FaXmark} boxSize={4} />}
                    aria-label="Cancel"
                  />
                </ButtonGroup>
              </>
            )
          }
          else { // non-edit case
            return (
              <>
                <ButtonGroup variant="ghost" gap={2}>
                  <IconButton
                    onClick={() => { onEdit(cell.row.original); }} // set 
                    icon={<Icon as={BiPencil} boxSize={4} />}
                    aria-label="Edit"
                  />
                  <IconButton
                    onClick={() => { _onDelete(cell.row.original); }} // call delete
                    icon={<Icon as={FiTrash} boxSize={4} />}
                    aria-label="Remove"
                  />
                </ButtonGroup>
              </>
            )
          }
        }
        else { // add case
          return (
            <Button
              size="sm"
              leftIcon={<IoMdAdd />}
              onClick={_onCreate}
            >
              Create Webhook
            </Button>
          )
        }
      }
    })
  ];

  let data: TableWebhookType[] = [...webhooks];

  if (canAddNewWebhook) {
    data.push({ url: "Enter Webhook Url" });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete webhook</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {webhookToRevoke && (
              <Stack gap={4}>
                <Text>Are you sure you want to delete this webook?</Text>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Text>{webhookToRevoke?.isProduction ? "Production": "Testnet"}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>URL</FormLabel>
                  <Text>{webhookToRevoke?.url}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel>Created at</FormLabel>
                  <Text>
                    {format(
                      new Date(webhookToRevoke?.createdAt ?? ""),
                      "PP pp z",
                    )}
                  </Text>
                </FormControl>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter as={Flex} gap={3}>
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button type="submit" colorScheme="red" onClick={onConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TWTable
        title="webhooks"
        data={data}
        columns={columns}
        isLoading={isLoading}
        isFetched={isFetched}
      />
    </>
  );

};
import { PaymentsWebhooksType, isValidWebhookUrl } from "@3rdweb-sdk/react/hooks/usePayments";
import {
  ButtonGroup,
  FormControl,
  Icon,
  IconButton,
  Input
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
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

  // on edit: 
  // set focus on 

  /**
   * On Edit
   *  1. set is edit for id
   *  2. set focus for input field
   *  3. change edit button to accept for id
   *  4. validate url field
   *  5. set edit value
   *  6. accept -> overwrite with edit value
   */

  // const [addWebhookUrl, setAddWebhookUrl] = React.useState<PaymentsWebhooksType["url"]>("");
  // const [editWebhookUrl, setEditWebhookUrl] = React.useState<PaymentsWebhooksType["url"]>("");
  const [editId, setEditId] = React.useState<PaymentsWebhooksType["id"]>("");

  const editWebhookRef = React.useRef<HTMLInputElement>(null);
  const createWebhookRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    console.log("Rendering");
  })

  React.useEffect(() => {
    // When the editId changes, focus on the corresponding input
    if (editId && editWebhookRef.current) {
      editWebhookRef.current.focus();
    }
  }, [editId]);


  const onEdit = (webhook: TableWebhookType) => {
    if (webhook.id) {
      setEditId(webhook.id);
    }
  };

  const onCancelEdit = () => {
    console.log(`Cancelling edit!`);
    setEditId(""); // Reset the editing state
  };

  const onAccept = () => {
    console.log(`On Accept!`);
    if (editWebhookRef.current) {
      console.log(`Accepting the edits!`);
      onUpdate(editId, editWebhookRef.current.value);
      setEditId("");
    }
  };

  const _onDelete = (webhook: TableWebhookType) => {
    if (webhook.id) {
      onDelete(webhook.id);
    }
  }

  const _onCreate = () => {
    if (createWebhookRef.current) {
      onCreate(createWebhookRef.current.value);
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
              onBlur={() => {}}
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
                    onClick={onAccept}
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
    <TWTable
      title="webhooks"
      data={data}
      columns={columns}
      isLoading={isLoading}
      isFetched={isFetched}
    />
  );

};
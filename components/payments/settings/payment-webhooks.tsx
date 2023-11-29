import {
  usePaymentsWebhooksByAccountId,
  usePaymentsCreateWebhook,
  usePaymentsUpdateWebhook,
  type CreateWebhookInput,
  type UpdateWebhookInput,
  isValidWebhookUrl,
} from "@3rdweb-sdk/react/hooks/usePayments";
import type { PaymentsWebhooksType } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex, Divider, useColorModeValue } from "@chakra-ui/react";
import {
  Card,
  Heading,
  CodeBlock
} from "tw-components";
import { PaymentsWebhooksTable, PaymentsWebhooksTableProps } from "./payments-webhooks-table";
import React from "react";
import { DetailsRow } from "components/settings/ApiKeys/DetailsRow";
import { randomBytes } from "ethers/lib/utils";
import {
  Alert,
  AlertTitle,
  AlertIcon,
  Text,
  AlertDescription
} from "@chakra-ui/react";

interface PaymentsWebhooksProps {
  accountId: string;
}


export const PaymentsWebhooks: React.FC<PaymentsWebhooksProps> = ({
  accountId,
}) => {

  const [productionWebhooks, setProductionWebhooks] = React.useState<PaymentsWebhooksType[]>([]);
  const [testnetWebhooks, setTestnetWebhooks] = React.useState<PaymentsWebhooksType[]>([]);

  const { data: webhooks, isLoading: isGetLoading, isFetched, error } = usePaymentsWebhooksByAccountId(accountId);
  const { mutate: updateWebhook, isLoading: isUpdateLoading, error: updateError, isSuccess: isUpdateSuccess } = usePaymentsUpdateWebhook(accountId);
  const { mutate: createWebhook, isLoading: isCreateLoading, error: createError, isSuccess: isCreateSuccess } = usePaymentsCreateWebhook(accountId);

  const [isUpdateDelete, setIsUpdateDelete] = React.useState(false);
  const [currentDeleteWebhook, setCurrentDeleteWebhook] = React.useState<PaymentsWebhooksType>();
  const [currentUpdateWebhook, setCurrentUpdateWebhook] = React.useState<PaymentsWebhooksType>();

  const [currentCreateWebhook, setCurrentCreateWebhook] = React.useState<PaymentsWebhooksType>();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertHeader, setAlertHeader] = React.useState("");
  const [alertDescription, setAlertDescription] = React.useState("");
  const [alertStatus, setAlertStatus] = React.useState<"error" | "success">();

  const setAlertTimeout = () => {
    setTimeout(() => {
      setShowAlert(false);
      setAlertHeader("");
      setAlertDescription("");
      setAlertStatus(undefined);
    }, 3000);
  }

  const triggerAlert = (status: "error"|"success", header: string, description: string) => {
    setAlertStatus(status);
    setAlertHeader(header);
    setAlertDescription(description);
    setShowAlert(true);
    setAlertTimeout();
  }

  React.useEffect(() => {
    if(error)
    {
      console.log(`Failed to fetch webhooks`);
    }
    else if(updateError)
    {
      if(isUpdateDelete)
      {
        triggerAlert("error", "Failed to Delete Webhook", `Failed to delete ${currentDeleteWebhook?.isProduction ? "production" : "testnet"} webhook with url: ${currentDeleteWebhook?.url}`);
      }
      else
      {
        triggerAlert("error", "Failed to Update Webhook", `Failed to update ${currentUpdateWebhook?.isProduction ? "production" : "testnet"} webhook to url: ${currentUpdateWebhook?.url}`);
      }
    }
    else if(createError)
    {
      triggerAlert("error", "Failed to Create Webhook", `Failed to create  ${currentUpdateWebhook?.isProduction ? "production" : "testnet"} webhook with url: ${currentCreateWebhook?.url}`);
    }
  }, [error, updateError, createError]);

  React.useEffect(() => {

    if(isUpdateSuccess)
    {
      if(isUpdateDelete)
      {
        triggerAlert("success", "Webhook Deleted", `Successfully deleted ${currentDeleteWebhook?.isProduction ? "production" : "testnet"} webhook with url: ${currentDeleteWebhook?.url}`)
      }
      else {
        triggerAlert("success", "Webhook Updated", `Successfully updated ${currentDeleteWebhook?.isProduction ? "production" : "testnet"} webhook with url: ${currentUpdateWebhook?.url}`)
      } 
    }
    else if(isCreateSuccess)
    {
      triggerAlert("success", "Webhook Created", `Successfully created  ${currentUpdateWebhook?.isProduction ? "production" : "testnet"} webhook with url: ${currentCreateWebhook?.url}`);
    }

  }, [isUpdateSuccess, isCreateSuccess]);

  const [secretKey, setSecretKey] = React.useState<string>("");
  React.useEffect(() => {
    setSecretKey([...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
  }, []);


  React.useEffect(() => {
    if (webhooks) {
      const _productionWebhooks = webhooks.filter(webhook => webhook.isProduction);
      const _testnetWebhooks = webhooks.filter(webhook => !webhook.isProduction);

      setProductionWebhooks(_productionWebhooks);
      setTestnetWebhooks(_testnetWebhooks);
    }
  }, [webhooks]);


  const updateWebhookHandlerFactory = (isProduction: boolean) => {

    const onUpdateWebhook: PaymentsWebhooksTableProps["onUpdate"] = (webhook, newUrl) => {
      if(!isValidWebhookUrl(newUrl))
      {
        triggerAlert("error", "Invalid Webhook Url", `${newUrl} is not a valid webhook url, please try a different url`);
        return;
      }

      // used for alerts
      setIsUpdateDelete(false);
      setCurrentUpdateWebhook({ ...webhook, url: newUrl! });

      // send the request
      updateWebhook({ webhookId: webhook.id, url: newUrl });
    };

    return onUpdateWebhook;
  }

  const deleteWebhookHandlerFactory = (isProduction: boolean) => {
    const onDeleteWebhook: PaymentsWebhooksTableProps["onDelete"] = (webhook) => {
      // used for alerts
      setIsUpdateDelete(true);
      setCurrentDeleteWebhook(webhook);

      // mutate
      updateWebhook({ webhookId: webhook.id, deletedAt: (new Date()) });
    };

    return onDeleteWebhook;
  }

  const createWebhookHandlerFactory = (isProduction: boolean) => {
    const onAddWebhook: PaymentsWebhooksTableProps["onCreate"] = async (url) => {

      if(!isValidWebhookUrl(url))
      {
        triggerAlert("error", "Invalid Webhook Url", `${url} is not a valid webhook url, please try a different url`);
        return;
      }
      
      const _webhook: PaymentsWebhooksType = { id: "0", sellerId: accountId, url, isProduction, createdAt: new Date() };

      // used for alerts
      setCurrentCreateWebhook(_webhook);

      // mutate
      createWebhook({ url: url, isProduction });
    };
    return onAddWebhook;
  };

  return (
    <>
      <Card
        p={8}
        as={Flex}
        flexDir="column"
        gap={8}
        maxW={{ base: "full", xl: "70%" }}
      >
        <Flex flexDir="column" gap={2}>
          <Heading>Webhooks</Heading>
        </Flex>
        <DetailsRow
          title="Secret Key"
          tooltip={`Used for authenticating the webhook request`}
          content={<CodeBlock code={secretKey} />}
        />

        <Divider />

        <Flex flexDir="column" gap={2}>
          <Heading size={"title.md"}>Production</Heading>
          <PaymentsWebhooksTable
            webhooks={productionWebhooks}
            onCreate={createWebhookHandlerFactory(true)}
            onUpdate={updateWebhookHandlerFactory(true)}
            onDelete={deleteWebhookHandlerFactory(true)}
            isLoading={isGetLoading || isUpdateLoading || isCreateLoading}
            isFetched={isFetched}
          />
        </Flex>

        <Divider />
        <Flex flexDir="column" gap={2}>
          <Heading size={"title.md"}>Testnet</Heading>
          <PaymentsWebhooksTable
            webhooks={testnetWebhooks}
            onCreate={createWebhookHandlerFactory(false)}
            onUpdate={updateWebhookHandlerFactory(false)}
            onDelete={deleteWebhookHandlerFactory(false)}
            isLoading={isGetLoading || isUpdateLoading || isCreateLoading}
            isFetched={isFetched}
          />
        </Flex>
      </Card>
      {showAlert && (
        <Alert status={alertStatus} variant="left-accent">
          <Flex direction="column" gap={2}>
            <Heading size="label.md" as={AlertTitle}>
              {alertHeader}
            </Heading>
            <Text size="body.sm" as={AlertDescription}>
              {alertDescription}
            </Text>
          </Flex>
        </Alert>
      )}
    </>
  )
};

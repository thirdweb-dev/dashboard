import {
  usePaymentsWebhooksByAccountId,
  usePaymentsCreateWebhook,
  usePaymentsUpdateWebhook,
  type CreateWebhookInput,
  type UpdateWebhookInput,
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

interface PaymentsWebhooksProps {
  accountId: string;
}

export const PaymentsWebhooks: React.FC<PaymentsWebhooksProps> = ({
  accountId,
}) => {

  const [productionWebhooks, setProductionWebhooks] = React.useState<PaymentsWebhooksType[]>([]);
  const [testnetWebhooks, setTestnetWebhooks] = React.useState<PaymentsWebhooksType[]>([]);

  const { data: webhooks, isLoading: isGetLoading, isFetched, error } = usePaymentsWebhooksByAccountId(accountId);

  const { mutate: updateWebhook, isLoading: isUpdateLoading } = usePaymentsUpdateWebhook(accountId);
  const { mutate: createWebhook, isLoading: isCreateLoading } = usePaymentsCreateWebhook(accountId);

  const [secretKey, setSecretKey] = React.useState<string>("");
  React.useEffect(() => {
    setSecretKey([...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
  }, []);

  console.log(`Data: ${JSON.stringify(webhooks)}`);

  React.useEffect(() => {
    if (webhooks) {
      const _productionWebhooks = webhooks.filter(webhook => webhook.isProduction);
      const _testnetWebhooks = webhooks.filter(webhook => !webhook.isProduction);

      setProductionWebhooks(_productionWebhooks);
      setTestnetWebhooks(_testnetWebhooks);
    }
  }, [webhooks]);


  const updateWebhookHandlerFactory = (isProduction: boolean) => {

    const onUpdateWebhook: PaymentsWebhooksTableProps["onUpdate"] = (webhookId, newUrl) => {
      console.log(`editing webhook id: ${webhookId}, new url: ${newUrl}`);
      updateWebhook({ webhookId, url: newUrl });
      const _setter = isProduction ? setProductionWebhooks : setTestnetWebhooks;

      _setter(_webhooks => _webhooks.map(_webhook => {
        if (_webhook.id === webhookId) {
          return { ..._webhook, url: newUrl };
        }
        return _webhook;
      }));

    };

    return onUpdateWebhook;
  }

  const deleteWebhookHandlerFactory = (isProduction: boolean) => {
    const onDeleteWebhook: PaymentsWebhooksTableProps["onDelete"] = (webhookId) => {
      console.log(`deleting webhook id: ${webhookId}`);
      updateWebhook({ webhookId, deletedAt: (new Date()) })
      const _setter = isProduction ? setProductionWebhooks : setTestnetWebhooks;
      _setter(_webhooks => _webhooks.filter(_webhook => _webhook.id !== webhookId));
    };

    return onDeleteWebhook;
  }

  const createWebhookHandlerFactory = (isProduction: boolean) => {
    const onAddWebhook: PaymentsWebhooksTableProps["onCreate"] = async (url) => {
      createWebhook({ url: url, isProduction });

      const _newWebhook: PaymentsWebhooksType = { id: "0", sellerId: accountId, url, isProduction, createdAt: new Date() };
      const _setter = isProduction ? setProductionWebhooks : setTestnetWebhooks;
      _setter(_webhooks => [..._webhooks, _newWebhook]);
    };
    return onAddWebhook;
  };

  return (
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
          isLoading={isGetLoading}
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
          isLoading={isGetLoading}
          isFetched={isFetched}
        />
      </Flex>
    </Card>
  )
};

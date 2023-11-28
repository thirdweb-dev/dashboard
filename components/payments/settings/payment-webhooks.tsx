import { usePaymentsWebhooksByAccountId } from "@3rdweb-sdk/react/hooks/usePayments";
import type { PaymentsWebhooksType } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex, Divider } from "@chakra-ui/react";
import {
  Card,
  Heading
} from "tw-components";
import { PaymentsWebhooksTable, PaymentsWebhooksTableProps } from "./payments-webhooks-table";
import React from "react";

interface PaymentsWebhooksProps {
  accountId: string;
}

export const PaymentsWebhooks: React.FC<PaymentsWebhooksProps> = ({
  accountId,
}) => {

  const [productionWebhooks, setProductionWebhooks] = React.useState<PaymentsWebhooksType[]>([]);
  const [testnetWebhooks, setTestnetWebhooks] = React.useState<PaymentsWebhooksType[]>([]);

  const { data: webhooks, isLoading, isFetched, error } = usePaymentsWebhooksByAccountId(accountId);

  React.useEffect(() => {
    if (webhooks) {
      const _productionWebhooks = webhooks.filter(webhook => webhook.isProduction);
      const _testnetWebhooks = webhooks.filter(webhook => !webhook.isProduction);

      setProductionWebhooks(_productionWebhooks);
      setTestnetWebhooks(_testnetWebhooks);
    }
  }, [webhooks]);

  const onUpdateWebhook: PaymentsWebhooksTableProps["onUpdate"] = (webhookId, newUrl) => {
    console.log(`editing webhook id: ${webhookId}, new url: ${newUrl}`);
  };

  const onDeleteWebhook: PaymentsWebhooksTableProps["onDelete"] = (webhookId) => {
    console.log(`deleting webhook id: ${webhookId}`);
  };

  const createWebhookHandlerFactory = (isProduction: boolean) => {
    const onAddWebhook: PaymentsWebhooksTableProps["onCreate"] = (url) => {
      console.log(`Adding production: ${isProduction} webhook, ${url}`);
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

      <Divider />

      <Flex flexDir="column" gap={2}>
        <Heading size={"title.md"}>Production</Heading>
        <PaymentsWebhooksTable
          webhooks={productionWebhooks}
          onCreate={createWebhookHandlerFactory(true)}
          onUpdate={onUpdateWebhook}
          onDelete={onDeleteWebhook}
          isLoading={isLoading}
          isFetched={isFetched}
        />
      </Flex>

      <Divider />
      <Flex flexDir="column" gap={2}>
        <Heading size={"title.md"}>Testnet</Heading>
        <PaymentsWebhooksTable
          webhooks={testnetWebhooks}
          onCreate={createWebhookHandlerFactory(false)}
          onUpdate={onUpdateWebhook}
          onDelete={onDeleteWebhook}
          isLoading={isLoading}
          isFetched={isFetched}
        />
      </Flex>
    </Card>
  )
};

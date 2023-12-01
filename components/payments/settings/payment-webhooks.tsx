import {
  usePaymentsWebhooksByAccountId,
  usePaymentsWebhooksSecretKeyByAccountId,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex, Divider, Spinner } from "@chakra-ui/react";
import { Card, Heading, CodeBlock } from "tw-components";
import { PaymentsWebhooksTable } from "./payments-webhooks-table";
import { DetailsRow } from "components/settings/ApiKeys/DetailsRow";
import { useMemo } from "react";
import { PaymentsWebhooksCreateButton } from "./payments-webhooks-create-webhook-button";

const WEBHOOK_LIMIT = 3;

interface PaymentsWebhooksProps {
  accountId: string;
}

export const PaymentsWebhooks: React.FC<PaymentsWebhooksProps> = ({
  accountId,
}) => {
  const { data: webhookApiKey, isLoading: isLoadingSecretKey } =
    usePaymentsWebhooksSecretKeyByAccountId(accountId);
  const {
    data: webhooks,
    isLoading,
    isFetched,
  } = usePaymentsWebhooksByAccountId(accountId);

  const { productionWebhooks, testnetWebhooks } = useMemo(
    () => ({
      productionWebhooks:
        webhooks?.filter((webhook) => webhook.isProduction) || [],
      testnetWebhooks:
        webhooks?.filter((webhook) => !webhook.isProduction) || [],
    }),
    [webhooks],
  );

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
          content={
            isLoadingSecretKey ? (
              <Flex justifyContent="center" alignItems="center">
                <Spinner size="sm" />
              </Flex>
            ) : (
              <CodeBlock code={webhookApiKey?.data?.decrypted_key ?? ""} />
            )
          }
        />

        <Divider />

        <Flex flexDir="column" gap={2}>
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Heading size="title.md">Mainnet</Heading>
            <PaymentsWebhooksCreateButton
              accountId={accountId}
              isMainnet={true}
              disabled={productionWebhooks.length >= WEBHOOK_LIMIT}
            />
          </Flex>
          <PaymentsWebhooksTable
            accountId={accountId}
            webhooks={productionWebhooks}
            isLoading={isLoading}
            isFetched={isFetched}
          />
        </Flex>

        <Divider />
        <Flex flexDir="column" gap={2}>
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Heading size="title.md">Testnet</Heading>
            <PaymentsWebhooksCreateButton
              accountId={accountId}
              isMainnet={false}
              disabled={testnetWebhooks.length >= WEBHOOK_LIMIT}
            />
          </Flex>
          <PaymentsWebhooksTable
            accountId={accountId}
            webhooks={testnetWebhooks}
            isLoading={isLoading}
            isFetched={isFetched}
          />
        </Flex>
      </Card>
    </>
  );
};

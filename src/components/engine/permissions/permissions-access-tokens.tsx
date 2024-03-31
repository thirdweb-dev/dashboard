import { useEngineAccessTokens } from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex } from "@chakra-ui/react";
import { Heading, Link, Text } from "tw-components";
import { AddAccessTokenButton } from "./add-access-token-button";
import { AccessTokensTable } from "./access-tokens-table";

interface PermissionsAccessTokensProps {
  instanceUrl: string;
}

export const PermissionsAccessTokens: React.FC<
  PermissionsAccessTokensProps
> = ({ instanceUrl }) => {
  const accessTokens = useEngineAccessTokens(instanceUrl);

  return (
    <Flex flexDir="column" gap={4}>
      <Flex flexDir="column" gap={2}>
        <Heading size="title.md">Access Tokens</Heading>
        <Text>
          Access tokens allow API access to your Engine instance.{" "}
          <Link
            href="https://portal.thirdweb.com/engine/features/permissions#create-an-access-token"
            color="primary.500"
            isExternal
          >
            Learn more about access tokens
          </Link>
          .
        </Text>
      </Flex>
      <AccessTokensTable
        instanceUrl={instanceUrl}
        accessTokens={accessTokens.data || []}
        isLoading={accessTokens.isLoading}
        isFetched={accessTokens.isFetched}
      />
      <AddAccessTokenButton instanceUrl={instanceUrl} />
    </Flex>
  );
};

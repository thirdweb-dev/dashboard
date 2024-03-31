import {
  useEngineAccessTokens,
  useEngineKeypairs,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Code, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { CodeBlock, Heading, Link, Text } from "tw-components";
import { AccessTokensTable } from "./access-tokens-table";
import { AddAccessTokenButton } from "./add-access-token-button";
import { AddKeypairButton } from "./add-keypair-button";
import { KeypairsTable } from "./keypairs-table";

interface EngineAccessTokensProps {
  instanceUrl: string;
}

type AccessTokenType = "standard" | "keypair";

export const EngineAccessTokens: React.FC<EngineAccessTokensProps> = ({
  instanceUrl,
}) => {
  const [selected] = useState<AccessTokenType>("standard");

  return (
    <Flex flexDir="column" gap={4}>
      <Flex flexDir="column" gap={2}>
        <Heading size="title.md">Access Tokens</Heading>
      </Flex>

      {/* <ButtonGroup size="sm" variant="ghost" spacing={2}>
        <Button
          type="button"
          isActive={selected === "standard"}
          _active={{
            bg: "bgBlack",
            color: "bgWhite",
          }}
          rounded="lg"
          onClick={() => setSelected("standard")}
        >
          Standard
        </Button>
        <Button
          type="button"
          isActive={selected === "keypair"}
          _active={{
            bg: "bgBlack",
            color: "bgWhite",
          }}
          rounded="lg"
          onClick={() => setSelected("keypair")}
        >
          Restricted
        </Button>
      </ButtonGroup> */}

      {selected === "standard" ? (
        <StandardAccessTokensPanel instanceUrl={instanceUrl} />
      ) : selected === "keypair" ? (
        <RestrictedAccessTokensPanel instanceUrl={instanceUrl} />
      ) : null}
    </Flex>
  );
};

const StandardAccessTokensPanel = ({
  instanceUrl,
}: {
  instanceUrl: string;
}) => {
  const accessTokens = useEngineAccessTokens(instanceUrl);

  return (
    <>
      <Text>
        Access tokens allow API access to Engine.{" "}
        <Link
          href="https://portal.thirdweb.com/engine/features/permissions#create-an-access-token"
          color="primary.500"
          isExternal
        >
          Learn more about access tokens
        </Link>
        .
      </Text>

      <AccessTokensTable
        instanceUrl={instanceUrl}
        accessTokens={accessTokens.data ?? []}
        isLoading={accessTokens.isLoading}
        isFetched={accessTokens.isFetched}
      />
      <AddAccessTokenButton instanceUrl={instanceUrl} />

      <Flex direction="column" gap={2} mt={16}>
        <Heading size="title.md">Authenticate with your access token</Heading>
        <Text>
          Set the <Code>authorization</Code> header.
        </Text>
        <CodeBlock
          language="typescript"
          code={`const resp = fetch("<engine_url>/backend-wallet/get-all", {
  headers: {
    authorization: "Bearer <access_token>",
  },
});`}
        />
      </Flex>
    </>
  );
};

const RestrictedAccessTokensPanel = ({
  instanceUrl,
}: {
  instanceUrl: string;
}) => {
  const keypairs = useEngineKeypairs(instanceUrl);

  return (
    <>
      <Text>
        Restricted access tokens allow API access to Engine for a configurable
        duration.
        <br />
        They are securely signed by your backend and verified with a registered
        public key.{" "}
        <Link
          href="https://portal.thirdweb.com/engine/features/permissions#create-an-access-token"
          color="primary.500"
          isExternal
        >
          Learn more about restricted access tokens
        </Link>
        .
      </Text>

      <KeypairsTable
        instanceUrl={instanceUrl}
        keypairs={keypairs.data || []}
        isLoading={keypairs.isLoading}
        isFetched={keypairs.isFetched}
      />
      <AddKeypairButton instanceUrl={instanceUrl} />

      <Flex direction="column" gap={2} mt={16}>
        <Heading size="title.md">
          Authenticate with your restricted access token
        </Heading>

        <Text>
          Set the <Code>x-restricted-access-token</Code> header.
        </Text>
        <CodeBlock
          language="typescript"
          code={`import jsonwebtoken from "jsonwebtoken";

// Load the public and private keys.
const publicKey = fs.readFileSync("public.key");
const privateKey = fs.readFileSync("private.key");

// Generate a restricted access token.
const payload = {
  iss: publicKey,
};
const restrictedAccessToken = jsonwebtoken.sign(payload, privateKey, {
  algorithm: "ES256",
  expiresIn: "15s", // Invalidate after 15 seconds
});

// Call Engine.
const resp = fetch("<engine_host>/backend-wallet/get-all", {
  headers: {
    "x-restricted-access-token": restrictedAccessToken,
  },
});`}
        />
      </Flex>
    </>
  );
};

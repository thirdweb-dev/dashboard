import { useModuleName } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useWeb3 } from "@3rdweb/hooks";
import { Box, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { Card } from "components/layout/Card";
import merge from "lodash.merge";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { ABICopyButton } from "./ABICopyButton";
import { CodeSegment } from "./CodeSegment";
import {
  CodeSnippet,
  Environment,
  SnippetApiResponse,
  SnippetSchema,
} from "./types";

function replaceVariablesInCodeSnippet(
  snippet: CodeSnippet,
  moduleAddress?: string,
  walletAddress?: string,
): CodeSnippet {
  const envs = Object.keys(snippet) as Environment[];
  for (const env of envs) {
    if (moduleAddress) {
      snippet[env] = snippet[env]?.replace(
        /{{module_address}}/gm,
        moduleAddress,
      );
    }

    if (walletAddress) {
      snippet[env] = snippet[env]?.replace(
        /{{wallet_address}}/gm,
        walletAddress,
      );
    }
  }
  return snippet;
}

interface IModuleCode {
  module?: EitherBaseModuleType;
}

export const ModuleCode: React.FC<IModuleCode> = ({ module }) => {
  const { data, isLoading } = useModuleCodeSnippetQuery();

  const moduleName = useModuleName(module);

  const scopedData = useMemo(() => {
    return getModuleSnippets(data, moduleName);
  }, [data, moduleName]);

  const { address } = useWeb3();
  const [environment, setEnvironment] = useState<Environment>("javascript");
  const replaceSnippetVars = useCallback(
    (snip: Partial<Record<Environment, string>>) =>
      replaceVariablesInCodeSnippet(snip, module?.address, address),
    [address, module?.address],
  );

  if (isLoading) {
    return (
      <Card>
        <Spinner /> Loading...
      </Card>
    );
  }

  if (!scopedData) {
    return (
      <Card>
        <Heading as="h2" size="title.sm">
          Code snippets for this module are not yet available.
        </Heading>
        <Text>Please check back for updates over the next couple of days.</Text>
      </Card>
    );
  }

  return (
    <Stack spacing={4}>
      <Card>
        <Stack spacing={3}>
          <Heading size="title.sm">Getting Started</Heading>
          <Text>
            Follow along below to get started using this module in your code.
          </Text>
          <CodeSegment
            snippet={replaceSnippetVars(scopedData.examples)}
            environment={environment}
            setEnvironment={setEnvironment}
          />
        </Stack>
      </Card>
      {scopedData.methods?.map((method) => {
        return (
          <Card key={method.name}>
            <Stack spacing={4}>
              <Heading size="label.lg">{method.summary}</Heading>
              {method.remarks && <Text>{method.remarks}</Text>}
              {method.signature && (
                <Stack spacing={2}>
                  <Heading size="label.sm">Method Signature</Heading>
                  <Box
                    borderRadius="sm"
                    overflow="hidden"
                    height={`${
                      19 * (method.signature.split("\n").length || 1) + 16
                    }px`}
                    w="100%"
                  >
                    <Editor
                      value={method.signature}
                      defaultLanguage="typescript"
                      theme="vs-dark"
                      options={{
                        lineNumbers: "off",
                        padding: {
                          top: 8,
                          bottom: 8,
                        },
                        contextmenu: false,
                        codeLens: false,
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: 0,
                      }}
                    />
                  </Box>
                </Stack>
              )}
              <CodeSegment
                snippet={replaceSnippetVars(method.examples)}
                environment={environment}
                setEnvironment={setEnvironment}
              />
            </Stack>
          </Card>
        );
      })}

      <Card>
        <Flex direction="row" gap={2} justify="space-between" align="flex-end">
          <Flex direction="column" gap={2}>
            <Heading size="title.sm">Module ABI</Heading>
            <Text>
              If you need the underlying contract ABI for this module you can
              copy it from here.
            </Text>
          </Flex>
          <ABICopyButton colorScheme="purple" module={module} />
        </Flex>
      </Card>
    </Stack>
  );
};

function getModuleSnippets(
  snippets?: SnippetApiResponse,
  moduleName?: string | null,
): SnippetSchema | null {
  return moduleName && snippets ? snippets[moduleName] : null;
}

function useModuleCodeSnippetQuery() {
  return useQuery(["code-snippet"], async () => {
    const tsRes = await fetch(
      `https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/v1/docs/snippets.json`,
    );
    const pyRes = await fetch(
      "https://raw.githubusercontent.com/thirdweb-dev/python-sdk/master/snippets/snippets.json",
    );

    const tsJson = (await tsRes.json()) as SnippetApiResponse;
    const pyJson = (await pyRes.json()) as SnippetApiResponse;
    const merged = merge({ ...pyJson }, { ...tsJson });

    return merged;
  });
}

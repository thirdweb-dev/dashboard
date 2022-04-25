import { CodeSnippet, Environment, SupportedEnvironment } from "./types";
import { ButtonGroup, Flex, Icon, Stack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { Button, CodeBlock, Heading } from "tw-components";

interface ICodeSegment {
  snippet: CodeSnippet;
  environment: Environment;
  setEnvironment: Dispatch<SetStateAction<Environment>>;
}

const Environments: SupportedEnvironment[] = [
  {
    environment: "javascript",
    title: "JavaScript",
    icon: SiJavascript,
  },
  {
    environment: "typescript",
    title: "TypeScript",
    icon: SiTypescript,
  },
];

export const CodeSegment: React.FC<ICodeSegment> = ({
  snippet,
  environment,
  setEnvironment,
}) => {
  const activeEnvironment: Environment = useMemo(() => {
    return (
      snippet[environment] ? environment : Object.keys(snippet)[0]
    ) as Environment;
  }, [environment, snippet]);

  const activeSnippet = useMemo(() => {
    return snippet[activeEnvironment];
  }, [activeEnvironment, snippet]);

  const lines = useMemo(
    () => (activeSnippet ? activeSnippet.split("\n") : []),
    [activeSnippet],
  );

  const code = lines.join("\n");
  const environments = Environments.filter((env) =>
    Object.keys(snippet).includes(env.environment),
  );

  return (
    <Stack spacing={2}>
      <Flex justify="space-between" align="flex-end">
        <Flex direction="column" gap={4}>
          <Heading size="label.sm">Code Snippet</Heading>
          <ButtonGroup isAttached size="xs" variant="outline">
            {environments.map((env) => (
              <SupportedEnvironmentButton
                key={env.environment}
                icon={<Icon as={env.icon} />}
                active={activeEnvironment === env.environment}
                onClick={() => setEnvironment(env.environment)}
              >
                {env.title}
              </SupportedEnvironmentButton>
            ))}
          </ButtonGroup>
        </Flex>
      </Flex>

      <CodeBlock code={code} language={environment} />
    </Stack>
  );
};

interface ISupportedEnvironment {
  active: boolean;
  icon?: JSX.Element;
  isDisabled?: boolean;
  onClick: () => void;
}

const SupportedEnvironmentButton: React.FC<ISupportedEnvironment> = ({
  active,
  icon,
  onClick,
  children,
  isDisabled,
}) => {
  return (
    <Button
      variant={active ? "solid" : "outline"}
      onClick={onClick}
      leftIcon={icon}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

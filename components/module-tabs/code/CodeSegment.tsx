import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Stack,
  useClipboard,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IoCopy } from "react-icons/io5";
import { SiJavascript, SiPython, SiTypescript } from "react-icons/si";
import { CodeSnippet, Environment, SupportedEnvironment } from "./types";

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
  {
    environment: "python",
    title: "Python",
    icon: SiPython,
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

  const { onCopy, hasCopied } = useClipboard(code);

  const environments = Environments.filter((env) =>
    Object.keys(snippet).includes(env.environment),
  );

  return (
    <Stack spacing={2}>
      <Flex justify="space-between" align="flex-end">
        <Heading size="label.sm">Code Snippet</Heading>
        <Button
          size="xs"
          onClick={onCopy}
          variant="outline"
          leftIcon={<IoCopy />}
        >
          {hasCopied ? "Code copied" : "Copy code"}
        </Button>
      </Flex>

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

      <Box
        borderRadius="sm"
        overflow="hidden"
        height={`${lines.length * 19 + 16}px`}
        w="100%"
      >
        <Editor
          theme="vs-dark"
          options={{
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
          value={code}
          language={activeEnvironment}
        />
      </Box>
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
      colorScheme={active ? "primary" : undefined}
      onClick={onClick}
      leftIcon={icon}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

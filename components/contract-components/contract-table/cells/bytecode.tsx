import { useContractPublishMetadataFromURI } from "../hooks";
import { DeployableContractContractCellProps } from "../types";
import { Heading, Icon, useClipboard, useDisclosure } from "@chakra-ui/react";
import { Button } from "components/buttons/Button";
import { CodeBlock } from "components/code-block/code-block";
import { ThirdwebDrawer } from "components/tw-drawer";
import { useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { ImCopy } from "react-icons/im";

export const ContractBytecodeCell: React.VFC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const publishMetadata = useContractPublishMetadataFromURI(value);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const code = useMemo(
    () => (publishMetadata.data?.bytecode ? publishMetadata.data.bytecode : ""),
    [publishMetadata.data?.bytecode],
  );

  const { onCopy, hasCopied } = useClipboard(code);

  return (
    <>
      <ThirdwebDrawer
        header={{
          children: <Heading size="subtitle.md">Contract Bytecode</Heading>,
        }}
        footer={{
          children: (
            <Button
              onClick={onCopy}
              colorScheme="primary"
              leftIcon={<Icon boxSize={3} as={hasCopied ? FiCheck : ImCopy} />}
            >
              {hasCopied ? "Copied!" : "Copy Bytecode"}
            </Button>
          ),
        }}
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
      >
        <CodeBlock
          w="full"
          whiteSpace="pre-wrap"
          language="markdown"
          code={code}
        />
      </ThirdwebDrawer>
      <Button
        isDisabled={!publishMetadata.data?.bytecode}
        onClick={onOpen}
        isLoading={publishMetadata.isLoading}
        size="sm"
        variant="outline"
      >
        {publishMetadata.data?.bytecode
          ? "Show Bytecode"
          : "Bytecode not available"}
      </Button>
    </>
  );
};

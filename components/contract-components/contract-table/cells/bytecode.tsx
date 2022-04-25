import { useContractPublishMetadataFromURI } from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { Icon, useClipboard, useDisclosure } from "@chakra-ui/react";
import { useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { ImCopy } from "react-icons/im";
import { Button, CodeBlock, Drawer, Heading } from "tw-components";

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
      <Drawer
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
      </Drawer>
      <Button
        isDisabled={!publishMetadata.data?.bytecode}
        onClick={onOpen}
        isLoading={publishMetadata.isLoading}
        size="sm"
        variant="outline"
      >
        {publishMetadata.data?.bytecode ? "Show Bytecode" : "Not available"}
      </Button>
    </>
  );
};

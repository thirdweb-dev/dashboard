import { useClipboard } from "@chakra-ui/react";
import { AbiSchema } from "@thirdweb-dev/sdk";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Button, ButtonProps } from "tw-components";
import { z } from "zod";

interface ABICopyButtonProps extends ButtonProps {
  abi: z.infer<typeof AbiSchema>;
}
export const ABICopyButton: React.FC<ABICopyButtonProps> = ({
  abi,
  ...restButtonProps
}) => {
  const { onCopy, hasCopied, value } = useClipboard(
    JSON.stringify(abi, null, 2),
  );
  if (!value) {
    return (
      <Button {...restButtonProps} leftIcon={<FiCopy />} isDisabled>
        ABI not available
      </Button>
    );
  }

  return (
    <Button
      {...restButtonProps}
      leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
      onClick={onCopy}
    >
      {hasCopied ? "ABI Copied" : "Copy ABI"}
    </Button>
  );
};

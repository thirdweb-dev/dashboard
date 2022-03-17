import { Button, ButtonProps, Tooltip, useClipboard } from "@chakra-ui/react";
import { shortenIfAddress } from "@usedapp/core";

interface IAddressCopyButton extends Omit<ButtonProps, "onClick"> {
  address?: string;
}

export const AddressCopyButton: React.FC<IAddressCopyButton> = ({
  address,
  ...restButtonProps
}) => {
  const { onCopy } = useClipboard(address || "");

  const defaultProps: ButtonProps = {
    flexGrow: 0,
    variant: "ghost",
    size: "sm",
    fontSize: "md",
    fontWeight: "normal",
  };
  return (
    <Tooltip hasArrow label="Copy address to clipboard">
      <Button
        {...{ ...defaultProps, ...restButtonProps }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onCopy();
        }}
      >
        {shortenIfAddress(address)}
      </Button>
    </Tooltip>
  );
};

import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Icon,
  IconButton,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import React from "react";
import { IoCopy } from "react-icons/io5";
import { shortenIfAddress } from "utils/usedapp-external";

interface IAddressCopyButton extends Omit<ButtonGroupProps, "onClick"> {
  address?: string;
  noIcon?: boolean;
}

export const AddressCopyButton: React.FC<IAddressCopyButton> = ({
  address,
  noIcon,
  ...restButtonProps
}) => {
  const { onCopy } = useClipboard(address || "");
  const { trackEvent } = useTrack();
  const toast = useToast();

  const defaultProps: ButtonGroupProps = {
    flexGrow: 0,
    variant: "solid",
    size: "sm",
    fontSize: "md",
    fontWeight: "normal",
  };
  return (
    <Tooltip hasArrow label="Copy address to clipboard">
      <ButtonGroup
        {...{ ...defaultProps, ...restButtonProps }}
        isAttached
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onCopy();
          toast({
            title: "Address copied.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          trackEvent({ category: "address_button", action: "copy", address });
        }}
      >
        {noIcon ? null : (
          <IconButton
            mr="-px"
            borderRight="none"
            aria-label="Add to friends"
            icon={<Icon as={IoCopy} />}
          />
        )}
        <Button>{shortenIfAddress(address)}</Button>
      </ButtonGroup>
    </Tooltip>
  );
};

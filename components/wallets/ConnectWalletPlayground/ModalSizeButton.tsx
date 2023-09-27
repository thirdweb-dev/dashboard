import { IconButton, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FaRectangleList } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";

export function ModalSizeButton(props: {
  modalSize: "compact" | "wide";
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip label={props.modalSize}>
      <IconButton
        w={10}
        h={10}
        color={props.isSelected ? "bgWhite" : "heading"}
        bg={props.isSelected ? "blue.500" : "borderColor"}
        _hover={{
          bg: props.isSelected ? "blue.500" : "borderColor",
        }}
        borderRadius="50%"
        aria-label="compact"
        icon={
          <Icon
            as={props.modalSize === "wide" ? FaRectangleList : RiFileListFill}
            width={5}
            height={5}
          />
        }
        onClick={props.onClick}
      />
    </Tooltip>
  );
}

import { IconButton, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FaRectangleList } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";

export function ModalSizeButton(props: {
  modalSize: "compact" | "wide";
  isSelected: boolean;
  onClick: () => void;
  theme: "light" | "dark";
}) {
  const bg = props.theme === "dark" ? "black" : "white";
  const borderColor = props.theme === "dark" ? "gray.800" : "gray.200";
  return (
    <Tooltip label={props.modalSize}>
      <IconButton
        w={10}
        h={10}
        border="2px solid"
        bg={bg}
        _hover={{
          bg,
        }}
        borderRadius="50%"
        aria-label="compact"
        color={props.isSelected ? "blue.500" : "heading"}
        borderColor={props.isSelected ? "blue.500" : borderColor}
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

import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { Button } from "tw-components";

export function ThemeButton(props: {
  theme: "light" | "dark";
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const bg = props.theme === "dark" ? "black" : "white";
  const borderColor = props.theme === "dark" ? "gray.800" : "gray.200";
  return (
    <Tooltip label={props.theme}>
      <Button
        disabled={props.disabled}
        cursor={props.disabled ? "not-allowed" : "pointer"}
        w={10}
        h={10}
        borderRadius="50%"
        aria-label={props.theme}
        border="3px solid"
        bg={bg}
        _hover={{
          bg,
        }}
        borderColor={props.isSelected ? "blue.500" : borderColor}
        onClick={props.disabled ? undefined : props.onClick}
      ></Button>
    </Tooltip>
  );
}

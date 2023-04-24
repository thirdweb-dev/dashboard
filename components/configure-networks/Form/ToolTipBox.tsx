import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";

export const ToolTipBox: React.FC<{
  content: React.ReactNode;
  iconColor?: string;
}> = ({ content, iconColor = "accent.600" }) => {
  return (
    <Tooltip
      placement="top-start"
      borderRadius="md"
      boxShadow="lg"
      bg="backgroundHighlight"
      p={4}
      minW={{ md: "450px" }}
      label={content}
    >
      <Flex alignItems="center" justifyContent="center">
        <Icon ml={2} mr={1} as={BsQuestionCircle} color={iconColor} boxSize={4} />
      </Flex>
    </Tooltip>
  );
};

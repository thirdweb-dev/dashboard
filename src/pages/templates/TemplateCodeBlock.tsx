import { Flex } from "@chakra-ui/react";
import { CopyButton } from "components/homepage/AnimatedCLICommand/AnimatedCLICommand";
import { Text } from "tw-components";

export const TemplateCodeBlock: React.FC<{ text: string }> = (props) => {
  return (
    <Flex
      border="1px solid rgba(255, 255, 255, 0.2)"
      borderRadius="md"
      flexShrink={0}
      py={3}
      px={4}
      my={4}
      minW={"300px"}
      gap={1}
      align="center"
      alignSelf="start"
    >
      <Text color="white" fontFamily="mono" fontSize="16px" fontWeight="500">
        <span>{props.text}</span>
      </Text>
      <CopyButton text={props.text} />
    </Flex>
  );
};

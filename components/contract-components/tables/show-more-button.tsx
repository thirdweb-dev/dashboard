import { Center, Divider, Flex, FlexProps } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { Button } from "tw-components";

interface ShowMoreButtonProps extends FlexProps {
  setShowMoreLimit: MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  setShowMoreLimit,
  text = "Show more",
  ...rest
}) => {
  return (
    <Flex flexDir="column" {...rest}>
      <Divider color="borderColor" />
      <Center>
        <Button onClick={setShowMoreLimit} variant="ghost" my={3} size="sm">
          {text}
        </Button>
      </Center>
    </Flex>
  );
};

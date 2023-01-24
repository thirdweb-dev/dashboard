import { SolidityInputProps } from ".";
import { ButtonGroup, Flex } from "@chakra-ui/react";
import { Button } from "tw-components";

export const SolidityBoolInput: React.FC<SolidityInputProps> = ({
  formContext: form,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const watchInput = form.watch(inputName);

  return (
    <Flex>
      <ButtonGroup isAttached>
        <Button
          onClick={() => form.setValue(inputName, "true")}
          bgColor={watchInput === "true" ? "bgBlack" : "transparent"}
          color={watchInput === "true" ? "bgWhite" : "grey.800"}
          borderWidth="2px"
          borderColor="grey.800"
          borderRadius="xl"
          borderRight="none"
          _hover={{
            opacity: 0.8,
          }}
          size="sm"
        >
          True
        </Button>
        <Button
          onClick={() => form.setValue(inputName, "false")}
          bgColor={watchInput === "false" ? "bgBlack" : "transparent"}
          color={watchInput === "false" ? "bgWhite" : "grey.800"}
          borderWidth="2px"
          borderLeft={!watchInput ? "2px" : "none"}
          borderColor="grey.800"
          borderRadius="xl"
          _hover={{
            opacity: 0.8,
          }}
          size="sm"
        >
          False
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

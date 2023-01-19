import { ButtonGroup, Flex, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Button } from "tw-components";

export const SolidityBoolInput: React.FC<InputProps> = ({ ...inputProps }) => {
  const { setValue, watch } = useFormContext();

  const watchInput = watch(inputProps.name as string);

  return (
    <Flex>
      <ButtonGroup isAttached>
        <Button
          onClick={() => setValue(inputProps.name as string, "true")}
          bgColor={watchInput === "true" ? "bgBlack" : "transparent"}
          color={watchInput === "true" ? "bgWhite" : "grey.800"}
          borderWidth="2px"
          borderColor="grey.800"
          borderRadius="xl"
          borderRight="none"
          _hover={{
            opacity: 0.8,
          }}
        >
          True
        </Button>
        <Button
          onClick={() => setValue(inputProps.name as string, "false")}
          bgColor={watchInput === "false" ? "bgBlack" : "transparent"}
          color={watchInput === "false" ? "bgWhite" : "grey.800"}
          borderWidth="2px"
          borderLeft={!watchInput ? "2px" : "none"}
          borderColor="grey.800"
          borderRadius="xl"
          _hover={{
            opacity: 0.8,
          }}
        >
          False
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Button, Text } from "tw-components";

interface EmailProps {
  handleEmailSubmit: (email: string) => void;
  isSubmittingEmail: boolean;
}

type Inputs = {
  email: string;
  exampleRequired: string;
};

export const Email: React.FC<EmailProps> = ({
  handleEmailSubmit,
  isSubmittingEmail,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleEmailSubmit(data.email);
  };

  return (
    <Box maxW="21rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="md">
          <Input
            variant="outline"
            placeholder="Enter your email"
            type="email"
            {...register("email", { required: true })}
          />
          <InputRightElement width="3rem">
            <Button
              bg="white"
              _hover={{
                bg: "white",
              }}
              type="submit"
              roundedLeft="none"
              disabled={!watch("email")}
              isLoading={isSubmittingEmail}
              isDisabled={isSubmittingEmail}
            >
              <ChakraNextImage
                src={require("public/assets/bear-market-airdrop/rightArrow.svg")}
                alt="rightArrow"
              />
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.email && (
          <Text color="red.500" fontSize="sm" mt={2}>
            Email is required
          </Text>
        )}
      </form>

      <Flex alignItems="center" mt={2}>
        <Text color="white">
          Ensure your email is correct as it will be used to send you rewards.
        </Text>
        <ChakraNextImage
          src={require("public/assets/bear-market-airdrop/email-icon.svg")}
          alt="Bear market builders hero image"
        />
      </Flex>
    </Box>
  );
};

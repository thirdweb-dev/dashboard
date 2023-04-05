/* eslint-disable no-restricted-imports */
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";

interface EmailProps {
  handleEmailSubmit: (email: string) => void;
}

type Inputs = {
  email: string;
  exampleRequired: string;
};

const Email: FC<EmailProps> = ({ handleEmailSubmit }) => {
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
            >
              <Image
                src="/assets/bear-market-airdrop/rightArrow.svg"
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
        <Image
          src="/assets/bear-market-airdrop/email-icon.svg"
          alt="Bear market builders hero image"
        />
      </Flex>
    </Box>
  );
};

export default Email;

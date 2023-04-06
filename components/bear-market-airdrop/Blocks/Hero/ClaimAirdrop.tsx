import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useForm } from "react-hook-form";
import { Button, Text } from "tw-components";

interface ClaimAirdropProps {
  canClaim: boolean;
  claim: (email: string) => void;
  isClaiming: boolean;
}

type Inputs = {
  email: string;
};

export const ClaimAirdrop: React.FC<ClaimAirdropProps> = ({
  canClaim,
  claim,
  isClaiming,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    if (!data.email || !canClaim) {
      return;
    }
    claim(data.email);
  };

  const invalidEmail = errors.email && errors.email.type === "pattern";

  return (
    <Flex
      direction="column"
      gap={4}
      justifyContent="center"
      px={{
        base: 8,
        lg: 0,
      }}
      mx={{
        base: "auto",
        lg: 0,
      }}
    >
      <Flex
        gap={2}
        alignItems="center"
        justifyContent={{
          base: "center",
          lg: "flex-start",
        }}
      >
        <Text
          fontWeight="normal"
          fontSize="19px"
          color={canClaim ? "#3FE06C" : "initial"}
          mt={4}
          mb={2}
        >
          {canClaim
            ? "You are eligible to claim 1 airdrop"
            : "You're unfortunately not eligible to claim."}
        </Text>
        {canClaim && (
          <ChakraNextImage
            alt="checkmark"
            alignSelf="end"
            src={require("public/assets/bear-market-airdrop/checkmark.svg")}
          />
        )}
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack mt={2} mb={8} alignItems="start">
          <VStack alignItems="start">
            <InputGroup size="md">
              <Input
                variant="outline"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              <InputRightElement width="3rem">
                <Button
                  type="submit"
                  roundedLeft="none"
                  disabled={!watch("email")}
                >
                  <ChakraNextImage
                    src={require("public/assets/bear-market-airdrop/rightArrow.svg")}
                    alt="rightArrow"
                  />
                </Button>
              </InputRightElement>
            </InputGroup>
            {!canClaim && (
              <Flex gap={2}>
                <Text
                  fontSize="14px"
                  fontWeight="semibold"
                  mt={2}
                  color="initial"
                >
                  Subscribe to thirdweb&apos;s newsletter for the latest
                  updates.
                </Text>
                <ChakraNextImage
                  src={require("public/assets/bear-market-airdrop/email-icon.svg")}
                  alt="Bear market builders hero image"
                />
              </Flex>
            )}
            {invalidEmail && (
              <Text color="red.500" fontSize="sm" mt={2}>
                Email is invalid
              </Text>
            )}
          </VStack>
          {canClaim && (
            <Button
              px={6}
              py={3}
              isDisabled={invalidEmail || isClaiming}
              isLoading={isClaiming}
              type="submit"
            >
              Claim
            </Button>
          )}
        </HStack>
        <Flex alignItems="center" mt={2} justifyContent="center">
          <Text>
            {canClaim
              ? "Ensure your email is correct as it will be used to send you rewards."
              : ""}
          </Text>
          {canClaim && (
            <ChakraNextImage
              src={require("public/assets/bear-market-airdrop/email-icon.svg")}
              alt="Bear market builders hero image"
            />
          )}
        </Flex>
        {canClaim && (
          <Flex gap={1} fontSize="14px">
            <Text bgGradient="linear(to-tr, #743F9E, #BFA3DA)" bgClip="text">
              Stay on this page
            </Text>
            <Text>to open your airdrop after claiming.</Text>
          </Flex>
        )}
      </form>
    </Flex>
  );
};

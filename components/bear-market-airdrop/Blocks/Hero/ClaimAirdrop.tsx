import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useForm } from "react-hook-form";
import { Button, Text } from "tw-components";

interface ClaimAirdropProps {
  canClaim: boolean;
  claim: (email: string) => void;
  isClaiming: boolean;
  handleEmailSubmit: (email: string) => void;
  submittingEmail: boolean;
}

type Inputs = {
  email: string;
};

export const ClaimAirdrop: React.FC<ClaimAirdropProps> = ({
  canClaim,
  claim,
  isClaiming,
  handleEmailSubmit,
  submittingEmail,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const email = watch("email");

  const onSubmit = async (data: Inputs) => {
    if (!data.email) {
      return;
    }
    if (!canClaim) {
      handleEmailSubmit(data.email);
    } else {
      claim(data.email);
    }
  };

  const invalidEmail = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const { colorMode } = useColorMode();

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
      {!canClaim && (
        <Text
          fontWeight="normal"
          fontSize="19px"
          color={"initial"}
          mt={4}
          mb={2}
        >
          You&apos;re unfortunately not eligible to claim.
        </Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack mt={2} mb={2} alignItems="start">
          <VStack alignItems="start">
            <InputGroup size="md">
              <Input
                id="email"
                variant="outline"
                placeholder="Enter your email"
                // type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                w="400px"
              />
              <InputRightElement width="">
                {!canClaim ? (
                  <Button
                    mr={!canClaim ? 7 : 0}
                    type="submit"
                    roundedLeft="none"
                    isDisabled={!watch("email") || invalidEmail}
                    isLoading={submittingEmail}
                    bg={colorMode === "light" ? "black" : "white"}
                    _hover={{
                      bg: colorMode === "light" ? "black" : "white",
                    }}
                    _loading={{
                      bg: colorMode === "light" ? "white" : "black",
                    }}
                  >
                    <ChakraNextImage
                      src={require("public/assets/bear-market-airdrop/rightArrow.svg")}
                      alt="rightArrow"
                    />
                  </Button>
                ) : (
                  <ChakraNextImage
                    src={require("public/assets/bear-market-airdrop/white-checkmark.svg")}
                    alt="valid email"
                    mr={2}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            {invalidEmail && (
              <Text color="red.500" fontSize="sm" mt={2}>
                Email is invalid
              </Text>
            )}
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
          </VStack>
        </HStack>
        <Flex alignItems="center" gap={2} mb={8}>
          {canClaim && (
            <Text color="initial">
              Ensure your email is correct as it will be used to send you
              rewards.
            </Text>
          )}
          {canClaim && (
            <ChakraNextImage
              src={require("public/assets/bear-market-airdrop/email-icon.svg")}
              alt="Bear market builders hero image"
            />
          )}
        </Flex>
        {canClaim && (
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
              color={"initial"}
              mt={4}
              mb={2}
            >
              You are eligible to claim 1 airdrop
            </Text>
            <ChakraNextImage
              alt="checkmark"
              alignSelf="center"
              src={require("public/assets/bear-market-airdrop/checkmark.svg")}
            />
          </Flex>
        )}
        {canClaim && (
          <Button
            px={6}
            py={3}
            isDisabled={invalidEmail || isClaiming || !watch("email")}
            isLoading={isClaiming}
            type="submit"
            w="200px"
            mt={4}
            bg={colorMode === "light" ? "black" : "white"}
            color={colorMode === "light" ? "white" : "black"}
            _hover={{
              bg: colorMode === "light" ? "black" : "white",
              color: colorMode === "light" ? "white" : "black",
              opacity: 0.7,
            }}
          >
            Claim
          </Button>
        )}
      </form>
    </Flex>
  );
};

/* eslint-disable no-restricted-imports */

/* eslint-disable react/forbid-dom-props */
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ClaimAirdropProps {
  canClaim: boolean;
  claim: () => void;
  isClaiming: boolean;
}

const ClaimAirdrop: FC<ClaimAirdropProps> = ({
  canClaim,
  claim,
  isClaiming,
}) => {
  return (
    <Flex
      direction="column"
      gap={4}
      justifyContent="center"
      px={{
        base: 8,
        lg: 0,
      }}
    >
      {canClaim && (
        <Button
          color="black"
          bg="white"
          w="min-content"
          px={6}
          py={3}
          isDisabled={!canClaim}
          disabled={isClaiming || !canClaim}
          _disabled={{
            opacity: 0.2,
            cursor: "not-allowed",
          }}
          _hover={{
            opacity: 0.8,
          }}
          onClick={claim}
          isLoading={isClaiming}
        >
          Claim airdrop
        </Button>
      )}
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
          color={canClaim ? "#3FE06C" : "red.500"}
          mt={4}
        >
          {canClaim
            ? "You are eligible to claim 1 airdrop"
            : "You are not eligible to claim"}
        </Text>
        {canClaim && (
          <Image alt="checkmark" alignSelf="end" src="/assets/checkmark.svg" />
        )}
      </Flex>
      {canClaim ? (
        <Flex gap={1} mt={4} fontSize="14px">
          <Text bgGradient="linear(to-tr, #743F9E, #BFA3DA)" bgClip="text">
            Stay on this page
          </Text>
          <Text color="white">to open your airdrop after claiming.</Text>
        </Flex>
      ) : (
        <Flex gap={1} mt={4} fontSize="14px">
          <Text bgGradient="linear(to-tr, #743F9E, #BFA3DA)" bgClip="text">
            You are only eligible{" "}
            <span
              style={{
                color: "white",
              }}
            >
              if you have deployed a contract on the evm between 2022-01-01 and
              2023-04-01
            </span>
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ClaimAirdrop;

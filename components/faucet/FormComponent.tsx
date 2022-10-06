import { Flex, FormControl, Input, Spinner } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button, Link, Text } from "tw-components";

export const FormComponent: React.FC = () => {
  const [address, setAddress] = useState("");
  const [transactionLink, setTransactionLink] = useState("");
  const [error, setError] = useState("");

  const { mutate, isLoading } = useMutation(
    async () => {
      return await axios.post("/api/faucet/solana", {
        address,
      });
    },
    {
      onSuccess: (res) => {
        setTransactionLink(
          `https://explorer.solana.com/tx/${res.data.txHash}?cluster=devnet`,
        );
      },
      onError: () => {
        setError("Please try again in sometime");
      },
    },
  );

  return (
    <Flex direction="column">
      <FormControl
        alignItems="center"
        display="flex"
        gap="4"
        justifyContent="center"
        onSubmit={() => mutate()}
      >
        <Input
          bg="#0F1318"
          borderColor="#0F1318"
          color="#F2F2F7"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          value={address}
        />

        <Button
          bg="#0098EE"
          borderColor="#0098EE"
          color="#F2F2F7"
          disabled={isLoading || transactionLink.length > 0}
          w="175px"
          onClick={() => {
            mutate();
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : transactionLink ? (
            "Funds Sent!"
          ) : (
            "Request Funds"
          )}
        </Button>
      </FormControl>

      {transactionLink && (
        <Text fontSize="18px" color="whiteAlpha.800" mt="4">
          Funds sent successfully!{" "}
          <Link textDecor="underline" isExternal href={transactionLink}>
            View on Solscan
          </Link>
        </Text>
      )}

      {error && (
        <Text fontSize="18px" mt="4" color="red.800">
          {error}
        </Text>
      )}
    </Flex>
  );
};
export default FormComponent;

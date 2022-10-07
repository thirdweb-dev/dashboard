import { Flex, FormControl, Input, Spinner } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { useTrack } from "hooks/analytics/useTrack";
import { useEffect, useState } from "react";
import { Button, Link, Text } from "tw-components";

export const FormComponent: React.FC = () => {
  const { publicKey } = useWallet();
  const [address, setAddress] = useState("abc");
  const [transactionLink, setTransactionLink] = useState("");
  const [error, setError] = useState("");
  const trackEvent = useTrack();

  useEffect(() => {
    if (publicKey) {
      setAddress("abc");
    }
  }, [publicKey]);

  const { mutate, isLoading } = useMutation(
    async () => {
      trackEvent({
        category: "solana-faucet",
        action: "request-funds",
        label: "attempt",
      });
      const response = await fetch("/api/faucet/solana", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: (data) => {
        if (data.txHash) {
          setTransactionLink(
            `https://explorer.solana.com/tx/${data.txHash}?cluster=devnet`,
          );
          setError("");
          trackEvent({
            category: "solana-faucet",
            action: "request-funds",
            label: "success",
          });
        }
        if (data.error) {
          setError(data.error);
          trackEvent({
            category: "solana-faucet",
            action: "request-funds",
            label: "error",
          });
        }
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
          disabled={isLoading || transactionLink.length > 0 || !address}
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
            View on Solana Explorer
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

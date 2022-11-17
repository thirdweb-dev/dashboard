import { Flex, FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useEffect, useState } from "react";
import { Button, Text } from "tw-components";

interface IFormComponentProps {
  transactionLink: string;
  setTransactionLink: (link: string) => void;
}

export const FormComponent: React.FC<IFormComponentProps> = ({
  transactionLink,
  setTransactionLink,
}) => {
  const trackEvent = useTrack();
  const toast = useToast();
  const connectedWallet = useAddress();
  const [address, setAddress] = useState(connectedWallet || "");

  useEffect(() => {
    if (connectedWallet) {
      setAddress(connectedWallet);
    }
  }, [connectedWallet]);

  const { mutate, isLoading, error, isError } = useMutation(
    async () => {
      trackEvent({
        category: "mumbai-faucet",
        action: "request-funds",
        label: "attempt",
      });
      const query = await fetch("/api/faucet/mumbai", {
        method: "POST",
        body: JSON.stringify({ address }),
      });

      if (query.status >= 400) {
        throw new Error(
          await query.json().then((r) => {
            console.error(r);
            return r.error;
          }),
        );
      }
      return query.json();
    },
    {
      onSuccess: (data) => {
        if (data.txn) {
          setTransactionLink(
            `https://mumbai.polygonscan.com/tx/${data.txn.hash}`,
          );
          trackEvent({
            category: "mumbai-faucet",
            action: "request-funds",
            label: "success",
          });
          toast({
            title: "Success",
            description: "Funds have been sent to your wallet",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      },
      onError: (err) => {
        trackEvent({
          category: "mumbai-faucet",
          action: "request-funds",
          label: "error",
          error: (err as Error).message,
        });
      },
    },
  );

  return (
    <Flex direction="column">
      <FormControl
        alignItems="center"
        display="flex"
        gap={{ base: 2, md: 4 }}
        justifyContent="center"
        onSubmit={() => mutate()}
      >
        <Input
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          value={address}
          isDisabled={isLoading || transactionLink.length > 0}
        />

        <Button
          colorScheme="blue"
          disabled={isLoading || transactionLink.length > 0 || !address}
          w={{ base: "full", md: "175px" }}
          fontSize={{ base: "sm", md: "md" }}
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

      {isError && (
        <Text fontSize="18px" mt="4" color="red.800">
          {(error as Error).message}
        </Text>
      )}
    </Flex>
  );
};

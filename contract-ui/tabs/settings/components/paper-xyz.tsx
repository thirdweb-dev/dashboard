import { AdminOnly } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk";
import { PaperRegisterContractButton } from "components/paper-xyz/register-contract-button";
import { PaperKYBButton } from "components/paper-xyz/verify-button";
import { useLocalStorage } from "hooks/useLocalStorage";
import { Card, Heading, Text } from "tw-components";

export function usePaperJWT() {
  return useLocalStorage("paperxyz_jwt", "");
}

export const PaperCheckoutSetting: React.FC<{
  contract: ValidContractInstance;
}> = ({ contract }) => {
  const [jwt, setJWT] = usePaperJWT();

  return (
    <AdminOnly contract={contract}>
      <Card p={0}>
        <Flex direction="column">
          <Flex p={{ base: 6, md: 10 }} as="section" direction="column" gap={4}>
            <Flex direction="column" gap={1}>
              <Heading size="title.md">Credit Card Checkout</Heading>

              <Text fontStyle="italic">
                Enable your customers to pay with a Credit Card.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {jwt.data ? (
          <PaperRegisterContractButton
            jwt={jwt.data}
            contractAddress={contract.getAddress()}
            borderRadius="xl"
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
            w="full"
          />
        ) : (
          <PaperKYBButton
            onSuccess={(_jtw) => {
              console.log("*** onSuccess", _jtw);
              setJWT(_jtw);
            }}
            borderRadius="xl"
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
            w="full"
          />
        )}
      </Card>
    </AdminOnly>
  );
};

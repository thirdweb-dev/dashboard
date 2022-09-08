import { AdminOnly } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk";
import { usePaperContractQuery } from "components/paper-xyz/hooks";
import { PaperRegisterContractButton } from "components/paper-xyz/register-contract-button";
import { PaperKYBButton } from "components/paper-xyz/verify-button";
import { useLocalStorage } from "hooks/useLocalStorage";
import { Badge, Card, Heading, Text } from "tw-components";

export function usePaperJWT() {
  return useLocalStorage("paperxyz_jwt", "");
}

export const PaperCheckoutSetting: React.FC<{
  contract: ValidContractInstance;
}> = ({ contract }) => {
  const [jwt, setJWT] = usePaperJWT();

  const { data, isLoading, error } = usePaperContractQuery(
    jwt.data || "",
    contract.getAddress(),
  );

  const paperCheckoutId = data?.result?.id;

  console.log("***", { paperCheckoutId, isLoading, error });

  return (
    <AdminOnly contract={contract}>
      <Card p={0}>
        <Flex direction="column">
          <Flex p={{ base: 6, md: 10 }} as="section" direction="column" gap={4}>
            <Flex direction="column" gap={1}>
              <Flex justify="space-between" align="center">
                <Heading size="title.md">Credit Card Checkout</Heading>
                {paperCheckoutId ? (
                  <Badge colorScheme="green">Enabled</Badge>
                ) : (
                  <Badge>Not enabled</Badge>
                )}
              </Flex>

              <Text fontStyle="italic">
                Enable your customers to pay with a Credit Card using paper.xyz
              </Text>

              {/* <Text>paper explainer</Text> */}
            </Flex>
          </Flex>
        </Flex>

        {paperCheckoutId ? null : jwt.data ? (
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

import {
  AdminOnly,
  useActiveChainId,
  useLinkBalance,
  usePackDepositLink,
  usePackLink,
  usePackWithdrawLink,
} from "@3rdweb-sdk/react";
import { PackModule } from "@3rdweb/sdk";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { LinkButton } from "components/shared/LinkButton";
import { BigNumber, ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { parseErrorToMessage } from "utils/errorParser";
import { SupportedChainId } from "utils/network";
import { ModuleSetting } from "../../shared/ModuleSetting";

interface IDepositLink {
  module?: PackModule;
}

export const DepositLink: React.FC<IDepositLink> = ({ module }) => {
  const toast = useToast();
  const activeChainId = useActiveChainId();
  const { data: packLink, isLoading: packLinkLoading } = usePackLink(
    module?.address,
  );
  const { data: linkBalance, isLoading: linkBalanceLoading } = useLinkBalance();
  const { mutate: withdraw, isLoading: withdrawLoading } = usePackWithdrawLink(
    module?.address,
  );
  const { mutate: deposit, isLoading: depositLoading } = usePackDepositLink(
    module?.address,
  );

  const [dismissed, setDismissed] = useState(false);
  const [depositAmount, setDepositAmount] = useState("0.001");
  const [withdrawAmount, setWithdrawAmount] = useState("0");

  useEffect(() => {
    if (packLink) {
      setWithdrawAmount(
        ethers.utils.formatUnits(packLink.value, packLink.decimals),
      );
    }
  }, [packLink]);

  const noLink = useMemo(() => {
    return BigNumber.from(packLink?.value || 0).isZero();
  }, [packLink]);

  const depositLink = () => {
    deposit(depositAmount, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "LINK succesfully deposited",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error depositing LINK",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  const withdrawLink = async () => {
    withdraw(withdrawAmount, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "LINK succesfully withdrawn",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error withdrawing LINK",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <ModuleSetting
      heading="Link Balance"
      description={`
        Manage your pack modules LINK balance.
      `}
      info={
        <>
          You need to deposit <strong>LINK</strong> in your pack module in order
          to enable pack owners to open their packs.
          <br />
          The <strong>LINK</strong> token is used to ensure that packs have a
          completely random chance of containing each reward.
        </>
      }
    >
      {noLink &&
        !dismissed &&
        !packLinkLoading &&
        !linkBalanceLoading &&
        parseInt(linkBalance || "0") === 0 && (
          <Flex
            padding="20px"
            borderRadius="md"
            bg="orange.500"
            opacity={0.8}
            direction="column"
          >
            <Text color="white">
              <strong>Don&apos;t have LINK?</strong>
              <br />
              1. You can get some LINK on SushiSwap. You can get there by
              clicking the link below.
              <br />
              2. Once you get to SushiSwap, make sure to select the correct
              network and select the LINK token to buy some.
              {activeChainId === SupportedChainId.Polygon && (
                <span>
                  <br />
                  3. If you get LINK and it appears not to be working, you may
                  need to swap it for the correct LINK type on the Chainlink
                  Pegswap below.
                </span>
              )}
              <br />
              <br />
              Initially, funding your contract with 0.001 - 0.005 LINK is often
              sufficient.
            </Text>
            <Stack direction="row" mt="8px">
              <LinkButton
                size="sm"
                bg="white"
                color="orange.800"
                href="https://app.sushi.com/swap"
                isExternal
              >
                SushiSwap
              </LinkButton>
              {activeChainId === SupportedChainId.Polygon && (
                <LinkButton
                  size="sm"
                  bg="white"
                  color="orange.800"
                  href="https://pegswap.chain.link/?_ga=2.249230855.1679744055.1640638760-2076883728.1640638760"
                  isExternal
                >
                  PegSwap
                </LinkButton>
              )}
              <Button
                size="sm"
                bg="white"
                color="orange.800"
                onClick={() => setDismissed(true)}
              >
                Dismiss
              </Button>
            </Stack>
          </Flex>
        )}
      <Flex direction={{ base: "column", md: "row" }} mt="8px" gap="10px">
        <AdminOnly module={module}>
          <Card flexGrow={1}>
            <Flex direction="row" flexWrap={{ base: "wrap", lg: "nowrap" }}>
              <FormControl margin="5px">
                <Flex justify="space-between">
                  <Text size="label.md">Deposit</Text>
                  <Text
                    color="blue.400"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => setDepositAmount(linkBalance || "0")}
                  >
                    Max
                  </Text>
                </Flex>

                <Flex>
                  <Input
                    borderRadius="6px 0px 0px 6px"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                  <Button
                    onClick={depositLink}
                    isDisabled={depositLoading}
                    colorScheme="primary"
                    borderRadius="0px 6px 6px 0px"
                    width="160px"
                  >
                    {depositLoading ? <Spinner /> : "Deposit"}
                  </Button>
                </Flex>

                <FormHelperText>
                  You have {linkBalance} LINK in your wallet.
                </FormHelperText>
              </FormControl>

              {BigNumber.from(packLink?.value || 0).gt(0) && (
                <FormControl mt="24px" margin="5px">
                  <Flex justify="space-between">
                    <Text size="label.md">Withdraw</Text>
                    <Text
                      color="blue.400"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() =>
                        setWithdrawAmount(packLink?.displayValue || "0")
                      }
                    >
                      Max
                    </Text>
                  </Flex>

                  <Flex>
                    <Input
                      borderRadius="6px 0px 0px 6px"
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <Button
                      onClick={withdrawLink}
                      isDisabled={withdrawLoading}
                      borderRadius="0px 6px 6px 0px"
                      width="160px"
                    >
                      {withdrawLoading ? <Spinner /> : "Withdraw"}
                    </Button>
                  </Flex>
                </FormControl>
              )}
            </Flex>
          </Card>
        </AdminOnly>
        <Card as={Stat} minWidth="240px" maxWidth="240px">
          <Stack>
            <StatLabel>Deposited Link</StatLabel>
            <StatNumber>{packLink?.displayValue} LINK</StatNumber>
          </Stack>
        </Card>
      </Flex>
    </ModuleSetting>
  );
};

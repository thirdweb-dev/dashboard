import {
  AdminOnly,
  useApp,
  useAppBalanceAndWithdraw,
  useAppModule,
  useModuleMetadataList,
  useRoyaltyTreasury,
  useShouldUpgradeModuleList,
  useShouldUpgradeToV2,
  useUpgradeToV2Mutation,
} from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { ModuleType } from "@3rdweb/sdk";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ContractDetailCard } from "components/ContractDetailCard";
import { DashboardSection } from "components/dashboard/DashboardSection";
import { EmailLink } from "components/EmailLink";
import { Card } from "components/layout/Card";
import { LinkButton } from "components/shared/LinkButton";
import { MismatchButton } from "components/shared/MismatchButton";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { SUPPORTED_MODULE_TYPES } from "constants/modules";
import { useTrack } from "hooks/analytics/useTrack";
import { useNetworkUrl } from "hooks/useHref";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useMemo } from "react";
import { CgToolbox } from "react-icons/cg";
import { FiHelpCircle, FiPlusSquare } from "react-icons/fi";
import { GoTools } from "react-icons/go";
import { parseErrorToMessage } from "utils/errorParser";
import { getChainIdFromNetwork } from "utils/network";

const DashboardPage: ConsolePage = () => {
  const { address: walletAddress, getNetworkMetadata } = useWeb3();
  const network = useNetworkUrl();
  const appAddress = useSingleQueryParam("app");
  const { data: shouldUpgradeToV2, isLoading: isShouldUpgradeToV2Loading } =
    useShouldUpgradeToV2(appAddress);
  const shouldUpgradeModuleList = useShouldUpgradeModuleList(appAddress);
  const upgradeToV2Mutation = useUpgradeToV2Mutation(appAddress);
  const appModule = useAppModule(appAddress);
  const chainId = getChainIdFromNetwork(useSingleQueryParam("network"));
  const { isLoading: appLoading, data: appData, error } = useApp(appAddress);
  const { data: royaltyTreasury } = useRoyaltyTreasury(appAddress);

  const moduleMetadataList = useModuleMetadataList(
    appAddress,
    SUPPORTED_MODULE_TYPES,
  );

  const tokens = useMemo(() => {
    return moduleMetadataList.data?.filter((m) => m.type === ModuleType.TOKEN);
  }, [moduleMetadataList.data]);

  const { loading, balances, withdrawBalance, withdrawLoading } =
    useAppBalanceAndWithdraw(appAddress, chainId, tokens);
  const toast = useToast();

  const { Track } = useTrack({
    page: "project",
    network,
    project: appAddress,
  });
  if (error && error instanceof Error) {
    return (
      <Center>
        <Heading as="h1" size="xl">
          {parseErrorToMessage(error)}
        </Heading>
      </Center>
    );
  }

  if (appLoading || isShouldUpgradeToV2Loading) {
    return (
      <Center p={16}>
        <HStack>
          <Spinner size="sm" />
          <Text>Loading Project</Text>
        </HStack>
      </Center>
    );
  }

  const renderName = appData?.metadata?.name || appAddress || "App Dashboard";
  const isEmpty = moduleMetadataList.data?.length === 0;

  return (
    <Track>
      <Stack spacing={8}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justify="space-between"
          align="center"
        >
          <Stack>
            <Heading>{renderName}</Heading>
            {appAddress && (
              <AddressCopyButton
                variant="outline"
                address={appAddress}
                size="sm"
              />
            )}
          </Stack>
          <Stack direction="row">
            {!shouldUpgradeToV2 && (
              <LinkButton
                leftIcon={<Icon as={FiPlusSquare} boxSize={4} />}
                colorScheme="primary"
                href={`${network}/${appAddress}/new`}
              >
                Add Module
              </LinkButton>
            )}
          </Stack>
        </Flex>
        <AdminOnly module={appModule}>
          <Stack as="section">
            <Flex gap={2} display="flex" flexDirection="row" align="center">
              <Heading size="lg">Project Royalty Treasury</Heading>
              <Tooltip
                label={
                  <>
                    This section displays the balances of royalties that have
                    accrued in any module within this project.
                    <br />
                    <br />
                    Any modules with greater than 0% royalty that have had
                    secondary transactions will send the royalties to this
                    treasury.
                  </>
                }
              >
                <div>
                  <FiHelpCircle />
                </div>
              </Tooltip>
            </Flex>

            <Card as={Stack}>
              <div>
                <AddressCopyButton
                  fontFamily="mono"
                  variant="outline"
                  size="xs"
                  address={royaltyTreasury}
                />
              </div>
              {loading ? (
                <Flex direction="row" gap={2} flexWrap="wrap">
                  <Card
                    p={0}
                    flexGrow={1}
                    maxW={{ base: "full", md: "33%", lg: "25%" }}
                  >
                    <Flex direction="column" gap={2}>
                      <Stat py={2} pt={4} px={4}>
                        <Stack>
                          <SkeletonText height="12px" noOfLines={1} />
                          <Skeleton height="28px" mt="6px" />
                        </Stack>
                      </Stat>
                      <MismatchButton
                        isDisabled
                        borderRadius="md"
                        size="sm"
                        colorScheme="green"
                      >
                        Withdraw
                      </MismatchButton>
                    </Flex>
                  </Card>
                </Flex>
              ) : (
                <Flex direction="row" gap={2} flexWrap="wrap">
                  {balances.map((balance) => (
                    <Card
                      p={0}
                      key={balance.address}
                      flexGrow={1}
                      maxW={{ base: "full", md: "33%", lg: "25%" }}
                    >
                      <Flex direction="column" gap={2}>
                        <Stat py={2} pt={4} px={4}>
                          <StatLabel>
                            {balance.symbol || balance.name}
                          </StatLabel>
                          <StatNumber>{balance.balance}</StatNumber>
                        </Stat>
                        <MismatchButton
                          isLoading={withdrawLoading}
                          onClick={() => withdrawBalance(balance)}
                          borderRadius="md"
                          size="sm"
                          colorScheme="green"
                          isDisabled={parseFloat(balance.balance) === 0}
                        >
                          {parseFloat(balance.balance) === 0
                            ? "No balance to withdraw"
                            : "Withdraw"}
                        </MismatchButton>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              )}
              <Text size="body.sm" textAlign="center">
                <em>
                  A fee applies for withdrawals.{" "}
                  <Link
                    color="blue.500"
                    isExternal
                    href="https://thirdweb.com/#fees"
                  >
                    Learn more
                  </Link>
                </em>
              </Text>
            </Card>
          </Stack>
        </AdminOnly>
        {shouldUpgradeToV2 ? (
          <Center>
            <Card w="full" py={8}>
              <Container maxW="lg">
                <Stack spacing={6}>
                  <Stack direction="row" spacing={4} justify="center">
                    <Icon as={GoTools} boxSize={8} />
                    <Heading size="title.lg">Project upgrade required</Heading>
                  </Stack>
                  <Stack>
                    <Text>
                      We recently identified and fixed an issue that could cause
                      ERC20 tokens to be locked up in some projects.{" "}
                      <em>
                        This project has the potential of being affected by the
                        issue.
                      </em>
                    </Text>
                    <Text>
                      Out of an abundance of caution we have decided to{" "}
                      <b>require</b> every project that has the potential to be
                      affected to be upgraded to remedy the issue. Upgrading
                      will prevent any <em>future</em> ERC20 tokens from being
                      locked up.
                    </Text>
                    {chainId && !getNetworkMetadata(chainId).isTestnet && (
                      <>
                        <Text>
                          If any ERC20 tokens are currently locked up in your
                          project, we will be automatically reimbursing the
                          project owner through airdrops over the next couple of
                          days.
                        </Text>
                        <Text>
                          If you would like to be reimbursed for any gas paid to
                          facilitate the upgrade process or if you have any
                          other questions or concerns, please contact us:{" "}
                          <EmailLink
                            email="support@thirdweb.com"
                            subjectLine="Project Upgrade"
                            color="blue.600"
                            context={{
                              walletAddress,
                              projectAddress: appAddress,
                            }}
                          >
                            support@thirdweb.com
                          </EmailLink>
                        </Text>
                        <Text>
                          Thank you for your patience and understanding.
                        </Text>
                      </>
                    )}
                  </Stack>
                  <Stack align="center" spacing={1}>
                    <Button
                      isLoading={upgradeToV2Mutation.isLoading}
                      onClick={() => {
                        upgradeToV2Mutation.mutate(undefined, {
                          onSuccess: () => {
                            toast({
                              title: "Success",
                              description: "Project upgraded successfully!",
                              status: "success",
                              duration: 3000,
                              isClosable: true,
                            });
                          },
                          onError: (err: any) => {
                            toast({
                              title: "Error",
                              description: parseErrorToMessage(err),
                              status: "error",
                              duration: 3000,
                              isClosable: true,
                            });
                          },
                        });
                      }}
                      colorScheme="blue"
                      // size="lg"
                      isFullWidth
                    >
                      Upgrade
                    </Button>
                    <Text size="body.sm" color="gray.600">
                      You will be prompted to approve 3 transactions
                    </Text>
                  </Stack>
                </Stack>
              </Container>
            </Card>
          </Center>
        ) : (
          <DashboardSection title="Modules">
            <Stack spacing={4}>
              {!(appLoading || moduleMetadataList.isLoading) && isEmpty && (
                <Center>
                  <Box textAlign="center">
                    <Icon as={CgToolbox} boxSize={128} color="gray.300" />
                    <Heading size="md" mt={8}>
                      You have no modules
                      <br />
                      Create one to get started!
                    </Heading>
                    <LinkButton
                      mt={8}
                      leftIcon={<Icon as={FiPlusSquare} boxSize={4} />}
                      href={`${network}/${appAddress}/new`}
                      colorScheme="primary"
                    >
                      Add Module
                    </LinkButton>
                  </Box>
                </Center>
              )}

              {moduleMetadataList.isLoading ||
              shouldUpgradeModuleList.isLoading ? (
                <Stack>
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                </Stack>
              ) : (
                <Stack minH={8}>
                  {moduleMetadataList.data?.map((m) => (
                    <ContractDetailCard
                      key={m.address}
                      contract={m}
                      needsUpgrade={
                        !!shouldUpgradeModuleList.data?.find(
                          ({ address }) => address === m.address,
                        )
                      }
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </DashboardSection>
        )}
      </Stack>
    </Track>
  );
};

DashboardPage.Layout = AppLayout;

export default DashboardPage;

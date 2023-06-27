import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useAddress, useSDKChainId } from "@thirdweb-dev/react";
import { SignerWithRestrictions } from "@thirdweb-dev/sdk";
import { differenceInDays } from "date-fns";
import { useSupportedChainsRecord } from "hooks/chains/configureChains";
import { Badge, Card, Heading, Text } from "tw-components";

interface AccountSignerProps {
  signer: SignerWithRestrictions;
}

export const AccountSigner: React.FC<AccountSignerProps> = ({ signer }) => {
  const address = useAddress();
  const chainId = useSDKChainId();
  const configuredChainsRecord = useSupportedChainsRecord();
  const chain = chainId ? configuredChainsRecord[chainId] : undefined;
  /*   const toggleEditing = () => {
    form.setValue(`phases.${phaseIndex}.isEditing`, !field.isEditing);
  }; */

  return (
    <Card position="relative" p={8}>
      <Flex direction="column" gap={8}>
        {/*         <Flex
          align="flex-start"
          justify="space-between"
          position="absolute"
          top="10px"
          right="10px"
          gap={1}
        >
          <Button
            variant="ghost"
            onClick={toggleEditing}
            size="sm"
            rightIcon={
              <Icon
                as={field.isEditing ? RxCaretUp : RxCaretDown}
                boxSize={5}
              />
            }
          >
            {field.isEditing ? "Collapse" : isAdmin ? "Edit" : "See Phase"}
          </Button>
          <AdminOnly contract={contract as ValidContractInstance}>
            <Button
              variant="ghost"
              onClick={onRemove}
              isDisabled={isLoading}
              colorScheme="red"
              size="sm"
              rightIcon={<Icon as={FiX} />}
            >
              Remove
            </Button>
          </AdminOnly>
        </Flex> */}

        <Flex flexDir="column" gap={2} mt={{ base: 4, md: 0 }}>
          <Flex gap={3} alignItems="center">
            <Heading size="label.lg">{signer.signer}</Heading>
            {signer.isAdmin ? (
              <Badge borderRadius="lg" p={1.5}>
                Admin Key
              </Badge>
            ) : (
              <Badge colorScheme="green" borderRadius="lg" p={1.5}>
                Scoped key
              </Badge>
            )}
            {signer.signer === address && (
              <Badge colorScheme="green" borderRadius="lg" p={1.5}>
                Currently connected
              </Badge>
            )}
          </Flex>
        </Flex>

        {/*         {!field.isEditing ? ( */}
        {signer.isAdmin ? null : (
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={2}>
            <Flex direction="column">
              <Text fontWeight="bold">Maximum value per transaction</Text>
              <Text textTransform="capitalize">
                {signer.restrictions.nativeTokenLimitPerTransaction.toString()}{" "}
                {chain?.nativeCurrency.symbol}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">Approved targets</Text>
              <Text textTransform="capitalize">
                {signer.restrictions.approvedCallTargets.length}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">Expiration (in days)</Text>
              <Text textTransform="capitalize">
                {differenceInDays(
                  signer.restrictions.expirationDate,
                  signer.restrictions.startDate,
                )}
              </Text>
            </Flex>
          </SimpleGrid>
        )}
      </Flex>
    </Card>
  );
};

/* /*  ) : (
        <>
          <CustomFormGroup>
            {isMultiPhase ? <PhaseNameInput /> : null}
            <PhaseStartTimeInput />
          </CustomFormGroup>

          <CreatorInput
            creatorAddress={
              (field.snapshot?.[0] as { address: string; })?.address
            }
          />

          <CustomFormGroup>
            <MaxClaimableSupplyInput />
            <ClaimPriceInput />
          </CustomFormGroup>

          {claimConditionType === "specific" ||
            claimConditionType === "creator" ? null : (
            <CustomFormGroup>
              <MaxClaimablePerWalletInput />
              {isClaimPhaseV1 ? (
                <WaitingTimeInput />
              ) : (
                <Box w="100%" display={{ base: "none", md: "block" }} />
              )}
            </CustomFormGroup>
          )}

          <ClaimerSelection />
        </>
        )} */

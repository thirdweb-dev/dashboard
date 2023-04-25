import { ResetClaimEligibility } from "../reset-claim-eligibility";
import { ClaimPriceInput } from "./Inputs/ClaimPriceInput";
import { ClaimerSelection } from "./Inputs/ClaimerSelection";
import { CreatorInput } from "./Inputs/CreatorInput";
import { MaxClaimablePerWalletInput } from "./Inputs/MaxClaimablePerWalletInput";
import { MaxClaimableSupplyInput } from "./Inputs/MaxClaimableSupplyInput";
import { PhaseNameInput } from "./Inputs/PhaseNameInput";
import { PhaseStartTimeInput } from "./Inputs/PhaseStartTimeInput";
import { WaitingTimeInput } from "./Inputs/WaitingTimeInput";
import { CustomFormGroup } from "./common";
import { AdminOnly } from "@3rdweb-sdk/react/components/roles/admin-only";
import { useIsAdmin } from "@3rdweb-sdk/react/hooks/useContractRoles";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import {
  DropContract,
  TokenContract,
  useAddress,
  useClaimConditions,
  useSetClaimConditions,
  useTokenDecimals,
} from "@thirdweb-dev/react";
import {
  ClaimConditionInput,
  ClaimConditionInputArray,
  NATIVE_TOKEN_ADDRESS,
  SnapshotEntry,
  ValidContractInstance,
} from "@thirdweb-dev/sdk/evm";
import { TransactionButton } from "components/buttons/TransactionButton";
import { ToolTipBox } from "components/configure-networks/Form/ToolTipBox";
import { detectFeatures } from "components/contract-components/utils";
import { SnapshotUpload } from "contract-ui/tabs/claim-conditions/components/snapshot-upload";
import { constants } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import {
  hasLegacyClaimConditions,
  hasMultiphaseClaimConditions,
} from "lib/claimcondition-utils";
import React, { useEffect, useMemo, useState } from "react";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FiPlus, FiTrash, FiX } from "react-icons/fi";
import invariant from "tiny-invariant";
import { Badge, Button, Card, Heading, Text } from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";
import * as z from "zod";
import { ZodError } from "zod";
import { isAddressZero, OtherAddressZero } from "utils/zeroAddress";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { toDateTimeLocal } from "utils/date-utils";
import { format } from "date-fns";

const DEFAULT_PHASE: ClaimConditionInput = {
  startTime: new Date(),
  maxClaimableSupply: "unlimited",
  maxClaimablePerWallet: "unlimited",
  waitInSeconds: "0",
  price: "0",
  currencyAddress: NATIVE_TOKEN_ADDRESS,
  snapshot: undefined,
  merkleRootHash: undefined,
  metadata: {
    name: "",
  },
};

const ClaimConditionsSchema = z.object({
  phases: ClaimConditionInputArray,
});

type DropType = "any" | "specific" | "overrides";

type ClaimConditionType =
  | "public"
  | "overrides"
  | "specific"
  | "creator"
  | "custom";

const ClaimConditionTypeData: Record<
  ClaimConditionType,
  { name: string; description: string; }
> = Object.freeze({
  public: {
    name: "Public",
    description: "Allow any wallet to claim this drop during this claim phase.",
  },
  overrides: {
    name: "Public (With Overrides)",
    description:
      "Allow any wallet to claim this drop during this claim phase with special overrides for some wallet addresses.",
  },
  specific: {
    name: "Allowlist",
    description:
      "Only wallet addresses in the allowlist can claim this drop during this claim phase.",
  },
  creator: {
    name: "Creator",
    description:
      "A phase for the creator of the contract to indefinitely claim with no cost, (only gas).",
  },
  custom: {
    name: "Custom",
    description: "Create a custom claim phase catered to your drop.",
  },
});

const getClaimConditionTypeFromPhase = (
  phase: ClaimConditionInput,
  walletAddress?: string,
): ClaimConditionType => {
  if (!phase.snapshot) {
    return "public";
  } else if (phase.snapshot) {
    if (
      walletAddress &&
      typeof phase.snapshot !== "string" &&
      phase.snapshot.length === 1 &&
      phase.snapshot.some(
        (a) => (a as SnapshotEntry).address === walletAddress,
      ) &&
      phase.snapshot.some(
        (a) => (a as SnapshotEntry).maxClaimable === "unlimited",
      )
    ) {
      return "creator";
    } else if (phase.maxClaimablePerWallet?.toString() === "0") {
      return "specific";
    } else {
      return "overrides";
    }
  }
  return "custom";
};

export type FormData = z.input<typeof ClaimConditionsSchema>;

export type ControlledField = UseFieldArrayReturn<FormData>["fields"][number] &
  FormData["phases"][number];

export interface ClaimsConditionFormContextData {
  form: UseFormReturn<FormData>;
  field: ControlledField;
  phaseIndex: number;
  formDisabled: boolean;
  tokenDecimals: number;
  isClaimPhaseV1: boolean;
  dropType: DropType;
  setOpenSnapshotIndex: React.Dispatch<React.SetStateAction<number>>;
  isAdmin: boolean;
  isColumn?: boolean;
  isErc20: boolean;
  claimConditionType: ClaimConditionType;
}

export const ClaimsConditionFormContext = React.createContext<
  ClaimsConditionFormContextData | undefined
>(undefined);

export function useClaimConditionsFormContext() {
  const data = React.useContext(ClaimsConditionFormContext);
  invariant(
    data,
    "useClaimConditionsFormContext must be used within a ClaimsConditionFormContext.Provider",
  );
  return data;
}

export interface ClaimConditionsFormProps {
  contract: DropContract;
  tokenId?: string;
  isColumn?: true;
}

export const ClaimConditionsForm: React.FC<ClaimConditionsFormProps> = ({
  contract,
  tokenId,
  isColumn,
}) => {
  const [editingPhases, setEditingPhases] = useState<Record<string, boolean>>(
    {},
  );
  // memoized contract info
  const { isMultiPhase, isClaimPhaseV1, isErc20 } = useMemo(() => {
    return {
      isMultiPhase: hasMultiphaseClaimConditions(contract),
      isClaimPhaseV1: hasLegacyClaimConditions(contract),
      isErc20: detectFeatures(contract, ["ERC20"]),
    };
  }, [contract]);

  const walletAddress = useAddress();
  const trackEvent = useTrack();
  const [resetFlag, setResetFlag] = useState(false);
  const isAdmin = useIsAdmin(contract);
  const [openSnapshotIndex, setOpenSnapshotIndex] = useState(-1);
  const setClaimConditionsQuery = useSetClaimConditions(contract, tokenId);

  const tokenDecimals = useTokenDecimals(
    isErc20 ? (contract as TokenContract) : undefined,
  );
  const tokenDecimalsData = tokenDecimals.data ?? 0;
  const saveClaimPhaseNotification = useTxNotifications(
    "Saved claim phases",
    "Failed to save claim phases",
  );

  const claimConditionsQuery = useClaimConditions(contract, tokenId, {
    withAllowList: true,
  });

  const transformedQueryData = useMemo(() => {
    return (claimConditionsQuery.data || [])
      .map((phase, idx) => ({
        ...phase,
        price: phase.currencyMetadata.displayValue,
        maxClaimableSupply: phase.maxClaimableSupply?.toString() || "0",
        currencyMetadata: {
          ...phase.currencyMetadata,
          value: phase.currencyMetadata.value?.toString() || "0",
        },
        currencyAddress: phase.currencyAddress?.toLowerCase() || "0",
        maxClaimablePerWallet: phase.maxClaimablePerWallet?.toString() || "0",
        waitInSeconds: phase.waitInSeconds?.toString() || "0",
        startTime: new Date(phase.startTime),
        snapshot: phase.snapshot?.map(
          ({ address, maxClaimable, price, currencyAddress }) => ({
            address,
            maxClaimable: maxClaimable || "0",
            price: price || undefined,
            currencyAddress: currencyAddress || undefined,
          }),
        ),
        metadata: {
          ...phase.metadata,
          name: phase?.metadata?.name || `Phase ${idx + 1}`,
        },
      }))
      .filter((phase) => isMultiPhase || phase.maxClaimableSupply !== "0");
  }, [claimConditionsQuery.data, isMultiPhase]);

  const isFetchingData =
    claimConditionsQuery.isFetching || setClaimConditionsQuery.isLoading;

  const canEditForm = isAdmin && !isFetchingData;

  const form = useForm<FormData>({
    defaultValues: { phases: transformedQueryData },
    values: { phases: transformedQueryData },
    resetOptions: {
      keepDirty: true,
      keepDirtyValues: true,
    },
  });

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "phases",
  });

  const addPhase = (type: ClaimConditionType) => {
    const name = `${ClaimConditionTypeData[type].name} phase`;

    switch (type) {
      case "public":
        append({
          ...DEFAULT_PHASE,
          metadata: { name },
        });
        break;

      case "specific":
        append({
          ...DEFAULT_PHASE,
          metadata: { name },
          maxClaimablePerWallet: "0",
          snapshot: [],
        });
        break;

      case "overrides":
        append({
          ...DEFAULT_PHASE,
          metadata: { name },
          maxClaimablePerWallet: "1",
          snapshot: [],
        });
        break;

      case "creator":
        append({
          ...DEFAULT_PHASE,
          metadata: { name },
          maxClaimablePerWallet: "0",
          price: "0",
          maxClaimableSupply: "unlimited",
          snapshot: walletAddress
            ? [
              {
                address: walletAddress,
                maxClaimable: "unlimited",
                price: "0",
              },
            ]
            : [],
        });
        break;

      default:
        append({
          ...DEFAULT_PHASE,
          metadata: { name },
        });
    }
  };

  const removePhase = (index: number) => {
    remove(index);
  };

  const phases = form.watch("phases");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...phases[index],
    };
  });

  const handleFormSubmit = form.handleSubmit(async (d) => {
    const category = isErc20 ? "token" : "nft";

    trackEvent({
      category,
      action: "set-claim-conditions",
      label: "attempt",
    });

    try {
      await setClaimConditionsQuery.mutateAsync({
        phases: d.phases as ClaimConditionInput[],
        reset: resetFlag,
      });
      trackEvent({
        category,
        action: "set-claim-conditions",
        label: "success",
      });
      saveClaimPhaseNotification.onSuccess();
    } catch (error) {
      trackEvent({
        category,
        action: "set-claim-conditions",
        label: "error",
      });
      if (error instanceof ZodError) {
        error.errors.forEach((e) => {
          const path = `phases.${e.path.join(".")}`;
          form.setError(path as any, e);
        });
      } else {
        saveClaimPhaseNotification.onError(error);
      }
    }
  });

  const activePhaseId = useMemo(() => {
    let phaseId: string | null = null;
    let latestStartTime: number = 0;

    controlledFields.forEach((phase) => {
      if (!phase.startTime) return;

      const phaseStartTime =
        typeof phase.startTime === "object"
          ? phase.startTime.getTime()
          : phase.startTime;
      const currentTime = new Date().getTime();

      if (phaseStartTime < currentTime && phaseStartTime > latestStartTime) {
        latestStartTime = phaseStartTime;
        phaseId = phase.id;
      }
    });

    return phaseId;
  }, []);

  return (
    <>
      {/* spinner */}
      {isFetchingData && (
        <Spinner
          color="primary"
          size="xs"
          position="absolute"
          top={2}
          right={4}
        />
      )}



      <Flex onSubmit={handleFormSubmit} direction="column" as="form" gap={10}>
        <Flex direction={"column"} gap={6}>
          {/* Show the reason why the form is disabled */}
          {!isAdmin && (
            <Text>
              Connect with admin wallet to edit claim conditions.
            </Text>
          )}
          {controlledFields.map((field, index) => {
            const dropType: DropType = field.snapshot
              ? isClaimPhaseV1 ||
                field.maxClaimablePerWallet?.toString() === "0"
                ? "specific"
                : "overrides"
              : "any";

            const claimConditionType = getClaimConditionTypeFromPhase(
              field,
              walletAddress,
            );

            // TODO: Fix this boolean to show only after saving
            const isActive = activePhaseId === field.id;

            const snapshotValue = field.snapshot?.map((v) =>
              typeof v === "string"
                ? {
                    address: v,
                    maxClaimable: "unlimited",
                    currencyAddress: constants.AddressZero,
                    price: "unlimited",
                  }
                : {
                    ...v,
                    maxClaimable: v?.maxClaimable?.toString() || "unlimited",
                    currencyAddress:
                      v?.currencyAddress || constants.AddressZero,
                    price: v?.price?.toString() || "unlimited",
                  },
            );

            return (
              <React.Fragment key={`snapshot_${field.id}_${index}`}>
                <SnapshotUpload
                  dropType={dropType}
                  isV1ClaimCondition={isClaimPhaseV1}
                  isOpen={openSnapshotIndex === index}
                  onClose={() => setOpenSnapshotIndex(-1)}
                  value={snapshotValue}
                  setSnapshot={(snapshot) =>
                    form.setValue(`phases.${index}.snapshot`, snapshot)
                  }
                  isDisabled={!canEditForm}
                />

                <ClaimsConditionFormContext.Provider
                  value={{
                    form,
                    field,
                    phaseIndex: index,
                    formDisabled: !canEditForm,
                    isErc20,
                    tokenDecimals: tokenDecimalsData,
                    isClaimPhaseV1,
                    dropType,
                    setOpenSnapshotIndex,
                    isAdmin,
                    isColumn,
                    claimConditionType,
                  }}
                >
                  <Card position="relative" p={8}>
                    <Flex direction="column" gap={8}>
                      <Flex
                        align="flex-start"
                        justify="space-between"
                        position="absolute"
                        top="10px"
                        right="10px"
                      >
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setEditingPhases({
                              ...editingPhases,
                              [field.id]: !editingPhases[field.id],
                            })
                          }
                          size="sm"
                          rightIcon={<Icon as={editingPhases[field.id] ? RxCaretUp : RxCaretDown} boxSize={5} />}
                        >
                          {editingPhases[field.id] ? "Done" : isAdmin ? "Edit" : "See Phase"}
                        </Button> 
                        <AdminOnly contract={contract as ValidContractInstance}>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              removePhase(index);
                              if (!isMultiPhase) {
                                setResetFlag(true);
                              }
                            }}
                            isDisabled={setClaimConditionsQuery.isLoading}
                            colorScheme="red"
                            size="sm"
                            rightIcon={<Icon as={FiX} />}
                          >
                            Remove
                          </Button>
                        </AdminOnly>
                      </Flex>

                      <Flex flexDir="column" gap={2} mt={{ base: 4, md: 0 }}>
                        <Flex gap={3} alignItems="center">
                          <Heading>
                            {ClaimConditionTypeData[claimConditionType].name}
                          </Heading>
                          {isActive && (
                            <Badge
                              colorScheme="green"
                              borderRadius="lg"
                              p={1.5}
                            >
                              Currently active
                            </Badge>
                          )}
                        </Flex>
                        <Text>
                          {
                            ClaimConditionTypeData[claimConditionType]
                              .description
                          }
                        </Text>
                      </Flex>

                      {!editingPhases[field.id] ? (
                        <SimpleGrid columns={{ base: 2, md: 4 }} gap={2}>
                          <Flex direction="column">
                            <Text fontWeight="bold">Phase Start</Text>
                            <Text>{field.startTime?.toLocaleString()}</Text>
                          </Flex>
                          <Flex direction="column">
                            <Text fontWeight="bold">
                              {isErc20 ? "tokens" : "NFTs"} to drop
                            </Text>
                            <Text textTransform="capitalize">
                              {field.maxClaimableSupply}
                            </Text>
                          </Flex>
                          <Flex direction="column">
                            <Text fontWeight="bold">Price</Text>
                            {field.price === "0.0" ? (
                              <Text>Free</Text>
                            ) : (
                              <Text>
                                {field.price}{" "}
                                {/* TODO: Show correct symbol, not ETH */}
                                {field.currencyAddress && isAddressZero(field.currencyAddress) ? "ETH" : shortenIfAddress(field.currencyAddress)}
                              </Text>
                            )}
                          </Flex>
                          <Flex direction="column">
                            <Text fontWeight="bold">Limit per wallet</Text>
                            <Text textTransform="capitalize">{field.maxClaimablePerWallet}</Text>
                          </Flex>
                        </SimpleGrid>
                      ) : (
                        <>
                            <CustomFormGroup>
                              {/* Phase Name Input / Form Title */}
                              {isMultiPhase ? <PhaseNameInput /> : null}
                              <PhaseStartTimeInput />
                            </CustomFormGroup>

                            <CreatorInput />

                            <CustomFormGroup>
                              <MaxClaimableSupplyInput />
                              <ClaimPriceInput />
                            </CustomFormGroup>

                            <ClaimerSelection />

                            <CustomFormGroup>
                              <MaxClaimablePerWalletInput />
                              {isClaimPhaseV1 ? (
                                <WaitingTimeInput />
                              ) : (
                                <Box
                                  w="100%"
                                  display={{ base: "none", md: "block" }}
                                />
                              )}
                            </CustomFormGroup>
                        </>
                      )}
                    </Flex>
                  </Card>
                </ClaimsConditionFormContext.Provider>
              </React.Fragment>
            );
          })}

          {phases?.length === 0 && (
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              <Flex direction="column">
                <AlertTitle as={Heading} size="label.lg">
                  {isMultiPhase
                    ? "Missing Claim Phases"
                    : "Missing Claim Conditions"}
                </AlertTitle>
                <AlertDescription as={Text}>
                  {isMultiPhase
                    ? "While no Claim Phase is defined no-one will be able to claim this drop."
                    : "While no Claim Conditions are defined no-one will be able to claim this drop."}
                </AlertDescription>
              </Flex>
            </Alert>
          )}

          <Flex
            justifyContent="space-between"
            flexDir={{ base: "column", md: isColumn ? "column" : "row" }}
            gap={2}
          >
            <Flex gap={2}>
              <AdminOnly contract={contract as ValidContractInstance}>
                {isMultiPhase ? (
                  <>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size="sm"
                        colorScheme="primary"
                        variant={phases?.length > 0 ? "outline" : "solid"}
                        borderRadius="md"
                        leftIcon={<Icon as={FiPlus} />}
                        isDisabled={setClaimConditionsQuery.isLoading}
                      >
                        Add Phase
                      </MenuButton>
                      <MenuList
                        borderRadius="lg"
                        overflow="hidden"
                        zIndex="overlay"
                      >
                        {Object.keys(ClaimConditionTypeData).map((key) => {
                          const type = key as ClaimConditionType;

                          if (type === "custom") return null;

                          return (
                            <MenuItem onClick={() => addPhase(type)}>
                              <Flex>
                                {ClaimConditionTypeData[type].name}
                                <ToolTipBox
                                  content={
                                    <Text size="body.md">
                                      {ClaimConditionTypeData[type].description}
                                    </Text>
                                  }
                                />
                              </Flex>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                  </>
                ) : (
                  phases?.length === 0 && (
                    <Button
                      size="sm"
                        colorScheme="primary"
                      variant="solid"
                      borderRadius="md"
                      leftIcon={<Icon as={FiPlus} />}
                        onClick={() => addPhase("custom")}
                        isDisabled={setClaimConditionsQuery.isLoading}
                    >
                        Add Claim Conditions
                    </Button>
                  )
                )}
              </AdminOnly>
              <ResetClaimEligibility
                isErc20={isErc20}
                contract={contract}
                isColumn={isColumn}
                tokenId={tokenId}
              />
            </Flex>

            <Flex>
              <AdminOnly
                contract={contract as ValidContractInstance}
                fallback={<Box pb={5} />}
              >
                <TransactionButton
                  colorScheme="primary"
                  transactionCount={1}
                  isDisabled={claimConditionsQuery.isLoading}
                  type="submit"
                  isLoading={setClaimConditionsQuery.isLoading}
                  loadingText="Saving..."
                  size="md"
                >
                  Save Phases
                </TransactionButton>
              </AdminOnly>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

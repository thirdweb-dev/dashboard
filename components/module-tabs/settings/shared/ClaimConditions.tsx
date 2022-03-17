import {
  useBundleDropActiveClaimCondition,
  useBundleDropClaimConditionMutation,
  useDropActiveClaimCondition,
  useDropClaimConditionMutation,
  useIsAdmin,
  useTokenDecimals,
} from "@3rdweb-sdk/react";
import {
  BundleDropModule,
  DropModule,
  PublicClaimCondition,
} from "@3rdweb/sdk";
import {
  Badge,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddressZero, MaxUint256 } from "@ethersproject/constants";
import { BigNumberInput } from "components/shared/BigNumberInput";
import { CurrencySelector } from "components/shared/CurrencySelector";
import useAddModuleContext from "contexts/AddModuleContext";
import { BigNumber } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiReset } from "react-icons/bi";
import { parseErrorToMessage } from "utils/errorParser";
import { ModuleSetting } from "./ModuleSetting";
import { SnapshotUpload } from "./SnapshotUpload";

type DropModuleTypes = DropModule | BundleDropModule;

interface IClaimConditionsProps<TModule extends DropModuleTypes> {
  module?: TModule;
  tokenId?: string;
  nextStep?: () => void;
}

export const ClaimConditions = <TModule extends DropModuleTypes>({
  module,
  tokenId,
  nextStep,
}: PropsWithChildren<IClaimConditionsProps<TModule>>) => {
  const toast = useToast();
  const claimCondition =
    module instanceof DropModule
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useDropActiveClaimCondition(module.address)
      : module instanceof BundleDropModule
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useBundleDropActiveClaimCondition(module.address, tokenId)
      : null;

  const claimConditionMutation =
    module instanceof DropModule
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useDropClaimConditionMutation(module)
      : module instanceof BundleDropModule
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useBundleDropClaimConditionMutation(module, tokenId)
      : null;

  const addModuleContext = useAddModuleContext();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<PublicClaimCondition>({
    defaultValues: {
      maxMintSupply: MaxUint256.toString(),
      currency: AddressZero,
      pricePerToken: "0",
      waitTimeSecondsLimitPerTransaction: "0",
      quantityLimitPerTransaction: MaxUint256.toString(),
      merkleRoot: "",
    },
  });

  const decimals = useTokenDecimals(watch("currency"));
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isSaving, setIsSaving] = useState(false);
  const [validAddresses, setValidAddresses] = useState<string[]>([]);

  const maxMintSupplyWatch = watch("maxMintSupply");
  const currencyWatch = watch("currency");
  const pricePerTokenWatch = watch("pricePerToken");
  const waitTimeSecondsLimitPerTransactionWatch = watch(
    "waitTimeSecondsLimitPerTransaction",
  );
  const quantityLimitPerTransactionWatch = watch("quantityLimitPerTransaction");
  const merkleRootWatch = watch("merkleRoot");

  const isClaimConditionChanged = useMemo(() => {
    if (claimCondition?.data) {
      // If we already have a claim condition, and we're changing it
      const data = claimCondition?.data;

      return (
        data?.maxMintSupply !== maxMintSupplyWatch ||
        data?.currency !== currencyWatch ||
        BigNumber.from(claimCondition.data?.pricePerToken || 0).toString() !==
          pricePerTokenWatch ||
        data?.waitTimeSecondsLimitPerTransaction !==
          waitTimeSecondsLimitPerTransactionWatch ||
        data?.quantityLimitPerTransaction !==
          quantityLimitPerTransactionWatch ||
        (data?.merkleRoot || "") !== merkleRootWatch ||
        validAddresses.length > 0
      );
    }

    return true;
  }, [
    claimCondition?.data,
    maxMintSupplyWatch,
    currencyWatch,
    pricePerTokenWatch,
    waitTimeSecondsLimitPerTransactionWatch,
    quantityLimitPerTransactionWatch,
    merkleRootWatch,
    validAddresses,
  ]);

  useEffect(() => {
    if (claimCondition?.data) {
      if (!dirtyFields.maxMintSupply && claimCondition.data.maxMintSupply) {
        setValue("maxMintSupply", claimCondition.data.maxMintSupply);
      }

      if (!dirtyFields.currency && claimCondition.data.currency) {
        setValue("currency", claimCondition.data.currency);
      }

      if (!dirtyFields.pricePerToken && claimCondition.data?.pricePerToken) {
        setValue(
          "pricePerToken",
          BigNumber.from(claimCondition.data?.pricePerToken || 0).toString(),
        );
      }

      if (
        !dirtyFields.waitTimeSecondsLimitPerTransaction &&
        claimCondition.data.waitTimeSecondsLimitPerTransaction
      ) {
        setValue(
          "waitTimeSecondsLimitPerTransaction",
          claimCondition.data.waitTimeSecondsLimitPerTransaction,
        );
      }

      if (
        !dirtyFields.quantityLimitPerTransaction &&
        claimCondition.data.quantityLimitPerTransaction
      ) {
        setValue(
          "quantityLimitPerTransaction",
          BigNumber.from(
            claimCondition.data.quantityLimitPerTransaction || 1,
          ).toString(),
        );
      }

      if (!dirtyFields.merkleRoot && claimCondition.data.merkleRoot) {
        setValue("merkleRoot", claimCondition.data.merkleRoot);
      }
    }
  }, [
    claimCondition?.data,
    setValue,
    dirtyFields.currency,
    dirtyFields.pricePerToken,
    dirtyFields.maxMintSupply,
    dirtyFields.waitTimeSecondsLimitPerTransaction,
    dirtyFields.quantityLimitPerTransaction,
    dirtyFields.merkleRoot,
  ]);

  const onSubmit = async (data: PublicClaimCondition) => {
    if (nextStep) {
      const { setIsConfigLoading } = addModuleContext;
      setIsConfigLoading(true);
    }

    if (!module) {
      return;
    }

    setIsSaving(true);

    try {
      const currency = isAddress(data.currency || "")
        ? data.currency
        : AddressZero;
      const maxMintSupply = BigNumber.from(data.maxMintSupply || MaxUint256);
      const maxQuantityPerTransaction = BigNumber.from(
        data.quantityLimitPerTransaction || MaxUint256,
      );

      const waitTimeSecondsLimitPerTransaction = BigNumber.from(
        data.waitTimeSecondsLimitPerTransaction || 0,
      );

      const factory = module.getClaimConditionsFactory();
      const claimPhase = factory
        .newClaimPhase({
          startTime: new Date(),
          maxQuantity: maxMintSupply,
          maxQuantityPerTransaction,
        })
        .setPrice(data.pricePerToken, currency)
        .setWaitTimeBetweenClaims(waitTimeSecondsLimitPerTransaction);

      if (data.merkleRoot.toString()) {
        claimPhase.setMerkleRoot(data.merkleRoot.toString());
      }

      if (validAddresses.length) {
        await claimPhase.setSnapshot(validAddresses);
      }

      return claimConditionMutation?.mutate(factory, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Claim condition created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setValidAddresses([]);
          setIsSaving(false);
          if (nextStep) {
            const { setIsConfigLoading } = addModuleContext;
            setIsConfigLoading(true);
            nextStep();
          }
        },
        onError: (error) => {
          toast({
            title: "Error saving claim condition",
            description: parseErrorToMessage(error),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsSaving(false);
        },
      });
    } catch {
      setIsSaving(false);
    }
  };

  const resetClaimCondition = () => {
    if (!module || !claimConditionMutation) {
      return;
    }
    const factory = module.getClaimConditionsFactory();
    claimConditionMutation.mutate(factory, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Claim condition reset successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setValidAddresses([]);
        setIsSaving(false);
        if (nextStep) {
          const { setIsConfigLoading } = addModuleContext;
          setIsConfigLoading(true);
          nextStep();
        }
      },
      onError: (error) => {
        toast({
          title: "Error resetting claim condition",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsSaving(false);
      },
    });
  };

  const removeSnapshot = () => {
    setValidAddresses([]);
    setValue("merkleRoot", "");
  };

  const isAdmin = useIsAdmin(module);

  const hasSnapshot = useMemo(() => {
    return (
      (!!merkleRootWatch &&
        merkleRootWatch.toString() !==
          "0x0000000000000000000000000000000000000000000000000000000000000000") ||
      validAddresses.length > 0
    );
  }, [merkleRootWatch, validAddresses]);

  const unsavedChanges = useMemo(() => {
    return (
      validAddresses.length > 0 ||
      merkleRootWatch !== (claimCondition?.data?.merkleRoot || "")
    );
  }, [merkleRootWatch, claimCondition?.data?.merkleRoot, validAddresses]);

  return (
    <ModuleSetting
      heading="Claim Condition"
      description={`
        Your drop's claim condition controls how users can claim 
        your drop and lets you set the price of your token
      `}
      isSaving={isSaving}
      isDisabled={!isClaimConditionChanged}
      canSave={isAdmin && !nextStep}
      onSave={handleSubmit(onSubmit as SubmitHandler<PublicClaimCondition>)}
    >
      <Flex w="100%" gap={3} flexWrap="wrap">
        <FormControl w="30%" flexGrow={1} isInvalid={!!errors.currency}>
          <Heading as={FormLabel} size="label.md">
            Currency
          </Heading>
          <CurrencySelector
            value={watch("currency")}
            onChange={(e) =>
              setValue("currency", e.target.value, { shouldDirty: true })
            }
            isDisabled={claimConditionMutation?.isLoading || !isAdmin}
          />
          <FormHelperText>
            The currency that you want to sell your tokens for
          </FormHelperText>
          <FormErrorMessage>{errors.currency}</FormErrorMessage>
        </FormControl>

        <FormControl w="30%" flexGrow={1} isInvalid={!!errors.pricePerToken}>
          <Heading as={FormLabel} size="label.md">
            Price Per Token
          </Heading>
          <BigNumberInput
            decimals={decimals.data?.decimals}
            fontSize="sm"
            isDisabled={claimConditionMutation?.isLoading || !isAdmin}
            hideMaxButton
            value={watch("pricePerToken").toString()}
            onChange={(value) =>
              setValue("pricePerToken", value, { shouldDirty: true })
            }
          />
          <FormHelperText>
            The price of each token for users to claim.
          </FormHelperText>
          <FormErrorMessage>{errors.pricePerToken}</FormErrorMessage>
        </FormControl>

        <FormControl w="30%" flexGrow={1} isInvalid={!!errors.maxMintSupply}>
          <Heading as={FormLabel} size="label.md">
            Maximum Claimable Supply
          </Heading>

          <BigNumberInput
            fontSize="sm"
            isDisabled={claimConditionMutation?.isLoading || !isAdmin}
            value={watch("maxMintSupply").toString()}
            onChange={(value) =>
              setValue("maxMintSupply", value, { shouldDirty: true })
            }
          />

          <FormHelperText>
            The maximum claimable supply for the <strong>current</strong> claim
            phase. This will be reset every time you create a new claim phase,
            meaning people who claimed in the previous phase will be eligible to
            claim again.
          </FormHelperText>
          <FormErrorMessage>{errors.maxMintSupply}</FormErrorMessage>
        </FormControl>

        <FormControl
          w="30%"
          flexGrow={1}
          isInvalid={!!errors.waitTimeSecondsLimitPerTransaction}
        >
          <Heading as={FormLabel} size="label.md">
            Wait Time (seconds)
          </Heading>

          <BigNumberInput
            fontSize="sm"
            isDisabled={claimConditionMutation?.isLoading || !isAdmin}
            value={watch("waitTimeSecondsLimitPerTransaction").toString()}
            onChange={(value) =>
              setValue("waitTimeSecondsLimitPerTransaction", value, {
                shouldDirty: true,
              })
            }
          />

          <FormHelperText>Time between transactions</FormHelperText>
          <FormErrorMessage>
            {errors.waitTimeSecondsLimitPerTransaction}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          w="30%"
          flexGrow={1}
          isInvalid={!!errors.quantityLimitPerTransaction}
        >
          <Heading as={FormLabel} size="label.md">
            Claim Limit Per Transaction
          </Heading>

          <BigNumberInput
            fontSize="sm"
            isDisabled={claimConditionMutation?.isLoading || !isAdmin}
            value={watch("quantityLimitPerTransaction").toString()}
            onChange={(value) =>
              setValue("quantityLimitPerTransaction", value, {
                shouldDirty: true,
              })
            }
          />

          <FormHelperText>
            How many tokens can be claimed per transaction
          </FormHelperText>
          <FormErrorMessage>
            {errors.quantityLimitPerTransaction}
          </FormErrorMessage>
        </FormControl>

        <SnapshotUpload
          isOpen={isOpen}
          onClose={onClose}
          setAddresses={setValidAddresses}
        />

        <FormControl w="30%" flexGrow={1}>
          <Heading as={FormLabel} size="label.md">
            Snapshot (optional)
          </Heading>
          <Stack direction="row" align="center">
            {hasSnapshot ? (
              <Button
                variant="outline"
                colorScheme="red"
                onClick={removeSnapshot}
              >
                Remove Snapshot
              </Button>
            ) : (
              <Button variant="outline" colorScheme="purple" onClick={onOpen}>
                Upload Snapshot
              </Button>
            )}
            {unsavedChanges && (
              <Tooltip label="Save your claim condition to update your snapshot">
                <Badge colorScheme="yellow" borderRadius="lg" py={1} px={3}>
                  Unsaved Changes
                </Badge>
              </Tooltip>
            )}
          </Stack>
        </FormControl>
        <FormControl w="30%" flexGrow={1}>
          <Heading as={FormLabel} size="label.md">
            Reset Claim Condition
          </Heading>
          <Button
            isLoading={claimConditionMutation?.isLoading}
            onClick={resetClaimCondition}
            leftIcon={<BiReset />}
            size="sm"
            variant="outline"
            colorScheme="red"
          >
            Reset
          </Button>
        </FormControl>
      </Flex>
    </ModuleSetting>
  );
};

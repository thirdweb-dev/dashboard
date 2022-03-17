import {
  useActiveChainId,
  useBundleDropDeploy,
  useCollectionDeploy,
  useDropDeploy,
  useMarketplaceDeploy,
  useNFTDeploy,
  usePackDeploy,
  useRoyaltyTreasury,
  useSDK,
  useSplitsDeploy,
  useTokenDeploy,
  useVoteDeploy,
} from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { ModuleType } from "@3rdweb/sdk";
import { useToast } from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import { useSteps } from "chakra-ui-steps";
import { ConfigureModule } from "components/add-module/configure/ConfigureModule";
import {
  MODULE_TYPE_TO_NAME,
  SelectModule,
} from "components/add-module/select/SelectModule";
import { ModuleSettings } from "components/add-module/settings/ModuleSettings";
import { THIRDWEB_TREASURY_ADDRESSES } from "constants/treasury";
import { BigNumber } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useTrack } from "hooks/analytics/useTrack";
import { useNetworkUrl } from "hooks/useHref";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  AnyContractSchema,
  BundleDropContractInput,
  DropContractInput,
  MarketplaceContractInput,
  NFTCollectionContractInput,
  NFTContractInput,
  PackContractInput,
  SplitsContractInput,
  TokenContractInput,
  VoteContractInput,
} from "schema/contracts";
import { zodResolver } from "schema/zodResolver";
import { buildModuleUrl } from "utils/moduleUrls";
import { SupportedChainId } from "utils/network";

interface ModuleSetup {
  name: string;
  description: string;
  [key: string]: any;
}

export interface AddModuleStep {
  label: string;
  action: string;
  content: React.FC<any>;
}

interface IAddModuleContext {
  steps: {
    steps: AddModuleStep[];
    prevStep: () => void;
    nextStep: () => void;
    activeStep: number;
  };
  analytics: {
    Track: any;
    trackEvent: any;
  };
  edit: {
    editable: any;
    setEditable: Dispatch<SetStateAction<any>>;
  };
  splits: {
    addSplit: (address: string, percentage: string) => void;
    editSplit: (address: string, percentage: string) => void;
    removeSplit: (address: string) => void;
  };
  isConfigLoading: boolean;
  setIsConfigLoading: Dispatch<SetStateAction<boolean>>;
  module: any;
  register: any;
  errors: any;
  error: any;
  watch: any;
  handleSubmit: any;
  setError: any;
  setValue: any;
  onSubmit: any;
  isDeploying: boolean;
  selectedModule: ModuleType | undefined;
  setSelectedModule: Dispatch<SetStateAction<ModuleType | undefined>>;
}

const AddModuleContext = createContext<IAddModuleContext>(
  {} as IAddModuleContext,
);

export default function useAddModuleContext() {
  return useContext(AddModuleContext);
}

export const AddModuleContextProvider: React.FC = ({ children }) => {
  const sdk = useSDK();
  const toast = useToast();
  const router = useRouter();
  const chainId = useActiveChainId();
  const appAddress = useSingleQueryParam("app");
  const network = useNetworkUrl();
  const { Track, trackEvent } = useTrack({
    page: "add_module",
    network,
    project: appAddress,
  });

  const {
    prevStep: prev,
    nextStep: next,
    activeStep,
  } = useSteps({
    initialStep: 0,
  });

  const royaltyTreasury = useRoyaltyTreasury(appAddress);
  const deployCurrency = useTokenDeploy(appAddress);
  const deployNFT = useNFTDeploy(appAddress);
  const deployCollection = useCollectionDeploy(appAddress);
  const deployPack = usePackDeploy(appAddress);
  const deployMarketplace = useMarketplaceDeploy(appAddress);
  const deployDrop = useDropDeploy(appAddress);
  const deployBundleDrop = useBundleDropDeploy(appAddress);
  const deploySplits = useSplitsDeploy(appAddress);
  const deployVote = useVoteDeploy(appAddress);

  const { address } = useWeb3();
  const [editable, setEditable] = useState<any>();
  const [selectedModule, setSelectedModule] = useState<ModuleType>();
  const [isConfigLoading, setIsConfigLoading] = useState(false);
  const [isDeploying, setIsDeloying] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ModuleSetup>({
    resolver: zodResolver(AnyContractSchema),
    defaultValues: {
      name: "",
      description: "",
      symbol: "",
      feeRecipient: AddressZero,
      sellerFeeBasisPoints: 0,
      marketFeeBasisPoints: 0,
      maxSupply: Number.MAX_SAFE_INTEGER - 1,
      primarySaleRecipientAddress: AddressZero,
      recipientSplits: [],
      isRoyalty: false,
      minimumNumberOfTokensNeededToPropose: "0",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 86400,
      votingQuorumFraction: 0,
    },
  });

  const [moduleAddress, setModuleAddress] = useState("");
  const module = useMemo(() => {
    if (!moduleAddress) {
      return;
    }

    switch (selectedModule) {
      case ModuleType.NFT:
        return sdk?.getNFTModule(moduleAddress);
      case ModuleType.BUNDLE:
        return sdk?.getBundleModule(moduleAddress);
      case ModuleType.DROP:
        return sdk?.getDropModule(moduleAddress);
      case ModuleType.MARKETPLACE:
        return sdk?.getMarketModule(moduleAddress);
      case ModuleType.CURRENCY:
        return sdk?.getTokenModule(moduleAddress);
      case ModuleType.PACK:
        return sdk?.getPackModule(moduleAddress);
      case ModuleType.BUNDLE_DROP:
        return sdk?.getBundleDropModule(moduleAddress);
      case ModuleType.BUNDLE_SIGNATURE:
        return null;
      case ModuleType.SPLITS:
        return sdk?.getSplitsModule(moduleAddress);
      case ModuleType.VOTE:
        return sdk?.getVoteModule(moduleAddress);
    }
  }, [sdk, moduleAddress, selectedModule]);

  const steps: AddModuleStep[] = useMemo(() => {
    if (selectedModule === ModuleType.SPLITS) {
      return [
        {
          label: "Select",
          action: "Setup Module",
          content: SelectModule,
        },
        {
          label: "Configure",
          action: `Deploy ${
            selectedModule ? MODULE_TYPE_TO_NAME[selectedModule] : ""
          } Module`,
          content: ConfigureModule,
        },
      ];
    }

    return [
      {
        label: "Select",
        action: "Setup Module",
        content: SelectModule,
      },
      {
        label: "Configure",
        action: `Deploy ${
          selectedModule ? MODULE_TYPE_TO_NAME[selectedModule] : ""
        } Module`,
        content: ConfigureModule,
      },
      {
        label: "Setup",
        action: "Confirm Configuration",
        content: ModuleSettings,
      },
    ];
  }, [selectedModule]);

  useEffect(() => {
    if (royaltyTreasury.data) {
      setValue("feeRecipient", royaltyTreasury.data);
    }
  }, [royaltyTreasury.data, setValue]);

  useEffect(() => {
    setValue("primarySaleRecipientAddress", address);
  }, [address, setValue]);

  const recipientSplits = watch("recipientSplits");
  const isRoyalty = watch("isRoyalty");
  useEffect(() => {
    const remaining =
      100 -
      watch("recipientSplits")
        ?.map((split: any) => split.percentage)
        .reduce((s1: any, s2: any) => parseFloat(s1) + parseFloat(s2), 0);
    setEditable({
      address: "",
      percentage: remaining.toString(),
    });
  }, [recipientSplits, appAddress, watch, isRoyalty]);

  useEffect(() => {
    if (selectedModule === ModuleType.SPLITS) {
      setEditable({
        address: address || "",
        percentage: isRoyalty ? "95.0" : "99.7",
      });

      setValue(
        "recipientSplits",
        [
          {
            address: THIRDWEB_TREASURY_ADDRESSES[chainId as SupportedChainId],
            percentage: isRoyalty ? "5.0" : "0.3",
          },
        ],
        ...watch("recipientSplits"),
      );
    }
  }, [selectedModule, setValue, watch, address, chainId, isRoyalty]);

  const addModuleStep =
    activeStep === 0
      ? "select-module"
      : activeStep === 1
      ? "configure-module"
      : activeStep === 2
      ? "manage-permissions"
      : undefined;

  const prevStep = () => {
    if (activeStep === 2) {
      return;
    }

    trackEvent({
      category: "add_module",
      action: "click",
      label: "prev",
      addModuleStep,
    });
    prev();
  };

  const nextStep = () => {
    trackEvent({
      category: "add_module",
      action: "click",
      label: "next",
      addModuleStep,
    });
    if (activeStep === 2) {
      if (selectedModule === undefined) {
        throw new Error("No module selected");
      }
      router.push(
        `${buildModuleUrl(
          network,
          selectedModule,
          appAddress as string,
          moduleAddress,
        )}`,
      );
    } else {
      next();
    }
  };

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (selectedModule === undefined) {
        return;
      }
      setIsDeloying(true);

      trackEvent({
        category: "add_module",
        action: "click",
        label: "next",
        addModuleStep,
      });

      try {
        switch (selectedModule) {
          case ModuleType.NFT:
            await deployNFT.mutateAsync(data as NFTContractInput, {
              onSuccess: ({ contractAddress }) => {
                setModuleAddress(contractAddress);
                next();
              },
            });
            break;
          case ModuleType.COLLECTION:
            await deployCollection.mutateAsync(
              data as NFTCollectionContractInput,
              {
                onSuccess: ({ contractAddress }) => {
                  setModuleAddress(contractAddress);
                  next();
                },
              },
            );
            break;
          case ModuleType.PACK:
            await deployPack.mutateAsync(data as PackContractInput, {
              onSuccess: ({ contractAddress }) => {
                setModuleAddress(contractAddress);
                next();
              },
            });
            break;
          case ModuleType.MARKETPLACE:
            await deployMarketplace.mutateAsync(
              data as MarketplaceContractInput,
              {
                onSuccess: ({ contractAddress }) => {
                  setModuleAddress(contractAddress);
                  next();
                },
              },
            );
            break;
          case ModuleType.CURRENCY:
            await deployCurrency.mutateAsync(data as TokenContractInput, {
              onSuccess: ({ contractAddress }) => {
                setModuleAddress(contractAddress);
                next();
              },
            });
            break;
          case ModuleType.DROP:
            await deployDrop.mutateAsync(data as DropContractInput, {
              onSuccess: ({ contractAddress }) => {
                setModuleAddress(contractAddress);
                next();
              },
            });
            break;
          case ModuleType.BUNDLE_DROP:
            await deployBundleDrop.mutateAsync(
              data as BundleDropContractInput,
              {
                onSuccess: ({ contractAddress }) => {
                  setModuleAddress(contractAddress);
                  next();
                },
              },
            );
            break;
          case ModuleType.BUNDLE_SIGNATURE:
            break;
          case ModuleType.SPLITS:
            const { recipientSplits: currentSplits, ...metadata } = data;

            const otherSplits = currentSplits.filter(
              (split: any) =>
                split.address.toLowerCase() !==
                THIRDWEB_TREASURY_ADDRESSES[
                  chainId as SupportedChainId
                ].toLowerCase(),
            );

            const lengths = otherSplits.map(
              (split: any) => split.percentage.match(/\d/g).length,
            );

            const digits = Math.max(...lengths);

            const splits = otherSplits.map((split: any) => {
              const shares = BigNumber.from(
                (parseFloat(split.percentage) * 10 ** digits).toString(),
              );

              return {
                address: split.address,
                shares,
              };
            });

            const splitsInput = {
              ...metadata,
              recipientSplits: splits,
            };

            await deploySplits.mutateAsync(splitsInput as SplitsContractInput, {
              onSuccess: ({ contractAddress }) => {
                setModuleAddress(contractAddress);
                router.push(
                  `${buildModuleUrl(
                    network,
                    selectedModule,
                    appAddress as string,
                    contractAddress,
                  )}`,
                );
              },
            });
            break;
          case ModuleType.VOTE:
            await deployVote.mutateAsync(data as VoteContractInput, {
              onSuccess: ({ contractAddress }) => {
                setModuleAddress(contractAddress);
                router.push(
                  `${buildModuleUrl(
                    network,
                    selectedModule,
                    appAddress as string,
                    contractAddress,
                  )}`,
                );
              },
            });
            break;
        }
        setError(null);
      } catch (err) {
        console.error("failed to deploy", err);
        setError(err as Error);
      } finally {
        setIsDeloying(false);
      }
    },
    [
      next,
      addModuleStep,
      trackEvent,
      selectedModule,
      deployNFT,
      deployCollection,
      deployPack,
      deployMarketplace,
      deployCurrency,
      deployDrop,
      deployBundleDrop,
      deploySplits,
      deployVote,
      router,
      network,
      appAddress,
      chainId,
    ],
  );

  const addSplit = (splitAddress: string, percentage: string) => {
    if (isAddress(splitAddress)) {
      if (
        !watch("recipientSplits").find(
          (split: any) => split.address === splitAddress,
        )
      ) {
        setValue("recipientSplits", [
          ...watch("recipientSplits"),
          {
            address: splitAddress,
            percentage,
          },
        ]);
      } else {
        editSplit(splitAddress, percentage);
      }
    } else {
      toast({
        title: "Error adding recipient",
        description: "Invalid wallet address",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const editSplit = (splitAddress: string, percentage: string) => {
    const splits = watch("recipientSplits").map((split: any) => {
      if (split.address === splitAddress) {
        return { address, percentage };
      } else {
        return split;
      }
    });

    setValue("recipientSplits", splits);
  };

  const removeSplit = (splitAddress: string) => {
    const splits = watch("recipientSplits").filter(
      (split: any) => split.address !== splitAddress,
    );
    setValue("recipientSplits", splits);
  };

  return (
    <AddModuleContext.Provider
      value={{
        steps: {
          steps,
          prevStep,
          nextStep,
          activeStep,
        },
        analytics: {
          Track,
          trackEvent,
        },
        splits: {
          addSplit,
          editSplit,
          removeSplit,
        },
        edit: {
          editable,
          setEditable,
        },
        isConfigLoading,
        setIsConfigLoading,
        module,
        register,
        watch,
        error,
        errors,
        handleSubmit,
        setError,
        onSubmit,
        selectedModule,
        setSelectedModule,
        isDeploying,
        setValue,
      }}
    >
      {children}
    </AddModuleContext.Provider>
  );
};

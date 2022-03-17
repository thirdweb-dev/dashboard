import {
  AppModule,
  BundleDropModule,
  BundleModule,
  DatastoreModule,
  DropModule,
  MarketModule,
  MarketplaceModule,
  ModuleType,
  NFTModule,
  PackModule,
  SplitsModule,
  TokenModule,
  VoteModule,
} from "@3rdweb/sdk";
import { BigNumber } from "ethers";
import invariant from "ts-invariant";
import {
  cacheKeyMap,
  recipientKeys,
  transferRestrictedKeys,
} from "../cache-keys";
import { EitherBaseModuleType } from "../types";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";

export function useRealModule<T extends EitherBaseModuleType>(module?: T) {
  if (!module) {
    return null;
  } else if (module instanceof NFTModule) {
    return module as NFTModule;
  } else if (module instanceof BundleModule) {
    return module as BundleModule;
  } else if (module instanceof PackModule) {
    return module as PackModule;
  } else if (module instanceof DropModule) {
    return module as DropModule;
  } else if (module instanceof BundleDropModule) {
    return module as BundleDropModule;
  } else if (module instanceof TokenModule) {
    return module as TokenModule;
  } else if (module instanceof DatastoreModule) {
    return module as DatastoreModule;
  } else if (module instanceof AppModule) {
    return module as AppModule;
  } else if (module instanceof VoteModule) {
    return module as VoteModule;
  } else if (module instanceof MarketModule) {
    return module as MarketModule;
  } else if (module instanceof MarketplaceModule) {
    return module as MarketplaceModule;
  }

  throw new Error("Module is not a valid module");
}

export function useModuleTypeOfModule<T extends EitherBaseModuleType>(
  module?: T,
): ModuleType | null {
  if (!module) {
    return null;
  } else if (module instanceof NFTModule) {
    return NFTModule.moduleType;
  } else if (module instanceof BundleModule) {
    return BundleModule.moduleType;
  } else if (module instanceof TokenModule) {
    return TokenModule.moduleType;
  } else if (module instanceof DropModule) {
    return DropModule.moduleType;
  } else if (module instanceof BundleDropModule) {
    return BundleDropModule.moduleType;
  } else if (module instanceof MarketModule) {
    return MarketModule.moduleType;
  } else if (module instanceof MarketplaceModule) {
    return MarketplaceModule.moduleType;
  } else if (module instanceof SplitsModule) {
    return SplitsModule.moduleType;
  } else if (module instanceof PackModule) {
    return PackModule.moduleType;
  } else if (module instanceof DatastoreModule) {
    return DatastoreModule.moduleType;
  } else if (module instanceof VoteModule) {
    return VoteModule.moduleType;
  }

  throw new Error("Module does not have a moduleType");
}

export function useModuleName<T extends EitherBaseModuleType>(
  module?: T,
): string | null {
  if (!module) {
    return null;
  } else if (module instanceof NFTModule) {
    return "NFTModule";
  } else if (module instanceof BundleModule) {
    return "BundleModule";
  } else if (module instanceof TokenModule) {
    return "TokenModule";
  } else if (module instanceof DropModule) {
    return "DropModule";
  } else if (module instanceof BundleDropModule) {
    return "BundleDropModule";
  } else if (module instanceof MarketModule) {
    return "MarketModule";
  } else if (module instanceof MarketplaceModule) {
    return "MarketplaceModule";
  } else if (module instanceof SplitsModule) {
    return "SplitsModule";
  } else if (module instanceof PackModule) {
    return "PackModule";
  } else if (module instanceof DatastoreModule) {
    return "DatastoreModule";
  } else if (module instanceof VoteModule) {
    return "VoteModule";
  }

  throw new Error("Module does not have a moduleType");
}

interface ITransferInput {
  to: string;
  amount?: string;
  tokenId?: string;
}

export type TransferableModule =
  | NFTModule
  | BundleModule
  | TokenModule
  | DropModule
  | BundleDropModule
  | PackModule;

export type RecipientModule = DropModule | BundleDropModule | NFTModule;

export function useTransferRestricted(module?: TransferableModule) {
  return useQueryWithNetwork(
    transferRestrictedKeys.detail(module?.address),
    () => module?.isTransferRestricted(),
    {
      enabled: !!module,
    },
  );
}

export function useSaleRecipient(module?: RecipientModule, tokenId?: string) {
  return useQueryWithNetwork(
    tokenId
      ? recipientKeys.token(module?.address, tokenId)
      : recipientKeys.detail(module?.address),
    () => {
      if (tokenId) {
        return (module as BundleDropModule)?.getSaleRecipient(tokenId);
      }

      return module?.getDefaultSaleRecipient();
    },
    {
      enabled: !!module,
    },
  );
}

export function useTransferRestrictedMutation(module?: TransferableModule) {
  return useMutationWithInvalidate(
    (isRestricted: boolean) => {
      invariant(module, "module must be defined");
      return module?.setRestrictedTransfer(isRestricted);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        invalidate([transferRestrictedKeys.detail(module?.address)]);
      },
    },
  );
}

export function useSetSaleRecipientMutation(
  module?: RecipientModule,
  tokenId?: string,
) {
  return useMutationWithInvalidate(
    (recipientAddress: string) => {
      invariant(module, "module must be defined");
      if (tokenId) {
        return (module as BundleDropModule)?.setSaleRecipient(
          tokenId,
          recipientAddress,
        );
      }

      return module?.setDefaultSaleRecipient(recipientAddress);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        if (tokenId) {
          invalidate([recipientKeys.token(module?.address, tokenId)]);
        } else {
          invalidate([recipientKeys.detail(module?.address)]);
        }
      },
    },
  );
}

export function useTransferMutation(module?: EitherBaseModuleType) {
  const actualModule = useRealModule(module);
  const moduleType = useModuleTypeOfModule(module);

  invariant(module, "Module is not a valid module. Please use a valid module");
  invariant(
    "transfer" in module,
    "module does not support transfer functionality",
  );
  return useMutationWithInvalidate(
    async (transferData: ITransferInput) => {
      if (
        actualModule instanceof NFTModule ||
        actualModule instanceof DropModule
      ) {
        invariant(transferData.tokenId, "tokenId is required");
        return await actualModule.transfer(
          transferData.to,
          transferData.tokenId,
        );
      } else if (
        actualModule instanceof BundleModule ||
        actualModule instanceof PackModule
      ) {
        invariant(transferData.amount, "amount is required");
        invariant(transferData.tokenId, "tokenId is required");

        return await actualModule.transfer(
          transferData.to,
          transferData.tokenId,
          BigNumber.from(transferData.amount),
        );
      } else if (actualModule instanceof TokenModule) {
        invariant(transferData.amount, "amount is required");
        return await actualModule.transfer(
          transferData.to,
          BigNumber.from(transferData.amount),
        );
      }
      throw new Error("Module is not a valid module");
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // this should not be possible, but we need to catch it in case it does
        // if we don't know we just invalited everything.
        if (!moduleType) {
          return invalidate(
            Object.keys(cacheKeyMap)
              .map((key) => {
                const cacheKeys =
                  cacheKeyMap[key as unknown as keyof typeof cacheKeyMap];
                if ("list" in cacheKeys) {
                  return cacheKeys.list(actualModule?.address);
                }
                return undefined as never;
              })
              .filter((fn) => !!fn),
          );
        }
        return invalidate([
          cacheKeyMap[moduleType].list(actualModule?.address),
        ]);
      },
    },
  );
}

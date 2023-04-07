import { Chain, defaultChains } from "@thirdweb-dev/chains";
import { useAllChainsData } from "hooks/chains/allChains";
import React, { createContext, useCallback, useEffect, useState } from "react";

// extra information on top of Chain interface
// all keys added here must be optional
export interface StoredChain extends Chain {
  isModified?: boolean;
  isCustom?: boolean;
}

const MODIFIED_CHAINS_KEY = "tw-modified-chains";

export const SupportedChainsContext = createContext<StoredChain[] | undefined>(
  undefined,
);

export const ModifiedChainsContext = createContext<StoredChain[] | undefined>(
  undefined,
);

export const RecentlyUsedChainsContext = createContext<
  StoredChain[] | undefined
>(undefined);

export const AddRecentlyUsedChainsContext = createContext<
  ((chain: StoredChain) => void) | undefined
>(undefined);

export const ModifyChainContext = createContext<
  ((chain: Chain) => void) | undefined
>(undefined);

export const SupportedChainsReadyContext = createContext(false);

export const isNetworkConfigModalOpenCtx = createContext(false);

export const SetIsNetworkConfigModalOpenCtx = createContext<
  ((value: boolean) => void) | undefined
>(undefined);

export const EditChainContext = createContext<Chain | undefined>(undefined);

export const SetEditChainContext = createContext<
  ((chain: Chain | undefined) => void) | undefined
>(undefined);

const RECENTLY_USED_CHAIN_IDS_KEY = "tw-recently-used-chains";

/**
 * if no networks are configured by the user, return the defaultChains
 */
export function SupportedChainsProvider(props: { children: React.ReactNode }) {
  const [supportedChains, setSupportedChains] =
    useState<StoredChain[]>(defaultChains);
  const [modifiedChains, setModifiedChains] = useState<StoredChain[]>([]);
  const [isSupportedChainsReady, setIsSupportedChainsReady] = useState(false);
  const [recentlyUsedChains, setRecentlyUsedChains] = useState<StoredChain[]>(
    [],
  );
  const [isNetworkConfigModalOpen, setIsNetworkConfigModalOpen] =
    useState(false);
  const [editChain, setEditChain] = useState<Chain | undefined>(undefined);

  const addToRecentlyUsedChains = useCallback(
    (chain: StoredChain) => {
      const _recentlyUsedChains = recentlyUsedChains.filter(
        (c) => c.chainId !== chain.chainId,
      );
      // add to the front of the array
      _recentlyUsedChains.unshift(chain);
      // only keep the last 5
      _recentlyUsedChains.splice(5);

      setRecentlyUsedChains(_recentlyUsedChains);
      const recentlyUsedChainIds = _recentlyUsedChains.map((c) => c.chainId);
      try {
        localStorage.setItem(
          RECENTLY_USED_CHAIN_IDS_KEY,
          JSON.stringify(recentlyUsedChainIds),
        );
      } catch (e) {
        localStorage.clear();
        localStorage.setItem(
          RECENTLY_USED_CHAIN_IDS_KEY,
          JSON.stringify(recentlyUsedChainIds),
        );
      }
    },
    [recentlyUsedChains],
  );
  const { allChains, chainIdToIndexRecord, chainIdToChainRecord } =
    useAllChainsData();

  // get recently used chains from stroage
  useEffect(() => {
    if (!isSupportedChainsReady) {
      return;
    }

    if (recentlyUsedChains.length > 0) {
      return;
    }

    const _recentlyUsedChainsStr = localStorage.getItem(
      RECENTLY_USED_CHAIN_IDS_KEY,
    );
    if (!_recentlyUsedChainsStr) {
      return;
    }

    try {
      const _recentlyUsedChainIds = JSON.parse(
        _recentlyUsedChainsStr,
      ) as number[];
      const _recentlyUsedChains = _recentlyUsedChainIds.map((chainId) => {
        return chainIdToChainRecord[chainId];
      });

      setRecentlyUsedChains(_recentlyUsedChains);
    } catch (e) {
      localStorage.removeItem(RECENTLY_USED_CHAIN_IDS_KEY);
    }
  }, [chainIdToChainRecord, isSupportedChainsReady, recentlyUsedChains]);

  const mergeModifiedChains = useCallback(
    (newModifiedChains: Chain[]) => {
      setSupportedChains((_supportedChains) => {
        const newSupportedChains = [..._supportedChains];

        newModifiedChains.forEach((modifiedChain) => {
          // if this chain is already in the supported chains, update it
          if (modifiedChain.chainId in chainIdToIndexRecord) {
            const i = chainIdToIndexRecord[modifiedChain.chainId];
            newSupportedChains[i] = modifiedChain;
          } else {
            // append the modified chain to the end of the supported chains
            newSupportedChains.push(modifiedChain);
          }
        });

        return newSupportedChains;
      });
    },
    [chainIdToIndexRecord],
  );

  // create supported chains and modified chains on mount
  useEffect(() => {
    if (allChains.length === 0) {
      return;
    }

    if (isSupportedChainsReady) {
      return;
    }

    const _modifiedChains = chainStorage.get(MODIFIED_CHAINS_KEY);

    if (_modifiedChains.length === 0) {
      setSupportedChains(allChains);
      setIsSupportedChainsReady(true);
      return;
    }

    setModifiedChains(_modifiedChains);
    mergeModifiedChains(_modifiedChains);
    setIsSupportedChainsReady(true);
  }, [
    allChains,
    chainIdToIndexRecord,
    isSupportedChainsReady,
    mergeModifiedChains,
  ]);

  const modifyChain = useCallback(
    (chain: Chain) => {
      // if this chain is already in the modified chains, update it
      const i = modifiedChains.findIndex((c) => c.chainId === chain.chainId);
      if (i !== -1) {
        const newModifiedChains = [...modifiedChains];
        newModifiedChains[i] = { ...chain, isModified: true } as StoredChain;
        setModifiedChains(newModifiedChains);
        mergeModifiedChains(newModifiedChains);
        chainStorage.set(MODIFIED_CHAINS_KEY, newModifiedChains);
      }
      // else add it to the modified chains
      else {
        const newModifiedChains = [
          ...modifiedChains,
          { ...chain, isCustom: true } as StoredChain,
        ];
        setModifiedChains(newModifiedChains);
        mergeModifiedChains(newModifiedChains);
        chainStorage.set(MODIFIED_CHAINS_KEY, newModifiedChains);
      }
    },
    [mergeModifiedChains, modifiedChains],
  );

  return (
    <SupportedChainsContext.Provider value={supportedChains}>
      <SupportedChainsReadyContext.Provider value={isSupportedChainsReady}>
        <ModifiedChainsContext.Provider value={modifiedChains}>
          <ModifyChainContext.Provider value={modifyChain}>
            <RecentlyUsedChainsContext.Provider value={recentlyUsedChains}>
              <AddRecentlyUsedChainsContext.Provider
                value={addToRecentlyUsedChains}
              >
                <EditChainContext.Provider value={editChain}>
                  <SetEditChainContext.Provider value={setEditChain}>
                    <isNetworkConfigModalOpenCtx.Provider
                      value={isNetworkConfigModalOpen}
                    >
                      <SetIsNetworkConfigModalOpenCtx.Provider
                        value={setIsNetworkConfigModalOpen}
                      >
                        {props.children}
                      </SetIsNetworkConfigModalOpenCtx.Provider>
                    </isNetworkConfigModalOpenCtx.Provider>
                  </SetEditChainContext.Provider>
                </EditChainContext.Provider>
              </AddRecentlyUsedChainsContext.Provider>
            </RecentlyUsedChainsContext.Provider>
          </ModifyChainContext.Provider>
        </ModifiedChainsContext.Provider>
      </SupportedChainsReadyContext.Provider>
    </SupportedChainsContext.Provider>
  );
}

// storage  --------------------------------------------

// todo: move from local storage to indexedDB
const chainStorage = {
  get(key: string): Chain[] {
    try {
      const networkListStr = localStorage.getItem(key);
      return networkListStr ? JSON.parse(networkListStr) : [];
    } catch (e) {
      // if parsing error, clear dirty storage
      localStorage.removeItem(key);
    }

    return [];
  },

  set(key: string, networkList: Chain[]) {
    const value = JSON.stringify(networkList);
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // if storage limit exceed
      // clear entire local storage and then try again
      localStorage.clear();
      localStorage.setItem(key, value);
    }
  },
};

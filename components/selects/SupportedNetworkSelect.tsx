import { useWeb3 } from "@3rdweb-sdk/react";
import { Select, SelectProps, forwardRef } from "@chakra-ui/react";
import {
  ChainId,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
} from "@thirdweb-dev/sdk/evm";
import { useConfiguredNetworks } from "components/configure-networks/useConfiguredNetworks";
import { deprecatedChains } from "constants/mappings";
import { useMemo } from "react";

export interface SupportedNetworkSelectProps
  extends Omit<SelectProps, "children"> {
  disabledChainIds?: ChainId[];
  disabledChainIdText?: string;
}

export const SupportedNetworkSelect = forwardRef<
  SupportedNetworkSelectProps,
  "select"
>(
  (
    { disabledChainIds, disabledChainIdText = "Unsupported", ...selectProps },
    ref,
  ) => {
    const { getNetworkMetadata } = useWeb3();
    const testnets = useMemo(() => {
      return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
        return getNetworkMetadata(supportedChain);
      }).filter((n) => n.isTestnet === true);
    }, [getNetworkMetadata]);

    const mainnets = useMemo(() => {
      return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
        return getNetworkMetadata(supportedChain);
      }).filter((n) => n.isTestnet === false);
    }, [getNetworkMetadata]);

    const configuredNetworks = useConfiguredNetworks();

    return (
      <Select {...selectProps} ref={ref}>
        <option disabled value={-1}>
          Select Network
        </option>
        <optgroup label="Mainnets">
          {mainnets.map((network) => (
            <option
              key={network.chainId}
              value={network.chainId}
              disabled={disabledChainIds?.includes(network.chainId)}
            >
              {network.chainName} ({network.symbol})
              {disabledChainIds?.includes(network.chainId)
                ? ` - ${disabledChainIdText}`
                : ""}
            </option>
          ))}
        </optgroup>
        <optgroup label="Testnets">
          {testnets.map((network) => (
            <option
              key={network.chainId}
              value={network.chainId}
              disabled={disabledChainIds?.includes(network.chainId)}
            >
              {network.chainName} ({network.symbol})
              {deprecatedChains.includes(
                network.chainId as SUPPORTED_CHAIN_ID,
              ) && " - Deprecated"}
              {disabledChainIds?.includes(network.chainId) &&
              !deprecatedChains.includes(network.chainId as SUPPORTED_CHAIN_ID)
                ? ` - ${disabledChainIdText}`
                : ""}
            </option>
          ))}
        </optgroup>

        {configuredNetworks.length > 0 && (
          <optgroup label="Custom">
            {configuredNetworks.map((network) => (
              <option
                key={network.chainId}
                value={network.chainId}
                disabled={disabledChainIds?.includes(network.chainId)}
              >
                {network.name} ({network.currencySymbol})
              </option>
            ))}
          </optgroup>
        )}
      </Select>
    );
  },
);

import { Select, SelectProps, forwardRef } from "@chakra-ui/react";
import { ChainId, SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk/evm";
import { deprecatedChains } from "constants/mappings";
import { useConfiguredChains } from "hooks/chains/configureChains";
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
    const configuredNetworks = useConfiguredChains();

    const testnets = useMemo(() => {
      return configuredNetworks.filter((n) => n.testnet);
    }, [configuredNetworks]);

    const mainnets = useMemo(() => {
      return configuredNetworks.filter((n) => !n.testnet);
    }, [configuredNetworks]);

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
              {network.name} ({network.nativeCurrency.symbol})
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
              {network.name} ({network.nativeCurrency.symbol})
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
      </Select>
    );
  },
);

import { useActiveChainId } from "@3rdweb-sdk/react";
import {
  useSplitsBalanceAndDistribute,
  useSplitsData,
  useSplitsModule,
  useSplitsModuleMetadata,
} from "@3rdweb-sdk/react/hooks/useSplits";
import { SplitRecipient } from "@3rdweb/sdk";
import {
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { Card } from "components/layout/Card";
import { DistributeButton } from "components/module-pages/action-buttons/DistributeButton";
import { ModuleLayout } from "components/module-pages/module-layout";
import { THIRDWEB_TREASURY_ADDRESSES } from "constants/treasury";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import { SupportedChainId } from "utils/network";

interface IBalance {
  address: string;
  name: string;
  symbol: string;
  balance: string;
}

const SplitsPage: ConsolePage = () => {
  const chainId = useActiveChainId();
  const splitsAddress = useSingleQueryParam("splits");
  const module = useSplitsModule(splitsAddress);
  const metadata = useSplitsModuleMetadata(splitsAddress);
  const { loading, balances, noBalance, distributeFunds, distributeLoading } =
    useSplitsBalanceAndDistribute(splitsAddress);
  const data = useSplitsData(splitsAddress);

  const { Track } = useTrack({
    page: "splits",
    splits: splitsAddress,
  });

  return (
    <Track>
      <ModuleLayout
        module={module}
        metadata={metadata}
        data={data}
        primaryAction={() => (
          <DistributeButton
            isLoading={distributeLoading}
            distributeFunds={distributeFunds}
            noBalance={noBalance}
          />
        )}
      >
        <Stack spacing={3}>
          <Card>
            <Text size="label.lg" mb="8px">
              Your Balances
            </Text>
            <Text mb="12px">
              This section displays your split of the funds in this module.
              {!loading &&
                noBalance &&
                " There are currently no funds in the module yet to distribute."}
            </Text>
            {loading ? (
              <Stack align="center">
                <Spinner mb="12px" />
              </Stack>
            ) : (
              <Stack direction="row">
                {balances?.map((balance: IBalance) => (
                  <Card as={Stat} key={balance.address} maxWidth="240px">
                    <StatLabel>{balance.symbol}</StatLabel>
                    <StatNumber>{balance.balance}</StatNumber>
                  </Card>
                ))}
              </Stack>
            )}
          </Card>
          <Card>
            <Stack>
              <Text size="label.lg" mb="8px">
                Split Recipients
              </Text>
              {data?.data?.map((split: SplitRecipient) => (
                <Card key={split.address}>
                  <Text>
                    <strong>Address:</strong>{" "}
                    {split.address.toLowerCase() ===
                    THIRDWEB_TREASURY_ADDRESSES[
                      chainId as SupportedChainId
                    ].toLowerCase()
                      ? "thirdweb.eth"
                      : split.address}
                  </Text>
                  <Text>
                    <strong>Percentage:</strong> {split.splitPercentage}%
                  </Text>
                </Card>
              ))}
            </Stack>
          </Card>
        </Stack>
      </ModuleLayout>
    </Track>
  );
};
SplitsPage.Layout = AppLayout;

export default SplitsPage;

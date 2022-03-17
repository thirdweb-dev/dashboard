import {
  useTokenData,
  useTokenModule,
  useTokenModuleMetadata,
} from "@3rdweb-sdk/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { formatUnits } from "@ethersproject/units";
import { AppLayout } from "components/app-layouts/app";
import { TransferModal } from "components/currency/TransferModal";
import { Card } from "components/layout/Card";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { ModuleLayout } from "components/module-pages/module-layout";
import { BigNumber } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiSend } from "react-icons/fi";

const TokenPage: ConsolePage = () => {
  const tokenAddress = useSingleQueryParam("token");
  const module = useTokenModule(tokenAddress);
  const metadata = useTokenModuleMetadata(tokenAddress);
  const data = useTokenData(tokenAddress);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { Track } = useTrack({
    page: "token",
    token: tokenAddress,
  });

  return (
    <Track>
      <TransferModal isOpen={isOpen} onClose={onClose} />
      <ModuleLayout
        module={module}
        metadata={metadata}
        data={data}
        primaryAction={MintButton}
        secondaryAction={
          data.data?.ownedBalance &&
          BigNumber.from(data.data?.ownedBalance.value).gt(0) ? (
            <Button
              colorScheme="purple"
              onClick={onOpen}
              variant="outline"
              rightIcon={<FiSend />}
            >
              Transfer
            </Button>
          ) : undefined
        }
      >
        <Stack spacing={6}>
          <Stack direction="row" spacing={6}>
            <Card as={Stat}>
              <StatLabel>Total Supply</StatLabel>
              <StatNumber>
                {data?.data?.totalSupply
                  ? `${formatUnits(
                      data.data.totalSupply,
                      data.data?.decimals,
                    )} ${data.data?.symbol}`
                  : ""}
              </StatNumber>
            </Card>
            <Card as={Stat}>
              <StatLabel>Owned by you</StatLabel>
              <StatNumber>
                {data.data?.ownedBalance === false
                  ? "N/A"
                  : data.data?.ownedBalance
                  ? `${formatUnits(
                      data.data.ownedBalance.value,
                      data.data?.decimals,
                    )} ${data.data?.symbol}`
                  : `0 ${data.data?.symbol}`}
              </StatNumber>
              {data.data?.ownedBalance === false && (
                <StatHelpText>
                  Connect your wallet to see your balance
                </StatHelpText>
              )}
            </Card>
            <Card as={Stat}>
              <StatLabel>Decimals</StatLabel>
              <StatNumber>{data.data?.decimals}</StatNumber>
            </Card>
          </Stack>
        </Stack>
      </ModuleLayout>
    </Track>
  );
};

TokenPage.Layout = AppLayout;

export default TokenPage;

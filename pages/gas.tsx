import { useGas } from "@3rdweb-sdk/react/hooks/useGas";
import { Flex, Heading, Icon, SimpleGrid, Switch } from "@chakra-ui/react";
import {
  Edition,
  EditionDrop,
  Marketplace,
  NFTCollection,
  NFTDrop,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { GasEstimatorBox } from "components/gas-estimator/GasEstimatorBox";
import { Card } from "components/layout/Card";
import { useTrack } from "hooks/analytics/useTrack";
import { ConsolePage } from "pages/_app";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";

const GasPage: ConsolePage = () => {
  const [ethOrUsd, setEthOrUsd] = useState<"eth" | "usd">("eth");
  const { data } = useGas();
  const { Track } = useTrack({
    page: "gas-estimator",
  });
  console.log(data);

  return (
    <Track>
      <Flex mb={4}>
        <Heading mr={3}>Gas Estimator</Heading>
        <Flex justifyContent="center" alignItems="center">
          <Icon boxSize={6} as={SiEthereum} />
          <Switch
            size="lg"
            mx={1}
            onChange={() => setEthOrUsd(ethOrUsd === "eth" ? "usd" : "eth")}
          />
          <Icon boxSize={6} as={BiDollar} />
        </Flex>
      </Flex>
      <SimpleGrid as={Card} p={0} columns={{ base: 1, md: 4 }}>
        <GasEstimatorBox
          contractType={NFTDrop.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
          borderTopLeftRadius="xl"
        />
        <GasEstimatorBox
          contractType={EditionDrop.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
        />
        <GasEstimatorBox
          contractType={NFTCollection.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
        />
        <GasEstimatorBox
          contractType={Edition.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
          borderTopRightRadius="xl"
        />
        <GasEstimatorBox
          contractType={Token.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
          borderBottomLeftRadius="xl"
        />
        <GasEstimatorBox
          contractType={Split.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
        />
        <GasEstimatorBox
          contractType={Marketplace.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
        />
        <GasEstimatorBox
          contractType={Vote.contractType}
          ethOrUsd={ethOrUsd}
          data={data}
          borderBottomRightRadius="xl"
        />
      </SimpleGrid>
    </Track>
  );
};

GasPage.Layout = AppLayout;

export default GasPage;

import {
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import {
  Edition,
  EditionDrop,
  NFTCollection,
  NFTDrop,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { GasEstimatorBox } from "components/gas-estimator/GasEstimatorBox";
import { useTrack } from "hooks/analytics/useTrack";
import { ConsolePage } from "pages/_app";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";

const GasPage: ConsolePage = () => {
  const [ethOrUsd, setEthOrUsd] = useState<"eth" | "usd">("usd");
  const { Track } = useTrack({
    page: "gas-estimator",
  });

  return (
    <Track>
      <Flex>
        <Heading mb={6} mr={3}>
          Gas Estimator
        </Heading>
        <IconButton
          aria-label="twitter"
          icon={
            <Icon
              boxSize="1.5rem"
              as={ethOrUsd === "eth" ? SiEthereum : BiDollar}
            />
          }
          onClick={() =>
            setEthOrUsd((prevState) => (prevState === "eth" ? "usd" : "eth"))
          }
        />
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
        <GasEstimatorBox
          contractType={NFTDrop.contractType}
          ethOrUsd={ethOrUsd}
        />
        <GasEstimatorBox
          contractType={EditionDrop.contractType}
          ethOrUsd={ethOrUsd}
        />
        <GasEstimatorBox
          contractType={NFTCollection.contractType}
          ethOrUsd={ethOrUsd}
        />
        <GasEstimatorBox
          contractType={Edition.contractType}
          ethOrUsd={ethOrUsd}
        />
        <GasEstimatorBox
          contractType={Token.contractType}
          ethOrUsd={ethOrUsd}
        />
        <GasEstimatorBox
          contractType={Split.contractType}
          ethOrUsd={ethOrUsd}
        />
        <GasEstimatorBox contractType={Vote.contractType} ethOrUsd={ethOrUsd} />
      </SimpleGrid>
    </Track>
  );
};

GasPage.Layout = AppLayout;

export default GasPage;

import { SimpleGrid } from "@chakra-ui/react";
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

const GasPage: ConsolePage = () => {
  const { Track } = useTrack({
    page: "gas-estimator",
  });

  return (
    <Track>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
        <GasEstimatorBox contractType={NFTDrop.contractType} />
        <GasEstimatorBox contractType={EditionDrop.contractType} />
        <GasEstimatorBox contractType={NFTCollection.contractType} />
        <GasEstimatorBox contractType={Edition.contractType} />
        <GasEstimatorBox contractType={Token.contractType} />
        <GasEstimatorBox contractType={Split.contractType} />
        <GasEstimatorBox contractType={Vote.contractType} />
      </SimpleGrid>
    </Track>
  );
};

GasPage.Layout = AppLayout;

export default GasPage;

import type { ConsolePage } from "../../_app";
import { Grid, GridItem } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { Card } from "components/layout/Card";

const CustomContractPage: ConsolePage = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={{ base: 12, md: 8 }}>
        contract metadata will go here
      </GridItem>
      <GridItem as={Card} colSpan={{ base: 12, md: 4 }}>
        actions will go here
      </GridItem>
      <GridItem as={Card} colSpan={{ base: 12 }}>
        analytics / data section
      </GridItem>
      <GridItem as={Card} colSpan={{ base: 12 }}>
        main content table
      </GridItem>
    </Grid>
  );
};

export default CustomContractPage;

CustomContractPage.Layout = AppLayout;

import { Flex, Heading, LinkBox, Stack } from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import React from "react";

interface IDashboardSection {
  title: string;
}

export const DashboardSection: React.FC<IDashboardSection> = ({
  title,

  children,
}) => {
  return (
    <Stack as="section">
      <LinkBox align="center" justify="space-between" as={Flex}>
        <Heading size="lg">{title}</Heading>
      </LinkBox>
      <Card position="relative" width="100%">
        <Stack flexGrow={1} spacing={4} py={4} width="100%">
          {children}
        </Stack>
      </Card>
    </Stack>
  );
};

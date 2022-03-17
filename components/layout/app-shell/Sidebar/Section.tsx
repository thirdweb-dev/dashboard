import { Heading, Stack } from "@chakra-ui/layout";
import React from "react";

interface ISidebarSection {
  title: string;
  slim?: true;
}

export const SidebarSection: React.FC<ISidebarSection> = ({
  title,
  slim,
  children,
}) => {
  return (
    <Stack as="section" spacing={2} p={4} py={slim ? 0 : 4}>
      <Heading size="md">{title}</Heading>
      {children}
    </Stack>
  );
};

import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Text } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

interface LandingIconSectionProps {
  title: ReactNode;
}

export const LandingIconSection: ComponentWithChildren<
  LandingIconSectionProps
> = ({ title, children }) => {
  return (
    <Flex flexDir="column" gap={8}>
      <Text size="body.xl" color="white">
        {title}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {children}
      </SimpleGrid>
    </Flex>
  );
};

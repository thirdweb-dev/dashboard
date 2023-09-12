import { LandingSectionHeading } from "./section-heading";
import { LandingSectionHeadingProps } from "./types";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { Text } from "tw-components";

interface SelectorItem {
  title: string;
  description: string;
  Component: ReactElement;
}

interface LandingDynamicSelectorProps extends LandingSectionHeadingProps {
  items: SelectorItem[];
  gradient?: string;
}

export const LandingDynamicSelector: React.FC<LandingDynamicSelectorProps> = ({
  items,
  title,
  gradient = "linear(to-r, #BFA3DA, #84309C, #C735B0)",
  blackToWhiteTitle,
}) => {
  const [selectedItemTitle, setSelectedItemTitle] = useState(items[0].title);

  const selectedItem =
    items.find((item) => item.title === selectedItemTitle) || items[0];

  return (
    <Flex flexDir="column" gap={8}>
      <LandingSectionHeading
        title={title}
        blackToWhiteTitle={blackToWhiteTitle}
      />
      <SimpleGrid
        borderRadius="xl"
        borderColor="gray.900"
        borderWidth={1}
        columns={12}
        overflow="hidden"
      >
        <GridItem
          as={SimpleGrid}
          columns={1}
          w={{ base: "100%", md: "100%" }}
          colSpan={{ base: 12, md: 4 }}
        >
          {items.map((item, index) => (
            <Flex
              key={index}
              borderColor="gray.900"
              borderWidth={1}
              p={8}
              borderLeft="none"
              _last={{ borderBottom: "none" }}
              _first={{ borderTop: "none" }}
            >
              <Flex
                onClick={() => setSelectedItemTitle(item.title)}
                cursor={{ base: "default", md: "pointer" }}
                pointerEvents={{ base: "none", md: "all" }}
                flexDir="column"
                w="full"
              >
                <Text
                  size="label.lg"
                  bgClip="text"
                  bgGradient={
                    selectedItemTitle === item.title
                      ? gradient
                      : "linear(to-r, #fff, #fff)"
                  }
                  pb={4}
                >
                  {item.title}
                </Text>
                <Text size="body.md">{item.description}</Text>
              </Flex>
            </Flex>
          ))}
        </GridItem>
        <GridItem
          as={Flex}
          display={{ base: "none", md: "inherit" }}
          colSpan={8}
          p={8}
          alignItems="center"
        >
          <Box ml={5}>{selectedItem.Component}</Box>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
};

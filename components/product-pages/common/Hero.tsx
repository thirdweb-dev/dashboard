import { ProductButton } from "./ProductButton";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";
import { Heading } from "tw-components";

interface IHero {
  name: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: StaticImageData;
}

export const Hero: React.FC<PropsWithChildren<IHero>> = ({
  name,
  title,
  description,
  buttonText,
  buttonLink,
  image,
  children,
}) => {
  return (
    <Center w="100%" as="section" bg="#030A19" minHeight="100vh">
      <SimpleGrid
        as={Container}
        maxW="container.page"
        borderRadius={24}
        bg="linear-gradient(147.15deg, #410AB6 30.17%, #FF8D5C 100.01%)"
        columns={{ base: 1, md: 7 }}
        padding={0}
        margin="40px"
        minHeight="578px"
      >
        <Flex
          gridColumnEnd={{ base: undefined, md: "span 4" }}
          padding={{ base: "24px", md: "48px" }}
          bg="rgba(0, 0, 0, 0.5)"
          flexDir="column"
          gap={{ base: 6, md: "32px" }}
          align={{ base: "initial", md: "start" }}
          justify={{ base: "start", md: "center" }}
        >
          <Stack
            direction="row"
            align="center"
            spacing={1}
            opacity={0.8}
            justify={{ base: "center", md: "flex-start" }}
          >
            <Box cursor="default" fontWeight="medium">
              Products
            </Box>
            <Icon as={ChevronRightIcon} />
            <Box cursor="default" fontWeight="medium">
              {name}
            </Box>
          </Stack>
          <Heading
            as="h2"
            fontSize="48px"
            fontWeight="bold"
            size="display.sm"
            textAlign={{ base: "center", md: "left" }}
          >
            {title}
          </Heading>
          <Heading
            as="h3"
            size="subtitle.md"
            color="white"
            opacity={0.8}
            textAlign={{ base: "center", md: "left" }}
          >
            {description}
          </Heading>
          <ProductButton
            mt="32px"
            title={buttonText}
            href={buttonLink}
            bg="linear-gradient(124.38deg, #FF8D5C 10.5%, #410AB6 85.62%) !important"
          />
        </Flex>
        <Center
          padding={{ base: "24px", md: "48px" }}
          gridColumnEnd={{ base: undefined, md: "span 3" }}
        >
          <Flex justifyContent={{ base: "center", md: "flex-end" }} w="100%">
            <ChakraNextImage alt="" maxW={96} w="100%" src={image} />
          </Flex>
        </Center>
      </SimpleGrid>

      {children}
    </Center>
  );
};

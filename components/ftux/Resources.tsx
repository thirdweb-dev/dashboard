import {
  Box,
  Center,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import { FaConnectdevelop } from "react-icons/fa";
import { SiDiscord, SiGithub } from "react-icons/si";

export const Resources: React.FC = () => {
  return (
    <Stack
      display={{ base: "flex", md: "flex" }}
      spacing={0}
      mt="48px"
      width="min(660px, 90vw)"
      alignSelf="center"
      direction="row"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
    >
      <LinkBox>
        <Center
          bg="white"
          padding="20px"
          flexDir="column"
          height={{ base: "80px", md: "120px" }}
          width="calc(min(660px, 90vw) / 3)"
          outline="1px solid #E5E5EA"
          borderRadius="16px 0px 0px 16px"
          _hover={{ bg: "#EFEFEF" }}
          cursor="pointer"
        >
          <Icon as={SiDiscord} boxSize={8} color="discord.400" />
          <LinkOverlay
            isExternal
            href="https://discord.gg/thirdweb"
            textAlign="center"
            color="gray.700"
            mt="4px"
          >
            <Box as="span" display={{ base: "none", md: "inline" }}>
              Join our active community on{" "}
            </Box>
            <Box
              as="span"
              color="discord.400"
              fontWeight="bold"
              display="inline-block"
            >
              Discord
            </Box>
          </LinkOverlay>
        </Center>
      </LinkBox>
      <LinkBox>
        <Center
          bg="white"
          padding="20px"
          flexDir="column"
          height={{ base: "80px", md: "120px" }}
          width="calc(min(660px, 90vw) / 3)"
          outline="1px solid #E5E5EA"
          _hover={{ bg: "#EFEFEF" }}
          cursor="pointer"
        >
          <Icon as={FaConnectdevelop} boxSize={8} color="orange.500" />
          <LinkOverlay
            href="https://portal.thirdweb.com"
            isExternal
            textAlign="center"
            color="gray.700"
            mt="4px"
          >
            <Box as="span" display={{ base: "none", md: "inline" }}>
              Guides and tutorials on the{" "}
            </Box>
            <Box
              as="span"
              color="orange.500"
              fontWeight="bold"
              display="inline-block"
            >
              Portal
            </Box>
          </LinkOverlay>
        </Center>
      </LinkBox>
      <LinkBox>
        <Center
          bg="white"
          padding="20px"
          flexDir="column"
          height={{ base: "80px", md: "120px" }}
          width="calc(min(660px, 90vw) / 3)"
          outline="1px solid #E5E5EA"
          borderRadius="0px 16px 16px 0px"
          _hover={{ bg: "#EFEFEF" }}
          cursor="pointer"
        >
          <Icon as={SiGithub} boxSize={8} color="black" />
          <LinkOverlay
            href="https://github.com/thirdweb-dev"
            isExternal
            textAlign="center"
            color="gray.700"
            mt="4px"
          >
            <Box as="span" display={{ base: "none", md: "inline" }}>
              Open source SDKs and contracts on{" "}
            </Box>
            <Box
              as="span"
              color="black"
              fontWeight="bold"
              display="inline-block"
            >
              Github
            </Box>
          </LinkOverlay>
        </Center>
      </LinkBox>
    </Stack>
  );
};

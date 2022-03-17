import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { VersionSelect } from "components/VersionSelect";
import { useAppContext } from "context/sdk/modules/app-context";
import NextLink from "next/link";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { Logo } from "./Logo";
import { SidebarNavLink } from "./NavLink";
import { SidebarSection } from "./Section";
import { SidebarContractWithSkeleton } from "./SidebarContractWithSkeleton";

export const SideBar: React.FC = () => {
  const { apps, activeApp, isLoading } = useAppContext((c) => c);

  return (
    <Flex flexDirection="column" w="100%" h="100%" align="space-between">
      <Stack flexGrow={1} spacing={4} w="100%" overflow="auto">
        <Logo />
        <SidebarSection slim title="Version">
          <VersionSelect />
        </SidebarSection>
        <SidebarSection title="Apps">
          <Stack spacing={3}>
            {apps?.length ? (
              apps.map((app) => (
                <SidebarContractWithSkeleton
                  key={app.address}
                  contract={app}
                  isActive={app.address === activeApp?.address}
                />
              ))
            ) : (
              <Box p={3}>
                {!apps ? (
                  <HStack>
                    <Spinner size="sm" />
                    <Text
                      opacity={0.5}
                      fontSize="sm"
                      textAlign="center"
                      fontStyle="italic"
                    >
                      Loading apps...
                    </Text>
                  </HStack>
                ) : (
                  <Text
                    opacity={0.5}
                    fontSize="sm"
                    textAlign="center"
                    fontStyle="italic"
                  >
                    You have not created any apps yet.
                  </Text>
                )}
              </Box>
            )}
            <Divider />
            <NextLink href="/create-app" passHref>
              <Button
                textDecor="none!important"
                as={Link}
                colorScheme="teal"
                leftIcon={<Icon as={FiPlusSquare} boxSize={4} />}
              >
                Create New App
              </Button>
            </NextLink>
          </Stack>
        </SidebarSection>
      </Stack>
      <SidebarSection title="Resources">
        <SidebarNavLink href="https://docs.nftlabs.co/" isExternal>
          Documentation
        </SidebarNavLink>
        <SidebarNavLink
          href="https://discord.gg/HNVGKq32GX"
          isExternal={<Icon as={SiDiscord} />}
        >
          Discord
        </SidebarNavLink>
      </SidebarSection>
    </Flex>
  );
};

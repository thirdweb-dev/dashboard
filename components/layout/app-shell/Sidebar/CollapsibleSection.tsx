import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
} from "@chakra-ui/layout";
import {
  Button,
  Collapse,
  Flex,
  Icon,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ModuleType } from "@nftlabs/sdk";
import NextLink from "next/link";
import { useAddModuleLink } from "pages/dashboard/[app]/add-module";
import React from "react";
import { FiChevronDown, FiPlusCircle, FiXOctagon } from "react-icons/fi";

interface ISidebarCollapsibleSection {
  title: string;
  moduleType?: ModuleType;
  isLoading?: boolean;
  isDisabled?: true;
}

interface ISidebarCollapsibleSectionWithItems<T>
  extends ISidebarCollapsibleSection {
  items: T[] | undefined;
  renderItem(item: T, index: number): JSX.Element;
}

export const SidebarCollapsibleSection = <T,>(
  props: ISidebarCollapsibleSection | ISidebarCollapsibleSectionWithItems<T>,
) => {
  const moduleLink = useAddModuleLink(props.moduleType);
  const { isOpen: _isOpen, onToggle } = useDisclosure();
  const isOpen = props.isDisabled ? false : _isOpen;
  return (
    <Stack
      spacing={0}
      // bg={isOpen ? "rgba(255,255,255,.03)" : ""}
      px={3}
      style={{
        marginLeft: "calc(var(--chakra-space-3) * -1)",
        marginRight: "calc(var(--chakra-space-3) * -1)",
      }}
      borderRadius="md"
      transition="all 350ms ease"
    >
      <Button
        position="relative"
        // bg={isOpen ? "rgba(255,255,255,.1)" : undefined}
        // shadow={isOpen ? "xl" : "none"}
        isDisabled={props.isDisabled}
        onClick={onToggle}
        as={Flex}
        h="auto"
        variant="unstyled"
        role="button"
        height="auto"
        flexDir="row"
        display="flex"
        opacity={isOpen ? 1 : 0.8}
        p={3}
        style={{
          marginLeft: "calc(var(--chakra-space-3) * -1)",
          marginRight: "calc(var(--chakra-space-3) * -1)",
        }}
        _hover={props.isDisabled ? undefined : { opacity: 1 }}
        algin="center"
      >
        <Box
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%) translateX(-50%)"
        >
          <Icon
            as={FiChevronDown}
            transform={`rotate(${isOpen ? "0deg" : "-90deg"})`}
            transition="transform 200ms ease"
          />
        </Box>
        <Heading letterSpacing={0.7} size="sm">
          {props.title}
        </Heading>
        <HStack marginLeft="auto" spacing={2}>
          {props.isLoading && <Icon as={Spinner} />}
        </HStack>
      </Button>
      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <Stack spacing={1}>
          {"items" in props && Array.isArray(props.items) ? (
            props.items.map(props.renderItem)
          ) : (
            <Center>
              <HStack opacity={0.5}>
                <Icon as={FiXOctagon} />
                <Text fontSize="sm" fontStyle="italic">
                  No <strong>{props.title}</strong> deployed yet.
                </Text>
              </HStack>
            </Center>
          )}
          {moduleLink && (
            <>
              <Divider opacity={0.15} />
              <NextLink href={moduleLink}>
                <Button
                  textDecor="none!important"
                  as={Link}
                  variant="solid"
                  size="sm"
                  colorScheme="teal"
                  leftIcon={<Icon as={FiPlusCircle} />}
                  textTransform="capitalize"
                >
                  New {props.title} Module
                </Button>
              </NextLink>
            </>
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
};

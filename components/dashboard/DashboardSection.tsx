import {
  Flex,
  Heading,
  Icon,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import NextLink from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface IDashboardSection {
  title: string;
  path?: string;
  isLoading?: boolean;
}

export const DashboardSection: React.FC<IDashboardSection> = ({
  title,
  path,
  isLoading,
  children,
}) => {
  return (
    <Stack as="section">
      <LinkBox align="center" justify="space-between" as={Flex}>
        <Heading size="lg">{title}</Heading>
        {path && (
          <NextLink href={`/dashboard${path}`} passHref>
            <LinkOverlay>
              <IconButton
                variant="ghost"
                aria-label={`navigate to /dashboard${path}`}
                icon={<Icon h={8} w={8} as={FiChevronRight} />}
              />
            </LinkOverlay>
          </NextLink>
        )}
      </LinkBox>
      <Card position="relative" width="100%">
        {isLoading && (
          <Spinner size="sm" position="absolute" top={4} right={4} />
        )}
        <Stack flexGrow={1} spacing={4} py={4} width="100%">
          {children}
        </Stack>
      </Card>
    </Stack>
  );
};

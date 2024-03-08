import { Flex, UnorderedList, ListItem, Box } from "@chakra-ui/react";
import { LinkButton, Text, Card, Badge, Heading } from "tw-components";
import { CreditsRecord } from "./ApplyForOpCreditsModal";

interface PlanCardProps {
  creditsRecord: CreditsRecord;
}

export const PlanCard: React.FC<PlanCardProps> = ({ creditsRecord }) => {
  return (
    <Card as={Flex} justifyContent="space-between" flexDir="column" gap={2}>
      <Flex flexDir="column" gap={2}>
        <Box>
          <Badge
            borderRadius="full"
            size="label.sm"
            px={3}
            bgColor={creditsRecord.color}
          >
            <Text color="#fff" textTransform="capitalize" fontWeight="bold">
              {creditsRecord.title}
            </Text>
          </Badge>
        </Box>
        <Flex flexDir="column" gap={1}>
          <Heading color="bgBlack" size="title.md" fontWeight="extrabold">
            {creditsRecord.credits}
          </Heading>
          <Text letterSpacing="wider" fontWeight="bold" color="faded">
            GAS CREDITS
          </Text>
        </Flex>
        {creditsRecord.features && (
          <UnorderedList>
            {creditsRecord.features.map((feature) => (
              <Text as={ListItem} key={feature}>
                {feature}
              </Text>
            ))}
          </UnorderedList>
        )}
      </Flex>
      {creditsRecord.ctaTitle && creditsRecord.ctaHref && (
        <LinkButton
          href={creditsRecord.ctaHref}
          colorScheme="blue"
          size="sm"
          variant="outline"
          isExternal
        >
          {creditsRecord.ctaTitle}
        </LinkButton>
      )}
    </Card>
  );
};

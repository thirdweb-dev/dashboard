import { Flex, Switch, SwitchProps, Tooltip } from "@chakra-ui/react";
import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { Card, Text, Badge, TrackedLink } from "tw-components";

interface GatedSwitchProps extends SwitchProps {
  trackingLabel?: string;
}

export const GatedSwitch: React.FC<GatedSwitchProps> = ({
  isChecked,
  isDisabled,
  trackingLabel,
  ...props
}: GatedSwitchProps) => {
  const meQuery = useAccount();
  const { data: account } = meQuery;

  if (!account) {
    return null;
  }

  return (
    <Tooltip
      closeDelay={1000}
      isDisabled={!!account.advancedEnabled}
      p={0}
      bg="transparent"
      boxShadow="none"
      pointerEvents="all"
      label={
        <Card py={2} px={4} bgColor="backgroundHighlight">
          <Text size="body.md">
            To access this feature, you need to upgrade to the{" "}
            <TrackedLink
              textAlign="center"
              href="/settings/billing"
              category="advancedFeature"
              label={trackingLabel}
              color="blue.500"
              fontWeight="medium"
            >
              Growth plan
            </TrackedLink>
            .
          </Text>
        </Card>
      }
    >
      <Flex flexDir="row" gap={2}>
        {!account.advancedEnabled && (
          <Badge
            textTransform="capitalize"
            px={2}
            rounded="md"
            color="blue.500"
          >
            Growth
          </Badge>
        )}
        <Switch
          isChecked={!account.advancedEnabled ? false : isChecked}
          isDisabled={!account.advancedEnabled ? true : isDisabled}
          {...props}
        />
      </Flex>
    </Tooltip>
  );
};

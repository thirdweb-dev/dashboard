import { Text, Tooltip } from "@chakra-ui/react";

export const parseDescription = (description?: string) => (
  <Tooltip
    label={
      <Text whiteSpace="pre-wrap" color="inherit" p={2} borderRadius="xl">
        {description}
      </Text>
    }
    openDelay={500}
  >
    <Text whiteSpace="pre-wrap" noOfLines={6}>
      {description}
    </Text>
  </Tooltip>
);

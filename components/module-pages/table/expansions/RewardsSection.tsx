import { usePackRewards } from "@3rdweb-sdk/react";
import { PackModule } from "@3rdweb/sdk";
import { Flex, Image, Stack, Text } from "@chakra-ui/react";

interface IRewardsSection {
  tokenId: string;
  module?: PackModule;
}

export const RewardsSection: React.FC<IRewardsSection> = ({
  tokenId,
  module,
}) => {
  const { data } = usePackRewards(module?.address, tokenId);

  return (
    <Stack spacing={6} maxW="80vw">
      <Flex flexWrap="wrap">
        {data?.map((reward) => (
          <Flex
            key={reward.metadata.id}
            borderRadius="md"
            margin="8px"
            padding="8px"
            minWidth="400px"
            width="calc(50% - 16px)"
            border="1px solid #EAEAEA"
          >
            <Image
              width="100px"
              src={reward.metadata.image}
              borderRadius="md"
            />
            <Flex direction="column" justify="space-between" ml="12px">
              <Stack>
                <Text size="label.lg">{reward.metadata.name}</Text>
                <Text fontSize="14px" color="gray.500">
                  {reward.metadata.description}
                </Text>
              </Stack>
              <Text>
                <strong>Supply:</strong> {reward.supply.toNumber()}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
};

import { ModuleType } from "@3rdweb/sdk";
import { Box, Heading, Stack, Text, Tooltip } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import useAddModuleContext from "contexts/AddModuleContext";

interface IModuleButton {
  moduleType: ModuleType;
  moduleButtonInfo: any;
  onClick: () => void;
}

export const ModuleButton: React.FC<IModuleButton> = ({
  moduleType,
  moduleButtonInfo,
  onClick,
}) => {
  const { selectedModule } = useAddModuleContext();
  const isActive = selectedModule === moduleType;

  return (
    <Tooltip label={moduleButtonInfo?.label}>
      <Stack
        padding="20px"
        width="350px"
        height="160px"
        borderRadius="md"
        outline={isActive ? "3px solid" : "1px solid"}
        outlineColor={isActive ? "primary.500" : "#EAEAEA"}
        onClick={onClick}
        cursor="pointer"
        background="white"
        justify="space-between"
        boxSizing="border-box"
        _hover={{
          outlineColor: isActive ? "primary.500" : "#EAEAEA",
        }}
        userSelect="none"
        position="relative"
      >
        {moduleButtonInfo?.image && (
          <Box>
            <ChakraNextImage
              boxSize="40px"
              src={moduleButtonInfo?.image}
              alt={moduleButtonInfo?.name}
            />
          </Box>
        )}
        <Stack ml={4} flexDirection="column">
          <Heading size="title.sm">{moduleButtonInfo?.name}</Heading>
          <Text size="body.md" color="gray.700" mt="4px">
            {moduleButtonInfo?.description}
          </Text>
        </Stack>
        {/* <Text
          position="absolute"
          top="4px"
          right="4px"
          bg="green.50"
          borderRadius="2px"
          color="green.900"
          px="4px"
        >
          {moduleButtonInfo?.standard}
        </Text> */}
      </Stack>
    </Tooltip>
  );
};

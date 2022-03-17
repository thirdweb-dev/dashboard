import { Button, Heading, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { FiInfo, FiSave } from "react-icons/fi";

interface IModuleSetting {
  heading: string;
  description: string;
  info?: JSX.Element;
  isLoading?: boolean;
  canSave?: boolean;
  isSaving?: boolean;
  isDisabled?: boolean;
  onSave?: () => void;
}

export const ModuleSetting: React.FC<IModuleSetting> = ({
  heading,
  description,
  info,
  canSave,
  isLoading,
  isSaving,
  isDisabled,
  onSave,
  children,
}) => {
  return (
    <Card position="relative" pb={canSave ? "72px" : undefined}>
      <Stack spacing={3}>
        <Stack spacing={2} mb="12px">
          <Stack spacing={1}>
            <Heading size="heading.sm">{heading}</Heading>
            <Text>{description}</Text>
          </Stack>
          {info && (
            <Stack
              direction="row"
              bg="blue.50"
              borderRadius="md"
              borderWidth="1px"
              borderColor="blue.100"
              align="center"
              padding="10px"
              spacing={3}
            >
              <Icon as={FiInfo} color="blue.400" boxSize={6} />
              <Text color="blue.800">{info}</Text>
            </Stack>
          )}
        </Stack>

        {isLoading ? (
          <Stack width="100%" align="center">
            <Spinner />
          </Stack>
        ) : (
          <>{children}</>
        )}
      </Stack>

      {canSave && (
        <Button
          borderRadius="0px 0px 6px 6px"
          position="absolute"
          bottom="0px"
          left="0px"
          width="100%"
          isLoading={isSaving}
          isDisabled={isDisabled}
          onClick={onSave}
          leftIcon={<FiSave />}
          colorScheme="blue"
        >
          Save
        </Button>
      )}
    </Card>
  );
};

import { usePaymentsUploadKybFile } from "@3rdweb-sdk/react/hooks/usePayments";
import { Box, Flex } from "@chakra-ui/react";
import { FileInput } from "components/shared/FileInput";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { Button } from "tw-components";

export const KybFileUploader: React.FC = () => {
  const form = useForm<{ file: File }>();
  const { mutate: uploadKybFile } = usePaymentsUploadKybFile();
  const trackEvent = useTrack();

  const { onSuccess, onError } = useTxNotifications(
    "Successfully uploaded file",
    "Failed to uplod file",
  );

  return (
    <Flex
      as="form"
      flexDir={{ base: "column", md: "row" }}
      gap={4}
      alignItems="center"
      onSubmit={form.handleSubmit((data) => {
        trackEvent({
          category: "payments",
          action: "upload-kyb-file",
          label: "attempt",
        });
        uploadKybFile(
          {
            file: data.file,
          },
          {
            onSuccess: () => {
              onSuccess();
              trackEvent({
                category: "payments",
                action: "upload-kyb-file",
                label: "success",
              });
            },
            onError: (error) => {
              onError(error);
              trackEvent({
                category: "payments",
                action: "upload-kyb-file",
                label: "error",
                error,
              });
            },
          },
        );
      })}
    >
      <Box width={40}>
        <FileInput
          accept={{ "image/*": [] }}
          value={form.watch("file")}
          setValue={(file) => form.setValue("file", file)}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          transition="all 200ms ease"
          _hover={{ shadow: "sm" }}
          helperText="Document"
        />
      </Box>
      <Button type="submit" colorScheme="primary">
        Secure Upload
      </Button>
    </Flex>
  );
};

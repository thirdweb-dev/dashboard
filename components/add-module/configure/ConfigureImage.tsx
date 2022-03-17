import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { FileInput } from "components/shared/FileInput";
import useAddModuleContext from "contexts/AddModuleContext";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";

export const ConfigureImage: React.FC = () => {
  const { setValue, watch, errors } = useAddModuleContext();
  const imageUrl = useImageFileOrUrl(watch("image"));

  return (
    <FormControl isInvalid={!!errors.image}>
      <FormLabel>Image</FormLabel>
      <FileInput
        accept="image/*"
        value={imageUrl}
        setValue={(file) => setValue("image", file)}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        transition="all 200ms ease"
        _hover={{ shadow: "sm" }}
      />
      <FormErrorMessage>{errors?.image?.message}</FormErrorMessage>
    </FormControl>
  );
};

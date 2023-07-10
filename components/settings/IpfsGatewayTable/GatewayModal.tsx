import {
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  IpfsGatewayInfo,
  useGetCustomIpfsGateways,
} from "hooks/useGetCustomIpfsGateways";
import { useTxNotifications } from "hooks/useTxNotifications";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Button, FormErrorMessage, FormLabel } from "tw-components";

const validateURL = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const validateUniqueURL = (urls: string[]) => (value: string) => {
  const formattedValue = value.endsWith("/") ? value : value + "/";
  const isUnique = !urls.includes(formattedValue);
  const isValidURL = validateURL(formattedValue);
  if (!isUnique) {
    return "URL already exists";
  }
  if (!isValidURL) {
    return "Invalid URL";
  }
  return true;
};

type IpfsGatewayModalProps = {
  open: boolean;
  gateway?: IpfsGatewayInfo;
  setGateways: Dispatch<SetStateAction<IpfsGatewayInfo[]>>;
  onClose: () => void;
};

export const IpfsGatewayModal: React.FC<IpfsGatewayModalProps> = ({
  open,
  onClose,
  gateway,
  setGateways,
}) => {
  const initialLabel = gateway?.label ?? "New IPFS gateway";
  const initialUrl = gateway?.url ?? "";
  const currentIpfsGateways = useGetCustomIpfsGateways();
  const filteredIpfsGateways = currentIpfsGateways.filter((item) => {
    // When adding new gateway, we compare the new item against all items in `currentIpfsGateways`
    // Otherwise in case of updating gateway, first we need to remove the old one
    if (gateway) return item.url !== gateway.url;
    return true;
  });
  const { onSuccess, onError } = useTxNotifications(
    "Custom gateway updated",
    "Failed to update the custom gateway",
  );

  const form = useForm<IpfsGatewayInfo>({
    values: {
      label: initialLabel,
      url: initialUrl,
    },
  });

  const handleSubmit = form.handleSubmit(({ label, url }) => {
    if (!url.endsWith("/")) url += "/"; // Add trailing slash (for consistency)
    const newCustomGateways = filteredIpfsGateways.concat({ label, url });
    window.localStorage.setItem(
      "tw-settings-ipfs-gateways",
      JSON.stringify(newCustomGateways),
    );
    setGateways(newCustomGateways);
    onSuccess();
    handleClose();
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => form.reset(), 300);
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />

      <ModalContent borderRadius="xl">
        <ModalHeader>{gateway ? "Edit" : "Add new"} custom gateway</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl
              isRequired
              isInvalid={!!form.getFieldState("label", form.formState).error}
            >
              <FormLabel>Label</FormLabel>
              <Input
                autoComplete="off"
                placeholder="eth wallet SDK"
                type="text"
                {...form.register("label", { required: true })}
              />
              <FormErrorMessage>
                {form.getFieldState("label", form.formState).error?.message}
              </FormErrorMessage>

              <FormLabel marginTop={12}>URL</FormLabel>
              <Input
                autoComplete="off"
                placeholder="https://.../ipfs/"
                type="text"
                {...form.register("url", {
                  required: true,
                  validate: validateUniqueURL(
                    filteredIpfsGateways.map((item) => item.url),
                  ),
                })}
              />
              <FormErrorMessage>
                {form.getFieldState("url", form.formState).error?.message}
              </FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

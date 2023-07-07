import { ApiKeyDetails } from "./Details";
import { ApiKeyKeyForm } from "./KeyForm";
import { RevokeApiKeyButton } from "./RevokeButton";
import { ApiKeyFormValues, DrawerSection } from "./types";
import { ApiKey, useUpdateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { HStack } from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Drawer } from "tw-components";
import { fromArrayToList, toArrFromList } from "utils/string";

interface ApiKeyDrawerProps {
  apiKey: ApiKey;
  open: boolean;
  onClose: () => void;
  onSubmit: (apiKey: ApiKey) => void;
}
export const ApiKeyDrawer: React.FC<ApiKeyDrawerProps> = ({
  apiKey,
  open,
  onClose,
  onSubmit,
}) => {
  const { id, name, domains, walletAddresses, services } = apiKey;
  const [editing, setEditing] = useState(false);
  const mutation = useUpdateApiKey();
  const [selectedSection, setSelectedSection] = useState(DrawerSection.General);

  const form = useForm<ApiKeyFormValues>({
    values: {
      name,
      domains: fromArrayToList(domains),
      walletAddresses: fromArrayToList(walletAddresses),
      services: (services || []).map((srv) => ({
        ...srv,
        contractAddresses: fromArrayToList(srv.contractAddresses),
      })),
    },
  });

  const { onSuccess, onError } = useTxNotifications(
    "API Key updated",
    "Failed to update an API Key",
  );

  const handleSubmit = form.handleSubmit((values) => {
    const formattedValues = {
      id,
      name: values.name,
      domains: toArrFromList(values.domains),
      walletAddresses: toArrFromList(values.walletAddresses),
      services: (values.services || []).map((srv) => ({
        ...srv,
        contractAddresses: toArrFromList(srv.contractAddresses),
      })),
    };

    mutation.mutate(formattedValues, {
      onSuccess: (data) => {
        onSubmit(data);
        onSuccess();
        setEditing(false);
      },
      onError,
    });
  });

  const renderActions = () => {
    if (!editing) {
      return (
        <>
          <RevokeApiKeyButton id={id} name={name} onRevoke={onClose} />
          <Button colorScheme="primary" onClick={() => setEditing(true)} w={24}>
            Edit
          </Button>
        </>
      );
    }
    return (
      <>
        <Button
          colorScheme="secondary"
          variant="link"
          onClick={() => setEditing(false)}
        >
          Cancel
        </Button>

        <Button colorScheme="primary" onClick={handleSubmit} w={24}>
          Save
        </Button>
      </>
    );
  };

  useEffect(() => {
    setEditing(false);
  }, [apiKey]);

  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      onClose={onClose}
      isOpen={open}
      size="md"
      header={{ children: name }}
      footer={{
        children: (
          <HStack justifyContent="space-between" w="full">
            {renderActions()}
          </HStack>
        ),
      }}
    >
      {!editing ? (
        <ApiKeyDetails
          apiKey={apiKey}
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
      ) : (
        <ApiKeyKeyForm
          form={form}
          onSubmit={handleSubmit}
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
      )}
    </Drawer>
  );
};

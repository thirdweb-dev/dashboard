import {
  useIsAdmin,
  useModuleTypeOfModule,
  useSaleRecipient,
  useSetSaleRecipientMutation,
} from "@3rdweb-sdk/react";
import {
  BundleDropModule,
  DropModule,
  ModuleType,
  NFTModule,
} from "@3rdweb/sdk";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { parseErrorToMessage } from "utils/errorParser";
import { ModuleSetting } from "./ModuleSetting";

interface ISaleRecipient {
  module?: DropModule | BundleDropModule | NFTModule;
  tokenId?: string;
}

export const SaleRecipient: React.FC<ISaleRecipient> = ({
  module,
  tokenId,
}) => {
  const toast = useToast();
  const type = useModuleTypeOfModule(module);
  const { data: saleRecipient, isLoading: isRecipientLoading } =
    useSaleRecipient(module, tokenId);
  const { mutate: setSaleRecipient, isLoading: isSettingRecipient } =
    useSetSaleRecipientMutation(module, tokenId);
  const [saleRecipientAddress, setSaleRecipientAddress] = useState("");
  const isAdmin = useIsAdmin(module);

  useEffect(() => {
    if (saleRecipient) {
      setSaleRecipientAddress(saleRecipient);
    }
  }, [saleRecipient]);

  const saveSaleRecipient = async () => {
    setSaleRecipient(saleRecipientAddress, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Sale recipient set succesfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error setting sale recipient",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  const isDefault = type === ModuleType.BUNDLE_DROP && !tokenId;

  return (
    <ModuleSetting
      heading={`${isDefault ? "Default " : ""} Sales Settings`}
      description={
        isDefault
          ? "Set the default sales recipient for all of your token drops."
          : `Control the sales of ${tokenId ? "this token" : "your module"}.`
      }
      isLoading={isRecipientLoading}
      canSave={isAdmin}
      isSaving={isSettingRecipient}
      isDisabled={
        !isAddress(saleRecipientAddress) ||
        saleRecipientAddress === saleRecipient
      }
      onSave={saveSaleRecipient}
    >
      <FormControl>
        <Heading as={FormLabel} size="label.md">
          {`${isDefault ? "Default " : ""} Sale Recipient`}
        </Heading>
        <Input
          value={saleRecipientAddress}
          onChange={(e) => setSaleRecipientAddress(e.target.value)}
        />
      </FormControl>
    </ModuleSetting>
  );
};

import { TransferableModule, useTransferRestricted } from "@3rdweb-sdk/react";
import { Role } from "@3rdweb/sdk";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ModulePermission } from "../ModulePermission";

interface ITransferRole {
  module?: TransferableModule;
  role: Role;
  description: string;
}

export const TransferRole: React.FC<ITransferRole> = ({
  role,
  description,
  module,
}) => {
  const { watch, setValue } = useFormContext();
  const data = useTransferRestricted(module);

  useEffect(() => {
    if (data.data !== undefined) {
      setValue("transferIsRestricted", {
        original: data.data,
        current: data.data,
      });
    }
  }, [data.data, setValue]);

  const changeSetting = () => {
    setValue(
      "transferIsRestricted.current",
      !watch("transferIsRestricted.current"),
    );
  };

  return (
    <ModulePermission
      role={role}
      description={description}
      module={module}
      isEveryone={!watch("transferIsRestricted.current")}
      changeIsEveryone={changeSetting}
      info={
        watch("transferIsRestricted.current") ? (
          <>
            This module currently has <strong>restricted</strong> transfer. Only
            the following wallets will be able to transfer tokens:
          </>
        ) : (
          <>
            This module currently has <strong>non-restricted</strong> transfer,
            meaning that anyone is free to transfer tokens.
          </>
        )
      }
    />
  );
};

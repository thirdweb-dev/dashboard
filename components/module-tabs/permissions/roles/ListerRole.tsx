import { useIsMarketplaceRestricted } from "@3rdweb-sdk/react/hooks/useMarketplace";
import { MarketplaceModule, Role } from "@3rdweb/sdk";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ModulePermission } from "../ModulePermission";

interface IListerRole {
  role: Role;
  description: string;
  module?: MarketplaceModule;
}

export const ListerRole: React.FC<IListerRole> = ({
  role,
  description,
  module,
}) => {
  const { watch, setValue } = useFormContext();
  const data = useIsMarketplaceRestricted(module);

  useEffect(() => {
    if (data.data !== undefined) {
      setValue("listerIsRestricted", {
        original: data.data,
        current: data.data,
      });
    }
  }, [data.data, setValue]);

  const changeSetting = () => {
    setValue(
      "listerIsRestricted.current",
      !watch("listerIsRestricted.current"),
    );
  };

  return (
    <ModulePermission
      role={role}
      description={description}
      module={module}
      isEveryone={!watch("listerIsRestricted.current")}
      changeIsEveryone={changeSetting}
      info={
        watch("listerIsRestricted.current") ? (
          <>
            This marketplace is currently restricted to only specified listers.
            Only the following wallets will be able to create new listings.:
          </>
        ) : (
          <>
            This marketplace is currenly open for anyone to create new listings.
          </>
        )
      }
    />
  );
};

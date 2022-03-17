import {
  TransferableModule,
  useIsAdmin,
  useModuleRoleMembersList,
  useSetAllRoleMembersMutation,
  useTransferRestrictedMutation,
} from "@3rdweb-sdk/react";
import { useSetIsMarketplaceRestricted } from "@3rdweb-sdk/react/hooks/useMarketplace";
import {
  MarketplaceModule,
  ModuleWithRoles,
  Role,
  SetAllRoles,
} from "@3rdweb/sdk";
import { Button, Icon, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiInfo } from "react-icons/fi";
import { parseErrorToMessage } from "utils/errorParser";
import { ModulePermission } from "./ModulePermission";
import { ListerRole } from "./roles/ListerRole";
import { TransferRole } from "./roles/TransferRole";

interface IModulePermissions {
  module?: ModuleWithRoles;
  saveDisabled?: boolean;
  nextStep?: () => void;
}

const ROLE_DESCRIPTION_MAP: Partial<Record<Role, string>> = {
  admin:
    "Determine who can modify module settings and granting and revoke roles.",
  minter: "Determine who can mint new tokens on this module.",
  pauser:
    "Determine who can pause (and unpause) all external calls made to this module's contract.",
  transfer: "Determine who can transfer this module's tokens.",
  lister: "Determine who can create new listings on this module.",
  asset:
    "Determine what assets can be listed on this marketplace. (Add the zero-address to allow any asset to be listed.)",
};

export const ModulePermissions: React.FC<IModulePermissions> = ({
  module,
  saveDisabled,
  nextStep,
}) => {
  const toast = useToast();
  const isAdmin = useIsAdmin(module);
  const methods = useForm();
  const { watch, handleSubmit, setValue } = methods;
  const { data, isLoading } = useModuleRoleMembersList(module);
  const membersMutation = useSetAllRoleMembersMutation(module);
  const listerRestrictedMutation = useSetIsMarketplaceRestricted(
    module as MarketplaceModule,
  );
  const transferRestrictedMutation = useTransferRestrictedMutation(
    module as TransferableModule,
  );

  const listerRestriction = watch("listerIsRestricted");
  const transferRestriction = watch("transferIsRestricted");

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([role, members]) => {
        setValue(role, members);
      });
    }
  }, [data, setValue]);

  const roles = useMemo(() => {
    if (!data) {
      return [];
    }

    return Object.keys(data) as Role[];
  }, [data]);

  const isDataLoading =
    !data ||
    !Object.keys({ ...watch() }).some((role) =>
      Object.keys(data).includes(role),
    );

  const unchanged = [
    isDataLoading ||
      (Object.keys(data) as Role[])
        .map((role: Role) => {
          if (data[role]?.length !== watch(role)?.length) {
            return false;
          }

          const lowerCaseData = watch(role).map((address: string) =>
            address.toLowerCase(),
          );
          return (data[role] as string[]).every((address) =>
            lowerCaseData.includes(address.toLowerCase()),
          );
        })
        .every((isEqual) => isEqual),
    !listerRestriction ||
      listerRestriction.original === listerRestriction.current,
    !transferRestriction ||
      transferRestriction.original === transferRestriction.current,
  ];

  const isDisabled = unchanged.every((isUnchanged) => isUnchanged);
  const transactions = unchanged.filter((isUnchanged) => !isUnchanged).length;

  const onSubmit = async (permissionsData: any) => {
    if (isDisabled || !data) {
      return;
    }

    const rolesWithPermissions: SetAllRoles = {};
    const { transferIsRestricted, listerIsRestricted, ...permissions } =
      permissionsData;
    (Object.entries(permissions) as [Role, string[]][]).forEach(
      ([role, members]) => {
        rolesWithPermissions[role] = members;
      },
    );

    try {
      if (
        listerIsRestricted &&
        listerIsRestricted.original !== listerIsRestricted.current
      ) {
        await listerRestrictedMutation.mutateAsync(listerIsRestricted.current);
      }

      if (
        transferIsRestricted &&
        transferIsRestricted.original !== transferIsRestricted.current
      ) {
        await transferRestrictedMutation.mutateAsync(
          transferIsRestricted.current,
        );
      }

      await membersMutation.mutateAsync(rolesWithPermissions);

      toast({
        title: "Success",
        description: "Permissions succesfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (nextStep) {
        nextStep();
      }
    } catch (err) {
      toast({
        title: "Error updating permissions",
        description: parseErrorToMessage(err),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      if (nextStep) {
        nextStep();
      }
    }
  };

  if (isLoading) {
    return (
      <Card position="relative">
        <Stack spacing={3} align="center">
          <Spinner />
        </Stack>
      </Card>
    );
  }

  return (
    <FormProvider {...methods}>
      <form id="permissions-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {!isDisabled && !saveDisabled && (
            <Stack
              direction="row"
              bg="orange.50"
              borderWidth="1px"
              borderColor="orange.100"
              borderRadius="md"
              align="center"
              padding="10px"
              spacing={3}
            >
              <Icon as={FiInfo} color="orange.400" boxSize={6} />
              <Text color="orange.800">
                You have unsaved changes to this module&apos;s permissions.
                <br />
                Make sure to save your changes before leaving this page.
              </Text>
            </Stack>
          )}
          {roles.map((role) => (
            <PermissionSection key={role} role={role} module={module} />
          ))}
          {isAdmin && !saveDisabled && (
            <Stack spacing={1}>
              <Button
                type="submit"
                form="permissions-form"
                colorScheme="primary"
                borderRadius="md"
                isLoading={
                  membersMutation.isLoading ||
                  listerRestrictedMutation.isLoading ||
                  transferRestrictedMutation.isLoading
                }
                isDisabled={isDisabled}
              >
                Save Permissions
              </Button>
              {transactions > 1 && (
                <Text size="body.sm" color="gray.600" alignSelf="center">
                  You will be prompted to approve {transactions} transactions
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
};

interface IPermissionSection {
  role: Role;
  module?: ModuleWithRoles;
}

const PermissionSection: React.FC<IPermissionSection> = ({ role, module }) => {
  switch (role) {
    case "transfer":
      return (
        <TransferRole
          role={role}
          module={module as TransferableModule}
          description={ROLE_DESCRIPTION_MAP[role] as string}
        />
      );
    case "lister":
      return (
        <ListerRole
          role={role}
          module={module as MarketplaceModule}
          description={ROLE_DESCRIPTION_MAP[role] as string}
        />
      );
    default:
      return (
        <ModulePermission
          role={role}
          module={module}
          description={ROLE_DESCRIPTION_MAP[role] as string}
        />
      );
  }
};

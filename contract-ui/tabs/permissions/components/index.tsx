import { ContractPermission } from "./contract-permission";
import { ButtonGroup, Flex } from "@chakra-ui/react";
import { useAllRoleMembers, useSetAllRoleMembers } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { ROLE_DESCRIPTION_MAP } from "constants/mappings";
import { ContractWithRoles } from "contract-ui/types/types";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "tw-components";

export type PermissionFormContext = Record<string, string[]>;

export const Permissions = <TContract extends ContractWithRoles>({
  contract,
}: {
  contract: TContract;
}) => {
  /*   const contractConstructor = useContractConstructor(contract); */
  /*   const roles =
    contractConstructor && "contractRoles" in contractConstructor
      ? contractConstructor.contractRoles
      : []; */

  const allRoleMembers = useAllRoleMembers(contract as SmartContract);
  const setAllRoleMembers = useSetAllRoleMembers(contract as SmartContract);
  console.log(allRoleMembers.data);
  console.log(allRoleMembers.data);
  const form = useForm<PermissionFormContext>({});

  useEffect(() => {
    if (allRoleMembers.data && !form.formState.isDirty) {
      form.reset(allRoleMembers.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRoleMembers.data]);

  const { onSuccess, onError } = useTxNotifications(
    "Permissions updated",
    "Failed to update permissions",
  );

  return (
    <FormProvider {...form}>
      <Flex
        gap={4}
        direction="column"
        as="form"
        onSubmit={form.handleSubmit((d) =>
          setAllRoleMembers.mutateAsync(d, {
            onSuccess: (_data, variables) => {
              form.reset(variables);
              onSuccess();
            },
            onError,
          }),
        )}
      >
        {Object.keys(allRoleMembers.data || []).map((role) => {
          return (
            <PermissionSection
              isLoading={allRoleMembers.isLoading}
              key={role}
              role={role}
              contract={contract}
            />
          );
        })}
        <ButtonGroup justifyContent="flex-end">
          <Button
            borderRadius="md"
            isDisabled={
              !allRoleMembers.data ||
              setAllRoleMembers.isLoading ||
              !form.formState.isDirty
            }
            onClick={() => form.reset(allRoleMembers.data)}
          >
            Reset
          </Button>
          <TransactionButton
            colorScheme="primary"
            transactionCount={1}
            isDisabled={!form.formState.isDirty}
            type="submit"
            isLoading={setAllRoleMembers.isLoading}
            loadingText="Saving permissions ..."
          >
            Update permissions
          </TransactionButton>
        </ButtonGroup>
      </Flex>
    </FormProvider>
  );
};

export const PermissionSection = <TContract extends ContractWithRoles>({
  role,
  contract,
  isLoading,
}: {
  contract: TContract;
  role: string;
  isLoading: boolean;
}) => {
  return (
    <ContractPermission
      role={role}
      isLoading={isLoading}
      contract={contract}
      /*       description={ROLE_DESCRIPTION_MAP[role]} */
      description={""}
    />
  );
};

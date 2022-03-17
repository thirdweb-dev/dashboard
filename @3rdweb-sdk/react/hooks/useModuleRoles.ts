import { useWeb3 } from "@3rdweb/hooks";
import { ModuleWithRoles, Role, SetAllRoles } from "@3rdweb/sdk";
import invariant from "ts-invariant";
import { moduleRoleKeys } from "../cache-keys";
import { EitherBaseModuleType } from "../types";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";

export function useModuleRoleMembersList(module?: ModuleWithRoles) {
  return useQueryWithNetwork(
    moduleRoleKeys.list(module?.address),
    () => module?.getAllRoleMembers(),
    {
      enabled: !!module && !!module.address,
    },
  );
}

export function useModuleRoleMembers(role: Role, module?: ModuleWithRoles) {
  return useQueryWithNetwork(
    moduleRoleKeys.detail(module?.address, role),
    () => module?.getRoleMembers(role),
    {
      enabled: !!module && !!module.address && !!role,
    },
  );
}

export function useSetAllRoleMembersMutation(module?: ModuleWithRoles) {
  return useMutationWithInvalidate(
    async (rolesWithAddresses: SetAllRoles) => {
      invariant(module, "module is required");
      await module.setAllRoleMembers(rolesWithAddresses);
    },
    {
      onSuccess: (_data, variables, _options, invalidate) => {
        return invalidate([moduleRoleKeys.list(module?.address)]);
      },
    },
  );
}

export function useAddRoleMemberMutation(module?: ModuleWithRoles) {
  return useMutationWithInvalidate(
    async (variables: { role: Role; address: string }) => {
      invariant(module, "module is required");
      await module.grantRole(variables.role, variables.address);
    },
    {
      onSuccess: (_data, variables, _options, invalidate) => {
        return invalidate([
          moduleRoleKeys.list(module?.address),
          moduleRoleKeys.detail(module?.address, variables.role),
        ]);
      },
    },
  );
}

export function useRemoveRoleMemberMutation(module?: ModuleWithRoles) {
  return useMutationWithInvalidate(
    async (variables: { role: Role; address: string }) => {
      invariant(module, "module is required");
      await module.revokeRole(variables.role, variables.address);
    },
    {
      onSuccess: (_data, variables, _options, invalidate) => {
        return invalidate([
          moduleRoleKeys.list(module?.address),
          moduleRoleKeys.detail(module?.address, variables.role),
        ]);
      },
    },
  );
}

export function useIsAccountRole(
  role: Role,
  module?: EitherBaseModuleType,
  account?: string,
): boolean {
  const isModuleWithRoles = module && "roles" in module;
  const { data } = useModuleRoleMembers(
    role,
    isModuleWithRoles ? module : undefined,
  );

  if (isModuleWithRoles === false) {
    return true;
  }

  return !!(account && data?.includes(account));
}

export function useIsAdmin(module?: EitherBaseModuleType) {
  const { address } = useWeb3();
  return useIsAccountRole("admin", module, address);
}

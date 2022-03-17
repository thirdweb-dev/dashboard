import { CommonModuleMetadata, Module } from "@3rdweb/sdk";
import invariant from "ts-invariant";
import { moduleKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";

export function useModuleMetadata(module?: Module) {
  return useQueryWithNetwork(
    moduleKeys.detail(module?.address),
    () => module?.getMetadata(),
    {
      enabled: !!module && !!module.address,
    },
  );
}

export function useModuleMetadataMutation(module?: Module) {
  const { data: moduleMetadata } = useModuleMetadata(module);
  return useMutationWithInvalidate(
    (metadata: CommonModuleMetadata) => {
      invariant(module, "module is required");
      invariant(moduleMetadata?.metadata, "module metadata is required");
      return module.setMetadata({
        ...moduleMetadata.metadata,
        ...metadata,
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([moduleKeys.detail(module?.address)]);
      },
    },
  );
}

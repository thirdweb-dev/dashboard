import { fetchApiKeyAvailability } from "@3rdweb-sdk/react/hooks/useApi";
import { isAddress } from "ethers/lib/utils";
import { RE_DOMAIN, RE_BUNDLE_ID } from "utils/regex";
import { validStrList } from "utils/validations";
import { z } from "zod";

export const apiKeyValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Must be at least 3 chars" })
    .max(64, { message: "Must be max 64 chars" })
    .refine(
      async (name) => {
        return await fetchApiKeyAvailability(name);
      },
      {
        message: "An API Key with the same name already exists",
      },
    ),
  domains: z.string().refine(
    (str) =>
      validStrList(str, (domain) => {
        return domain.split(":")[0] === "localhost" || RE_DOMAIN.test(domain);
      }),
    {
      message: "Some of the domains are invalid",
    },
  ),
  bundleIds: z.string().refine((str) => validStrList(str, RE_BUNDLE_ID), {
    message: "Some of the bundle ids are invalid",
  }),
  services: z.optional(
    z
      .array(
        z.object({
          name: z.string(),
          enabled: z.boolean().optional(),
          targetAddresses: z
            .string()
            .refine((str) => validStrList(str, isAddress), {
              message: "Some of the addresses are invalid",
            }),
          actions: z.array(z.string()),
        }),
      )
      .optional(),
  ),
});

export type ApiKeyValidationSchema = z.infer<typeof apiKeyValidationSchema>;

// FIXME: Remove
export const HIDDEN_SERVICES = ["relayer"];

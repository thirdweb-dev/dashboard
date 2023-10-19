import { isAddress } from "ethers/lib/utils";
import { RE_BUNDLE_ID, RE_DOMAIN } from "utils/regex";
import { validStrList } from "utils/validations";
import { z } from "zod";


const activeCustomAuthenticationSchema = z.object({
  active: z.literal(true),
  jwksUri: z.string().refine(
    (str) => {
      try {
        return Boolean(new URL(str));
      } catch (e) {
        return false;
      }
    },
    "Invalid JWKS URI"
  ),
  aud: z.string().min(1, { message: "Missing AUD value" }),
});

const inactiveCustomAuthenticationSchema = z.object({
  active: z.literal(false),
  jwksUri: z.string().optional(),
  aud: z.string().optional(),
});


export const apiKeyValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Must be at least 3 chars" })
    .max(64, { message: "Must be max 64 chars" }),
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
  redirectUrls: z
    .string()
    .refine(
      (str) =>
        validStrList(str, (url) => url.includes("://") && !/\s/g.test(url)),
      {
        message:
          "Some of the redirect URIs are invalid. Make sure they are valid URIs and do not contain spaces.",
      },
    )
    .refine((str) => str !== "*", {
      message: "Wildcard redirect URIs are not allowed",
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
          recoveryShareManagement: z
            //  This should be the same as @paperxyz/embedded-wallet-service-sdk RecoveryShareManagement enum
            .enum(["USER_MANAGED", "AWS_MANAGED"])
            .optional(),
          actions: z.array(z.string()),
          customAuthentication: z.union([
            activeCustomAuthenticationSchema,
            inactiveCustomAuthenticationSchema
          ]).optional()
        }),
      )
      .optional(),
  ),
});

export type ApiKeyValidationSchema = z.infer<typeof apiKeyValidationSchema>;

// FIXME: Remove
export const HIDDEN_SERVICES = ["relayer"];

import { File } from "@web-std/file";
import { makeColorHexSafe } from "hooks/useSafeColorHex";
import { Object } from "ts-toolbelt";
import isHexColor from "validator/lib/isHexColor";
import isURL from "validator/lib/isURL";
import * as z from "zod";

type Literal = boolean | null | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonLiteral = z.union([
  z.string().min(1, "Cannot be empty"),
  z.number(),
  z.boolean(),
  z.null(),
]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([jsonLiteral, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const URL = z
  .string()
  .refine((val) => isURL(val), { message: "Invalid URL" });

export const optionalURL = URL.or(z.string().length(0)).optional();

export const optionalString = z.string().or(z.string().length(0)).optional();

export const file = z.instanceof(File);

export const fileOrString = z.string().or(file);

export const optionalFileOrString = fileOrString.optional();

const _optionalProperties = z
  .array(z.object({ key: z.string(), value: jsonLiteral.or(fileOrString) }))
  .optional()
  .superRefine((val, ctx) => {
    if (!val) {
      return;
    }
    const keyCount: Record<string, number> = {};

    val.forEach(({ key }, idx) => {
      if (!keyCount[key]) {
        keyCount[key] = 0;
      }

      keyCount[key]++;
      if (keyCount[key] > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate key: ${key}`,
          path: [idx, "key"],
        });
      }
    });
  });

export const optionalProperties = z.preprocess((val) => {
  const knownVal = val as z.infer<typeof _optionalProperties>;
  // if it exist...
  if (Array.isArray(knownVal)) {
    // run over it

    return knownVal.reduce((acc, curr) => {
      // check if the key has a length
      // if it does then add it back
      if (curr.key.length) {
        acc.push(curr);
      }

      return acc;
    }, [] as NonNullable<z.infer<typeof _optionalProperties>>);
  }
  return knownVal;
}, _optionalProperties);

// parseInt will error on numbers with exponential
export const integer = z.preprocess(
  (val) => parseInt(val as any, 10),
  z.number().int(),
);

export const positiveInt = z.preprocess(
  (val) => parseInt(val as any, 10),
  z.number().int().nonnegative(),
);

export const percentageToBps = z.preprocess(
  (val) => Math.round(parseFloat((val || 0) as any) * 100),
  z
    .number()
    .min(0, "Percentage cannot be less than 0%.")
    .max(100 * 100, "Percentage cannot be above 100%."),
);

export const colorHex = z
  .string()
  .refine((val) => isHexColor(val))
  .refine((val) => makeColorHexSafe(val, true));
export const optionalColorHex = z
  .string()
  .length(6, "Must be exactly 6 characters long")
  .refine((val) => isHexColor(val), {
    message: `Must be a valid hex with no leading "#"`,
  })
  .or(z.string().length(0))
  .optional();

export type MakeInputOutput<T extends {}> = Object.Partial<
  Object.Replace<T, "image", string>,
  "deep"
>;

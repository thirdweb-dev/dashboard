import { File } from "@web-std/file";
import { makeColorHexSafe } from "hooks/useSafeColorHex";
import { Object } from "ts-toolbelt";
import isHexColor from "validator/lib/isHexColor";
import isURL from "validator/lib/isURL";
import * as z from "zod";

export const URL = z
  .string()
  .refine((val) => isURL(val), { message: "Invalid URL" });

export const optionalURL = URL.or(z.string().length(0)).optional();

export const optionalProperties = z.record(z.string(), z.any()).optional();

export const optionalString = z.string().or(z.string().length(0)).optional();

export const file = z.instanceof(File);

export const fileOrString = z.string().or(file);

export const optionalFileOrString = fileOrString.optional();

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
  .refine((val) => isHexColor(val))
  .optional();

export type MakeInputOutput<T extends {}> = Object.Partial<
  Object.Replace<T, "image", string>,
  "deep"
>;

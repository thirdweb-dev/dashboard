export enum PossibleOGType {
  "release" = "release",
}

export function isValidOGType(type?: string): type is PossibleOGType {
  return Object.values(PossibleOGType).includes(type as PossibleOGType);
}


export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://thirdweb.com"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";
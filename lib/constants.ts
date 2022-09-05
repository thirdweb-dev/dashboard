export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://thirdweb.com"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? process.env.NEXT_PUBLIC_VERCEL_URL || "https://thirdweb.com"
    : "http://localhost:3000";



    export const OG_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_OG_IMAGE_BASE || "https://og-image.thirdweb.com";
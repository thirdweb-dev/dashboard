
const ISOMORPHIC_ENV = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';

const ISOMORPHIC_VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "https://thirdweb.com";

export const BASE_URL =
  ISOMORPHIC_ENV === "production"
    ? "https://thirdweb.com"
    : ISOMORPHIC_ENV === "preview"
    ? ISOMORPHIC_VERCEL_URL
    : "http://localhost:3000";



    export const OG_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_OG_IMAGE_BASE || "https://og-image.thirdweb.com";
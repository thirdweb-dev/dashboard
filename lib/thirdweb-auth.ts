import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ThirdwebAuth as thirdwebAuth } from "@thirdweb-dev/auth/next";

// can only be used on the server

export const { ThirdwebAuthHandler: thirdwebAuthHandler, getUser } =
  thirdwebAuth({
    domain: "thirdweb.com",
    wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  });

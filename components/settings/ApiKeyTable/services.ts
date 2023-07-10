// FIXME: Extract these into lib
import { ThirdwebService } from "./types";

export const THIRDWEB_SERVICES: ThirdwebService[] = [
  {
    name: "bundler",
    title: "Smart Wallets",
    description: "Bundler & Paymaster services",
  },
];

export const findByName = (name: string) => {
  return THIRDWEB_SERVICES.find((srv) => srv.name === name);
};

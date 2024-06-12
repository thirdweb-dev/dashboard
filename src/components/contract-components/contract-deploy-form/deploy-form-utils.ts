import { upload } from "thirdweb/storage";
import { thirdwebClient } from "@/constants/client";

export async function uploadContractMetadata(metadata: any) {
  const uri = await upload({ client: thirdwebClient, files: [metadata] });
  return uri;
}

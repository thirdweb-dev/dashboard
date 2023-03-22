import { StorageSingleton } from "lib/sdk";

export async function uploadContractMetadata(metadata: any) {
  const uri = await StorageSingleton.upload(metadata);
  console.log({ uri });
  return uri;
}

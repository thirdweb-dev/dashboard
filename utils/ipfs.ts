import { JSONValue, uploadToIPFS } from "@nftlabs/sdk";
import { File } from "@web-std/file";

export async function safeyfyMetadata(
  metadata: Record<string, JSONValue | File>,
): Promise<Record<string, JSONValue>> {
  const safeMetadata: Record<string, JSONValue> = {};

  for (const k of Object.keys(metadata)) {
    const val = metadata[k];
    if (val instanceof File) {
      safeMetadata[k] = await uploadToIPFS(val);
    } else {
      safeMetadata[k] = val;
    }
  }
  return safeMetadata;
}

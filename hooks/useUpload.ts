/*


  private async uploadToIPFS(data: File | string): Promise<IPFSMedia> {
    const formData = new FormData();
    formData.append("file", data);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    return await res.json();
  }

  private unwrapIPFS(uri: string): string {
    if (uri.startsWith("ipfs://")) {
      return uri.replace(
        "ipfs://",
        `${this.ipfsGatewayUrl}${this.ipfsGatewayUrl.endsWith("/") ? "" : "/"}`,
      );
    }
    return uri;
  }


  */

import { useCallback } from "react";

// === IPFS Token Types === //
export type IPFSMedia = {
  IpfsGatewayUrl: string;
  IpfsHash: string;
  IpfsUri: string;
  PinSize: number;
  Timestamp: Date;
};

export type IPFSToken = {
  image: IPFSMedia | null;
  name?: string;
  description?: string;
};

const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL ||
  "https://cloudflare-ipfs.com/ipfs";

export function useUpload(): (data: File | string) => Promise<IPFSMedia> {
  return useCallback(async (data: File | string) => {
    const formData = new FormData();
    formData.append("file", data);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    return await res.json();
  }, []);
}

export function wrapIPFS(hash: string): string {
  return `ipfs://${hash}`;
}

export function unwrapIPFS(uri: string): string {
  if (uri.startsWith("ipfs://")) {
    return uri.replace(
      "ipfs://",
      `${IPFS_GATEWAY}${IPFS_GATEWAY.endsWith("/") ? "" : "/"}`,
    );
  }
  return uri;
}

import { z } from "zod";

// Neynar's api
const apiUrl = "https://api.neynar.com";
const apiKey = process.env.NEYNAR_API_KEY as string;

const validateMessageSchema = z.object({
  valid: z.literal(true),
});

export const untrustedMetaData = z.object({
  url: z.string().startsWith("https://"),
});

export class Warpcast {
  public static async validateMessageWithReturnedFrameUrl(
    messageBytes: string,
  ) {
    const url = `${apiUrl}/v2/farcaster/frame/validate`;

    const response = await fetch(url, {
      headers: {
        api_key: apiKey,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        message_bytes_in_hex: messageBytes,
      }),
    });

    const res = await response
      .json()
      .then((res) => res)
      .then(validateMessageSchema.parse);
  }
}

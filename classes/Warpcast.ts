import { z } from "zod";

// Neynar's api
const apiUrl = "https://api.neynar.com";
const apiKey = process.env.NEYNAR_API_KEY as string;

const validateMessageSchema = z.object({
  valid: z.literal(true),
  action: z.object({
    interactor: z.object({
      cast: z.object({
        embeds: z.array(z.object({ url: z.string().startsWith("https://") })),
      }),
    }),
  }),
});

export class Warpcast {
  public static async validateMessageWithReturnedFrameUrl(
    messageBytes: string,
  ): Promise<string> {
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

    const result = await response
      .json()
      .then((res) => res)
      .then(validateMessageSchema.safeParse);

    if (result.success) {
      return (
        result.data.action.interactor.cast.embeds[0]?.url ??
        "https://thirdweb.com/thirdweb.eth/DropERC721"
      );
    }

    return "https://thirdweb.com/thirdweb.eth/DropERC721";
  }
}

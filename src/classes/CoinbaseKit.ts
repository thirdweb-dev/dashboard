import { type FrameRequest, getFrameMessage } from "@coinbase/onchainkit";

export async function validateMessage(body: FrameRequest) {
	const { isValid, message } = await getFrameMessage(body, {
		neynarApiKey: process.env.NEYNAR_API_KEY,
	});

	return { isValid, message };
}

import type { NextApiRequest, NextApiResponse } from "next";

interface FeedbackPayload {
  contact: string;
  address: string;
  url: string;
  chainId: number;
  building: string;
  feedback: string;
  other: string;
}

// handles webhook from convertkit and sends it into discord
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid method" });
  }

  const { contact, address, url, chainId, building, feedback, other } =
    req.body as FeedbackPayload;

  const payload = {
    embeds: [
      {
        title: "New User Feedback",
        timestamp: new Date(),
        fields: [
          { name: "Contact", value: contact || "N/A" },
          { name: "Address", value: address || "N/A" },
          { name: "Current page", value: url || "N/A" },
          { name: "Chain ID", value: chainId || "N/A" },
          { name: "What are you building", value: building || "N/A" },
          {
            name: "How can we improve your experience?",
            value: feedback || "N/A",
          },
          {
            name: "Is there anything else you would like to tell us?",
            value: other || "N/A",
          },
        ],
        color: 16488706,
      },
    ],
  };

  const response = await fetch(process.env.DISCORD_FEEDBACK_WEBHOOK_URL || "", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.status(response.status).json({ status: response.statusText });
};

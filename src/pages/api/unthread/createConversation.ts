import { Account, CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { THIRDWEB_API_HOST } from "constants/urls";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "utils/api";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return errorResponse("Invalid method", 400);
  }
  try {
    // const authRequest = await fetch(`${THIRDWEB_API_HOST}/v1/account/me`, {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //     cookie: req.cookies.toString(),
    //   },
    // });
    // const authResponse = await authRequest.json();
    // if (!authResponse.data) {
    //   return errorResponse("Unable to authenticate", 400);
    // }
    // const planToCustomerId: Record<string, string> = {
    //   free: process.env.UNTHREAD_FREE_TIER_ID!,
    //   growth: process.env.UNTHREAD_GROWTH_TIER_ID!,
    //   pro: process.env.UNTHREAD_PRO_TIER_ID!,
    // };
    // const account = authResponse.data as Account;
    // const { email, name } = account;
    // const customerId = planToCustomerId?.[account.plan] || undefined;

    // todo: delete when auth is done
    const email = "";
    const name = "";
    const customerId = "";

    const incomingFormData: FormData = await req.formData();
    const files = incomingFormData.getAll("files") as File[];
    const metadata = incomingFormData.get("metadata") as string;
    if (!metadata) {
      return errorResponse("Invalid message", 400);
    }
    const input = JSON.parse(metadata) as CreateTicketInput;
    const markdown = formatUnthreadMessage(
      input,
      email ?? "N/A",
      name ?? "N/A",
    );

    const title =
      input.product && input["extraInfo_Problem_Area"]
        ? `${input.product}: ${input.extraInfo_Problem_Area}`
        : `New ticket from ${name} (${email})`;

    const formData = new FormData();

    formData.append(
      "json",
      JSON.stringify({
        // Channel #cs-free-email
        triageChannelId: process.env.UNTHREAD_TRIAGE_CHANNEL_ID,
        // Email support@thirdweb.com
        emailInboxId: process.env.UNTHREAD_EMAIL_INBOX_ID,
        title,
        markdown,
        status: "open",
        type: "email",
        onBehalfOf: {
          email,
          name,
        },
        customerId: customerId,
      }),
    );

    if (files.length) {
      files.forEach((file) => formData.append("attachments", file));
    }

    const res = await fetch("https://api.unthread.io/api/conversations", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.UNTHREAD_API_KEY as string,
      },
      body: formData,
    });

    if (!res.ok) {
      return errorResponse("Failed to create ticket.", 400);
    }
  } catch (err) {
    return errorResponse("Failed to create ticket.", 400);
  }

  return NextResponse.json({ done: "done" });
};

export default handler;

/**
 * Unthread only accepts a `markdown` field
 * so we need to include all the metadata there
 *
 * Example of the final content:
 * -- begin --
 * # Email: user@email.com
 * # Address: 0xC88...
 * # Product: Connect
 * # Problem Area: Connect wallet issue
 * # SDK: Unity
 * # SDK Version: 4
 * # Affected Area: Application
 * # Message
 * Hello I'm having an issue with the connect wallet using Unity
 * here's my code: ```....```
 * -- end --
 */
function formatUnthreadMessage(
  input: CreateTicketInput,
  email: string,
  walletAddress: string,
) {
  const extraInfo = Object.keys(input)
    .filter((key) => key.startsWith("extraInfo_"))
    .map((key) => {
      const prettifiedKey = `# ${key.replace("extraInfo_", "").replaceAll("_", " ")}`;
      return `${prettifiedKey}: ${input[key] ?? "N/A"}\n`;
    })
    .join("");
  const message = `# Email: ${email}
# Address: ${walletAddress}
# Product: ${input.product}
${extraInfo}
# -------------------------
# Message:
${input.markdown}
`;
  return message;
}

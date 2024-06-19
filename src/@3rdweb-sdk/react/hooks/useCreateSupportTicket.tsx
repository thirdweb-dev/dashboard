import { useToast } from "@chakra-ui/react";
import { THIRDWEB_API_HOST } from "../../../constants/urls";
import { useAccount } from "./useApi";
import { useLoggedInUser } from "./useLoggedInUser";
import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import invariant from "tiny-invariant";
import { useState } from "react";

const SUPPORT_EMAIL = "support@thirdweb.com";

export type CreateTicketInput = {
  markdown: string;
  product: string;
  files?: File[];
} & Record<string, string>;

function prepareEmailTitle(
  input: CreateTicketInput,
  email: string,
  name: string,
) {
  const title =
    input.product && input["extraInfo_Problem_Area"]
      ? `${input.product}: ${input.extraInfo_Problem_Area} (${email})`
      : `New ticket from ${name} (${email})`;
  return title;
}

function prepareEmailBody(
  input: CreateTicketInput,
  email: string,
  address: string,
) {
  // Update `markdown` to include the infos from the form
  const extraInfo = Object.keys(input)
    .filter((key) => key.startsWith("extraInfo_"))
    .map((key) => {
      const prettifiedKey = `# ${key.replace("extraInfo_", "").replaceAll("_", " ")}`;
      return `${prettifiedKey}: ${input[key] ?? "N/A"}\n`;
    })
    .join("");
  const markdown = `# Email: ${email}
# Address: ${address}
# Product: ${input.product}
${extraInfo}
# Message:
${input.markdown}
`;
  return markdown;
}

export function useCreateTicket() {
  const { user } = useLoggedInUser();
  const account = useAccount();
  const toast = useToast();
  const [data, setData] = useState<CreateTicketInput>();

  return useMutationWithInvalidate(
    async (input: CreateTicketInput) => {
      setData(input);
      // for the testjam - NEED TO REMOVE ON PROD RELEASE
      if (input.markdown.startsWith("testjam")) {
        throw new Error("error for testing");
      }
      invariant(user?.address, "walletAddress is required");
      invariant(account?.data, "Account not found");
      const { name, email, plan } = account.data;
      const formData = new FormData();
      const planToCustomerId: Record<string, string> = {
        free: process.env.NEXT_PUBLIC_UNTHREAD_FREE_TIER_ID as string,
        growth: process.env.NEXT_PUBLIC_UNTHREAD_GROWTH_TIER_ID as string,
        pro: process.env.NEXT_PUBLIC_UNTHREAD_PRO_TIER_ID as string,
      };
      const customerId = planToCustomerId[plan] || undefined;
      if (input.files?.length) {
        input.files.forEach((file) => formData.append("attachments", file));
      }
      const title = prepareEmailTitle(input, email ?? "", name ?? "");
      const markdown = prepareEmailBody(input, email ?? "", user.address);
      const content = {
        type: "email",
        title,
        markdown,
        status: "open",
        onBehalfOf: {
          email,
          name,
        },
        customerId,
        emailInboxId: process.env.NEXT_PUBLIC_UNTHREAD_EMAIL_INBOX_ID,
        triageChannelId: process.env.NEXT_PUBLIC_UNTHREAD_TRIAGE_CHANNEL_ID,
      };
      formData.append("json", JSON.stringify(content));

      const res = await fetch(
        `${THIRDWEB_API_HOST}/v1/account/create-unthread-ticket`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error.message);
      }
      return json.data;
    },
    {
      onError: (err) => {
        /**
         * In case an unexpected incident happens, we fallback to use `mailto:`
         * as an alternative solution
         */
        const emailSubject = prepareEmailTitle(
          data!,
          account.data?.email ?? "",
          account.data?.name ?? "",
        );

        const emailBody = encodeURIComponent(
          prepareEmailBody(
            data!,
            account.data?.email ?? "",
            user?.address ?? "",
          ),
        ).replace(/%0A/g, "%0D%0A");

        toast({
          position: "bottom",
          variant: "solid",
          title: "Oops, something went wrong",
          description: (
            <>
              If the problem persists, please reach out to us directly via{" "}
              {
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${emailSubject}&body=${emailBody}`}
                  target="_blank"
                  style={{ textDecoration: "underline" }}
                >
                  {SUPPORT_EMAIL}
                </a>
              }
            </>
          ),
          status: "error",
          duration: 15000, // make sure they have time to read & click the link
          isClosable: true,
        });
      },
      onSuccess: () => {
        toast({
          position: "bottom",
          variant: "solid",
          title: "Success",
          description:
            "Successfully sent support ticket. Our team will be in touch using your account email shortly.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
    },
  );
}

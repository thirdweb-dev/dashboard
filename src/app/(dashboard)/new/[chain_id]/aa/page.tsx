import { ExternalLinkIcon } from "lucide-react";
import { InfoCard } from "../InfoCard";
import Link from "next/link";

export default function Page() {
  return (
    <div className="pt-2 pb-20">
      <InfoCard title="Account Abstraction">
        <p>
          Everything you need to leverage account abstraction technology to
          enable seamless user experiences for your users.
        </p>
        <p>
          You get all the tools to integrate account abstraction into your app.
          This includes:
        </p>

        <div className="h-4"></div>

        <ul className="text-muted-foreground pl-4 [&_li]:list-disc [&_li]:mb-2 [&_li]:pl-1">
          <li>
            Account factory contracts that let you spin up smart accounts for
            your users
          </li>

          <li>
            Bundler, which is the infrastructure needed to process account
            abstraction transactions (known as User Ops)
          </li>

          <li>
            Paymaster, which lets you sponsor transaction fees for your users
          </li>
        </ul>

        <div className="h-6"></div>

        <div className="flex gap-3 flex-col lg:flex-row">
          <Link
            href="/dashboard/connect/account-abstraction"
            className="bg-secondary font-medium hover:bg-muted border py-3 px-4 rounded-lg text-md flex gap-2 items-center"
          >
            Get Started
            <ExternalLinkIcon className="size-4 text-muted-foreground" />
          </Link>

          <Link
            href="https://portal.thirdweb.com/connect/account-abstraction"
            className="bg-secondary font-medium hover:bg-muted border py-3 px-4 rounded-lg text-md flex gap-2 items-center"
          >
            Learn More
            <ExternalLinkIcon className="size-4 text-muted-foreground" />
          </Link>
        </div>
      </InfoCard>
    </div>
  );
}

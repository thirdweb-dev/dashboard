import { ExternalLinkIcon } from "lucide-react";
import { InfoCard } from "../InfoCard";
import Link from "next/link";

export default function Page() {
  return (
    <div className="pt-2 pb-20">
      <InfoCard title="Engine">
        <p>
          Engine is a backend HTTP server that reads, writes, and deploys
          contracts at production scale.
        </p>

        <div className="h-6"></div>

        <div className="flex gap-3 flex-col lg:flex-row">
          <Link
            href="/dashboard/engine"
            className="bg-secondary font-medium hover:bg-muted border py-3 px-4 rounded-lg text-base flex gap-2 items-center justify-between"
          >
            Setup Engine Instance
            <ExternalLinkIcon className="size-4 text-muted-foreground" />
          </Link>

          <Link
            href="/engine"
            className="bg-secondary font-medium hover:bg-muted border py-3 px-4 rounded-lg text-base flex gap-2 items-center justify-between"
          >
            Learn More
            <ExternalLinkIcon className="size-4 text-muted-foreground" />
          </Link>
        </div>
      </InfoCard>
    </div>
  );
}

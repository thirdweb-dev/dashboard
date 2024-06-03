import { redirect } from "next/navigation";
import { getChain } from "../../chainlist/getChain";
import { InfoCard } from "../InfoCard";

export default async function Page(props: { params: { chain_id: string } }) {
  const chain = await getChain(props.params.chain_id);
  const enabled = chain.services.find((s) => s.service === "engine")?.enabled;

  if (!enabled) {
    redirect(`/new/${props.params.chain_id}`);
  }

  return (
    <div>
      <InfoCard
        title="thirdweb Engine"
        links={[
          {
            label: "Setup Engine Instance",
            href: "/dashboard/engine",
          },
          {
            label: "Learn More",
            href: "https://portal.thirdweb.com/engine",
          },
        ]}
      >
        <p>
          thirdweb Engine is a backend HTTP server that reads, writes, and
          deploys contracts at production scale.
        </p>
      </InfoCard>
    </div>
  );
}

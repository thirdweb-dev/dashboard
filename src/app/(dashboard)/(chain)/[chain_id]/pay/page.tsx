import { redirect } from "next/navigation";
import { InfoCard } from "../InfoCard";
import { getChain } from "../utils";

export default async function Page(props: { params: { chain_id: string } }) {
  const chain = await getChain(props.params.chain_id);
  const enabled = chain.services.find((s) => s.service === "pay")?.enabled;

  if (!enabled) {
    redirect(`/${props.params.chain_id}`);
  }

  return (
    <div className="pb-20">
      <InfoCard
        title="thirdweb Pay"
        links={[
          {
            label: "Get Started",
            href: "https://portal.thirdweb.com/connect/pay/overview",
          },
        ]}
      >
        <p>
          thridweb Pay allows your users to purchase cryptocurrencies and
          execute transactions with their credit/debit card, or with any token
          via cross-chain routing.
        </p>
      </InfoCard>
    </div>
  );
}

import { InfoCard } from "../InfoCard";

export default function Page() {
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

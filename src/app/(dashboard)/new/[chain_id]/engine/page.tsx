import { InfoCard } from "../InfoCard";

export default function Page() {
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

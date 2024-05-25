import Link from "next/link";
import { InfoCard } from "../InfoCard";
import { FaReact } from "react-icons/fa";
import { SiTypescript, SiSolidity, SiDotnet } from "react-icons/si";
import { FaUnity } from "react-icons/fa6";

type SDKInfo = {
  name: string;
  href: string;
  icon: React.FC<{ className?: string }>;
};

const sdks: SDKInfo[] = [
  {
    name: "TypeScript",
    href: "https://portal.thirdweb.com/typescript/v5",
    icon: SiTypescript,
  },
  {
    name: "React",
    href: "https://portal.thirdweb.com/typescript/v5/react",
    icon: FaReact,
  },
  {
    name: "React Native",
    href: "https://portal.thirdweb.com/typescript/v5/react-native",
    icon: FaReact,
  },
  {
    name: "Unity",
    href: "https://portal.thirdweb.com/unity",
    icon: FaUnity,
  },
  {
    name: "Solidity",
    href: "https://portal.thirdweb.com/contracts/build/overview",
    icon: SiSolidity,
  },
  {
    name: ".NFT SDK",
    href: "https://portal.thirdweb.com/dotnet",
    icon: SiDotnet,
  },
];

export default function Page() {
  return (
    <div className="pt-2 pb-20">
      <InfoCard title="Connect SDK" learnMoreHref="/connect">
        <p>
          Connect is the complete toolkit for connecting every user to your
          application.
        </p>
        <p>
          It features customizable onboarding flows, self-custodial in-app
          wallets, account abstraction, onramps, and more.
        </p>
      </InfoCard>

      <div className="h-10"></div>

      <h3 className="text-foreground text-3xl tracking-tighter font-semibold">
        Get Started
      </h3>

      <div className="h-3"></div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {sdks.map((sdk) => {
          return (
            <Link
              key={sdk.name}
              href={sdk.href}
              className="border p-4 bg-secondary rounded-lg hover:bg-muted text-lg font-semibold flex items-center gap-3"
            >
              <sdk.icon className="size-6 text-muted-foreground" />
              {sdk.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* eslint-disable react/forbid-dom-props */
// import { getChain } from "../../chainlist/getChain";
import { ChevronRight, InfoIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import twPublisherImage from "./tw-publisher.png";
import Image from "next/image";

type ContractCardInfo = {
  name: string;
  description: string;
  href: string;
};

// currently the metadata is hardcoded - TODO:fetch it

const popularContracts: ContractCardInfo[] = [
  {
    name: "NFT Drop",
    description: "Release collection of unique NFTs for a set price",
    href: "/thirdweb.eth/DropERC721",
  },
  {
    name: "NFT Collection",
    description: "Create a collection of unique NFTs",
    href: "/thirdweb.eth/TokenERC721",
  },
  {
    name: "Edition Drop",
    description: "Release ERC1155 tokens for a set price",
    href: "/thirdweb.eth/DropERC1155",
  },
  {
    name: "Token",
    description: "Create cryptocurrency compliant with ERC20 standard",
    href: "/thirdweb.eth/TokenERC20",
  },
  {
    name: "Edition",
    description: "Create editions of ERC1155 tokens",
    href: "/thirdweb.eth/TokenERC1155",
  },
];

export default async function Page() {
  return (
    <div className="pt-2 pb-20">
      <ContractsInfoCard />
      <div className="h-10"></div>

      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-3xl tracking-tighter font-semibold">
          Get Started
        </h3>
        <Link
          href="/explore"
          className="text-primary-foreground inline-flex items-center gap-1 text-xl hover:text-foreground font-medium"
          target="_blank"
        >
          View All
          <ChevronRight className="size-5" />
        </Link>
      </div>

      <div className="h-3"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularContracts.map((c) => {
          return (
            <ContractCard
              key={c.name}
              name={c.name}
              description={c.description}
              href={c.href}
            />
          );
        })}
      </div>
    </div>
  );
}

function ContractsInfoCard() {
  return (
    <div className="border rounded-lg px-4 py-4 bg-secondary relative">
      <h2 className="text-xl mb-3 font-semibold tracking-tight">
        thirdweb Contracts
      </h2>
      <p className="mb-1.5 text-muted-foreground">
        End-to-end tools for smart contract development
      </p>
      <p className="mb-6 text-muted-foreground">
        Trusted, modular smart contracts that can be deployed securely on any
        EVM chain
      </p>
      <Link
        href="https://portal.thirdweb.com/contracts"
        className="text-primary-foreground flex items-center gap-0.5"
        target="_blank"
      >
        Learn More <ChevronRight className="size-4" />
      </Link>

      <InfoIcon className="size-5 text-muted-foreground absolute right-4 top-4" />
    </div>
  );
}

function ContractCard(props: ContractCardInfo) {
  return (
    <div
      className="border rounded-xl p-4 hover:border-primary-foreground relative flex flex-col h-full shadow-md"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--secondary)) 13%, hsl(var(--background)) 60%)",
      }}
    >
      <div className="text-success-foreground flex items-center gap-1 mb-5 text-sm font-medium">
        <ShieldCheckIcon className="size-4 text-success-foreground" />
        Audited
      </div>

      <h3 className="text-xl tracking-tight font-semibold text-foreground mb-1.5">
        <Link
          href={props.href}
          className="before:absolute before:inset-0 before:z-0"
          target="_blank"
        >
          {props.name}
        </Link>
      </h3>

      <p className="text-md text-muted-foreground mb-8">{props.description}</p>

      <Link
        className="inline-flex items-center gap-1.5 hover:underline z-10 relative mt-auto"
        href="/thirdweb.eth"
        target="_blank"
      >
        <Image
          src={twPublisherImage}
          alt="thirdweb.eth"
          className="size-4 rounded-full"
        />
        <p className="text-sm"> thirdweb.eth</p>
      </Link>
    </div>
  );
}

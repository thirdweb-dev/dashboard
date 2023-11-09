import { AccountPlan } from "@3rdweb-sdk/react/hooks/useApi";

export const PLANS: {
  [T in AccountPlan]: {
    title: string;
    price: string;
    subTitle: string | null;
    trialPeriodDays: number;
    description: string;
    features: string[];
  };
} = {
  [AccountPlan.Free]: {
    title: "Starter",
    price: "0",
    subTitle: null,
    trialPeriodDays: 0,
    description:
      "Ideal for individuals and small teams who require basic features.",
    features: [
      "Storage Pinning: up to 50GB",
      "RPC & Storage Gateway: 100 rps",
      "Checkout: $1,500 per transaction",
      "Email Wallets",
      "Device Wallets",
      "Smart Wallets",
    ],
  },
  [AccountPlan.Growth]: {
    price: "99",
    title: "Growth",
    subTitle: "Everything in Starter, plus:",
    trialPeriodDays: 14,
    description:
      "Ideal for teams who need higher rate limits and advanced features.",
    features: [
      "Production grade infrastructure: 200 rps for RPC & Storage Gateway",
      "Advanced customization: Custom Auth for Embedded Wallets",
      "Higher limits: $2,500 per Checkout transaction",
      "Wallet Analytics",
    ],
  },
  [AccountPlan.Pro]: {
    price: "999+",
    title: "Pro",
    subTitle: "Everything in Growth, plus:",
    trialPeriodDays: 0,
    description:
      "Ideal for teams that require more customization, SLAs, and support.",
    features: [
      "Higher rate limits for RPC, Storage Gateway, and IPFS",
      "Higher transaction limit for checkout",
      "99.9% Infrastructure uptime SLAs",
      "24 hour customer support SLAs",
      "Dedicated Slack support channel",
    ],
  },
  [AccountPlan.Enterprise]: {
    price: "$$$",
    title: "Enterprise",
    subTitle: "Everything in Pro, plus:",
    trialPeriodDays: 0,
    description: "Contact our Sales team to get you onboarded.",
    features: [],
  },
};

export const SECTIONS = [
  {
    title: "Infrastructure",
    icon: require("public/assets/product-icons/infrastructure.png"),
    items: [
      {
        title: "RPC Requests",
        starter: "Free",
        growth: "Free",
        pro: "Free",
      },
      {
        title: "RPC Rate Limit",
        starter: "100 Requests Per Second",
        growth: "200 Requests Per Second",
        pro: "Custom",
      },
      {
        title: "Storage Gateway Requests",
        starter: "Free",
        growth: "Free",
        pro: "Free",
      },
      {
        title: "Storage Gateway Rate Limit",
        starter: "100 Requests Per Second",
        growth: "200 Requests Per Second",
        pro: "Custom",
      },
      {
        title: "Storage Pinning",
        starter: "Free up to 50 GB +$0.10 per GB after",
        growth: "Free up to 50 GB +$0.10 per GB after",
        pro: "Free up to 50 GB +$0.10 per GB after",
      },
      {
        title: "Storage Pinning File Size",
        starter: "5GB (per file size)",
        growth: "5GB (per file size)",
        pro: "25GB (per file size)",
      },
    ],
  },
  {
    title: "Wallets",
    icon: require("public/assets/product-icons/wallets.png"),
    items: [
      {
        title: "Email Wallet (Self-Recovery)",
        starter: "Unlimited",
        growth: "Unlimited",
        pro: "Unlimited",
      },
      {
        title: "Email Wallet (Managed Recovery)",
        starter:
          "Free up to 10,000 Monthly Active Wallets ($0.02 per Wallet after)",
        growth:
          "Free up to 10,000 Monthly Active Wallets ($0.02 per Wallet after)",
        pro: "Free up to 10,000 Monthly Active Wallets ($0.02 per Wallet after)",
      },
      {
        title: "Device Wallet",
        starter: "Unlimited",
        growth: "Unlimited",
        pro: "Unlimited",
      },
      {
        title: "Smart Wallet",
        starter: "Unlimited",
        growth: "Unlimited",
        pro: "Unlimited",
      },
      {
        title: "Wallet Analytics",
        starter: "--",
        growth: "checkmark",
        pro: "checkmark",
      },
      {
        title: "Custom Auth",
        starter: "--",
        growth: "checkmark",
        pro: "checkmark",
      },
    ],
  },
  {
    title: "Payments - Checkout",
    icon: require("public/assets/product-icons/payments.png"),
    items: [
      {
        title: "Seller Fee",
        starter: "Free",
        growth: "Free",
        pro: "Free",
      },
      {
        title: "Buyer Fee (By Fiat)",
        starter: "4.9% + $0.30",
        growth: "4.9% + $0.30",
        pro: "4.9% + $0.30",
      },
      {
        title: "Buyer Fee (By Crypto)",
        starter: "1%",
        growth: "1%",
        pro: "1%",
      },
      {
        title: "Transaction Limit",
        starter: "$1,500 Per Transaction Limit",
        growth: "$2,500 Per Transaction Limit",
        pro: "Custom",
      },
    ],
  },
  {
    title: "Sponsored Transactions",
    icon: require("public/assets/product-icons/payments.png"),
    items: [
      {
        title: "Bundler",
        starter: "Free",
        growth: "Free",
        pro: "Free",
      },
      {
        title: "Paymaster",
        starter: "10% premium on top of network fee",
        growth: "10% premium on top of network fee",
        pro: "10% premium on top of network fee",
      },
      {
        title: "Gasless Relayer",
        starter: "10% premium on top of network fee",
        growth: "10% premium on top of network fee",
        pro: "10% premium on top of network fee",
      },
    ],
  },
  {
    title: "Support",
    icon: require("public/assets/product-icons/support.png"),
    items: [
      {
        title: "Infrastructure SLAs",
        starter: "--",
        growth: "--",
        pro: "99.9% Uptime",
      },
      {
        title: "Customer support SLAs",
        starter: "--",
        growth: "--",
        pro: "24 hours Dedicated Support",
      },
      {
        title: "Prioritized Customer Support",
        starter: "--",
        growth: "--",
        pro: "checkmark",
      },
      {
        title: "Dedicated Slack support channel",
        starter: "Discord Support Only",
        growth: "Discord Support Only",
        pro: "checkmark",
      },
    ],
  },
];

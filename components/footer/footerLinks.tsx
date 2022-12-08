export interface FooterLinkInfo {
  label: string;
  name: string;
  link: string;
  isExternal?: boolean;
}

export const SOLUTIONS: FooterLinkInfo[] = [
  {
    name: "CommerceKit",
    label: "commerce",
    link: "/solutions/commerce",
  },
  {
    link: "/solutions/gaming",
    name: "GamingKit",
    label: "gaming",
  },
];

export const RESOURCES: FooterLinkInfo[] = [
  {
    label: "about",
    name: "About",
    link: "/about",
  },
  {
    link: "https://thirdweb.typeform.com/to/ZV3gUhiP",
    isExternal: true,
    name: "Partner with us",
    label: "sales-form",
  },
  {
    name: "Docs",
    isExternal: true,
    link: "https://portal.thirdweb.com",
    label: "portal",
  },
  {
    name: "Guides",
    label: "guides",
    link: "https://blog.thirdweb.com/guides",
    isExternal: true,
  },
  {
    name: "Blog",
    label: "blog",
    link: "https://blog.thirdweb.com/",
    isExternal: true,
  },
  {
    name: "Careers",
    label: "careers",
    link: "https://careers.thirdweb.com/",
    isExternal: true,
  },
];

export const SDKs: FooterLinkInfo[] = [
  {
    label: "javascript",
    name: "JavaScript",
    link: "https://portal.thirdweb.com/typescript",
    isExternal: true,
  },
  {
    label: "react",
    name: "React",
    link: "https://portal.thirdweb.com/react",
    isExternal: true,
  },
  {
    label: "python",
    name: "Python",
    link: "https://portal.thirdweb.com/python",
    isExternal: true,
  },
  {
    label: "contracts",
    name: "Contracts",
    link: "https://portal.thirdweb.com/contracts",
    isExternal: true,
  },
];

export const NETWORKS: FooterLinkInfo[] = [
  {
    name: "Solana",
    label: "network-solana",
    link: "/network/solana",
  },
];

export const FAUCETS: FooterLinkInfo[] = [
  {
    name: "Solana",
    label: "faucet-solana",
    link: "/faucet/solana",
  },
];

export const LEGAL: FooterLinkInfo[] = [
  {
    name: "Privacy Policy",
    label: "privacy",
    isExternal: true,
    link: "/privacy",
  },
  {
    name: "Terms of Service",
    label: "terms",
    isExternal: true,
    link: "/tos",
  },
];

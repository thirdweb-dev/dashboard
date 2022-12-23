import {
  ConnectWalletImage,
  DashboardImage,
  Titles,
} from "./components/Graphics";
import { SlideStateProps, TRACK_CATEGORY } from "./shared";
import React from "react";
import { Text, TrackedLink } from "tw-components";

export interface Slide {
  title: string;
  background: string;
  graphic: React.FC<SlideStateProps>;
  content: React.ReactNode;
}

export const slides: Slide[] = [
  // slide 1
  {
    title: "The complete web3 development framework.",
    background: "linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)",
    graphic: DashboardImage,
    // graphicAnimation: moveDown,
    content: (
      <Text size="body.lg" w="90%">
        Everything you need to connect your apps or games to decentralized
        networks. Powerful tools that simplify web3 development.
      </Text>
    ),
  },

  // slide 2
  {
    title: "Speed up development.",
    background: "linear-gradient(147.15deg, #410AB6 30.17%, #D45CFF 100.01%)",
    graphic: Titles,
    content: (
      <Text size="body.lg" w="90%">
        Everything you need to connect your apps or games to decentralized
        networks. Powerful tools that simplify web3 development.
      </Text>
    ),
  },

  // slide 3
  {
    title: "One-click deploys, no private keys.",
    background: "linear-gradient(147.15deg, #410AB6 30.17%, #5CFFE1 100.01%)",
    graphic: Titles,
    content: (
      <>
        Deploy contracts securely using{" "}
        <TrackedLink
          color="blue.500"
          href="https://portal.thirdweb.com/cli"
          category={TRACK_CATEGORY}
          label="launch-cli"
          isExternal
        >
          CLI
        </TrackedLink>{" "}
        and{" "}
        <TrackedLink
          color="blue.500"
          href="https://portal.thirdweb.com/dashboard"
          category={TRACK_CATEGORY}
          label="launch-dashboard"
          isExternal
        >
          Dashboard
        </TrackedLink>
        .
        <br />
        Scale apps easily without worrying about web3 infrastructure.
        <br />
        Create shareable landing pages for contracts with{" "}
        <TrackedLink
          color="blue.500"
          href="https://portal.thirdweb.com/release"
          category={TRACK_CATEGORY}
          label="launch-release"
          isExternal
        >
          Release
        </TrackedLink>
        .
      </>
    ),
  },

  // slide 4
  {
    title: "On-chain analytics and control.",
    background: "linear-gradient(147.15deg, #B4F1FF -10.17%, #410AB6 100.01%)",
    graphic: Titles,
    content: (
      <>
        Monitor on-chain acitivity with{" "}
        <TrackedLink
          color="blue.500"
          href="https://portal.thirdweb.com/dashboard/activity-feed"
          category={TRACK_CATEGORY}
          label="manage-dashboard"
          isExternal
        >
          Analytics
        </TrackedLink>
        .
        <br />
        Interact directly with contracts using{" "}
        <TrackedLink
          color="blue.500"
          href="https://portal.thirdweb.com/dashboard"
          category={TRACK_CATEGORY}
          label="manage-dashboard"
          isExternal
        >
          Dashboard
        </TrackedLink>
        .
        <br />
        Control your team&apos;s access with{" "}
        <TrackedLink
          color="blue.500"
          href="https://portal.thirdweb.com/dashboard/permission-controls"
          category={TRACK_CATEGORY}
          label="manage-dashboard"
          isExternal
        >
          Permissions
        </TrackedLink>
        .
      </>
    ),
  },

  // slide 5
  {
    title: "Connect a wallet to get started.",
    background: "linear-gradient(147.15deg, #410AB6 30.17%, #FF8D5C 100.01%)",
    graphic: ConnectWalletImage,
    content: (
      <Text size="body.lg" w="90%">
        Everything you need to connect your apps or games to decentralized
        networks. Powerful tools that simplify web3 development.
      </Text>
    ),
  },
];

export const lastSlideIndex = slides.length - 1;

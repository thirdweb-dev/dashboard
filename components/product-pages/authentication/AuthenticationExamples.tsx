import {
  DAOs,
  Marketplaces,
  NFTDrops,
  TokenGated,
} from "../homepage/examples/example-svgs";
import { Flex, LinkBox, LinkOverlay, SimpleGrid } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { Heading } from "tw-components";

const EXAMPLES = [
  {
    title: "Sign-in With Wallet",
    label: "",
    href: "https://github.com/thirdweb-example/sign-in-with-ethereum",
    svg: NFTDrops,
  },
  {
    title: "Wallet Subscriptions",
    label: "",
    href: "https://github.com/thirdweb-example/thirdweb-stripe",
    svg: Marketplaces,
  },
  {
    title: "Link Accounts to Wallets",
    label: "",
    href: "https://github.com/thirdweb-example/",
    svg: TokenGated,
  },
  {
    title: "Discord Authentication",
    label: "",
    href: "https://github.com/thirdweb-example/",
    svg: DAOs,
  },
];

interface ExampleItemProps {
  title: string;
  label: string;
  href: string;
  svg: React.FC;
}

const ExampleItem: React.FC<ExampleItemProps> = ({
  title,
  label,
  href,
  svg: RenderSVG,
}) => {
  const { trackEvent } = useTrack();

  return (
    <Flex as={LinkBox} role="group" flexDir="column" gap={6} flexGrow={0}>
      <RenderSVG />
      <LinkOverlay
        href={href}
        isExternal
        onClick={() => {
          trackEvent({
            category: "example",
            action: "click",
            label,
          });
        }}
      >
        <Heading
          _groupHover={{ fontWeight: "bold" }}
          textAlign="center"
          size="subtitle.md"
          maxW="100%"
        >
          {title}
        </Heading>
      </LinkOverlay>
    </Flex>
  );
};

export const AuthenticationExamples: React.FC = () => {
  return (
    <SimpleGrid
      w="100%"
      columns={{ base: 2, md: 4 }}
      spacing={{ base: 6, md: 24 }}
    >
      {EXAMPLES.map((data, index) => (
        <ExampleItem key={index} {...data} />
      ))}
    </SimpleGrid>
  );
};

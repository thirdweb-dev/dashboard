import { Box, Container, Flex } from "@chakra-ui/react";
import type { Chain } from "@thirdweb-dev/chains";
import { redirect, notFound } from "next/navigation";
import { ChainIcon } from "../../../../components/icons/ChainIcon";
import { Heading } from "../../../../tw-components/heading";
import { LinkButton } from "../../../../tw-components/button";
import { DeprecatedAlert } from "../../../../components/shared/DeprecatedAlert";

const OPSponsoredChains = [
  // Optimism
  10,
  // Base
  8453,
  // Zora
  7777777,
  // Mode
  34443,
  // Frax
  252,
];

export default async function Page({
  params,
}: {
  params: { chainSlug: string };
}) {
  const res = await fetch(
    `https://api.thirdweb.com/v1/chains/${params.chainSlug}`,
  );
  const chain = (await res.json()).data as Chain | null;

  if (!chain) {
    return notFound();
  }

  // redirect to the canonical slug
  if (chain.slug !== params.chainSlug) {
    return redirect(`/${chain.slug}`);
  }

  const sanitizedChainName = chain.name.replace("Mainnet", "").trim();
  const isDeprecated = chain?.status === "deprecated";
  const isSponsored = OPSponsoredChains.includes(chain?.chainId);

  return (
    <Container maxW="container.page">
      <Flex flexDirection="column" gap={6} py={6}>
        <Flex
          justify="space-between"
          as="header"
          gap={4}
          align="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex
            gap={6}
            align="center"
            flexGrow={1}
            flexDir={{ base: "column", md: "row" }}
          >
            {chain.icon && (
              <Flex boxSize={20} overflow="hidden" borderRadius="full">
                <ChainIcon
                  ipfsSrc={chain.icon?.url}
                  size="100%"
                  borderRadius="50%"
                />
              </Flex>
            )}
            <Flex
              direction="column"
              gap={3}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <Flex flexDir="column">
                <Flex alignItems="center" gap={2}>
                  <Heading size="title.lg" as="h1">
                    {sanitizedChainName}
                  </Heading>
                  {isSponsored && (
                    <Flex
                      borderRadius="full"
                      align="center"
                      overflow="hidden"
                      flexShrink={0}
                      py={{ base: 1.5, md: 1 }}
                      px={{ base: 1.5, md: 2 }}
                      gap={3}
                      bgGradient="linear(to-r, #701953, #5454B2)"
                    >
                      <Heading size="label.sm" as="label" color="#fff">
                        Sponsored
                      </Heading>
                    </Flex>
                  )}
                </Flex>
                <Heading size="title.lg">
                  <Box
                    as="span"
                    opacity={0.6}
                    fontWeight={400}
                    fontSize="0.8em"
                    color="faded"
                  >
                    ({chain.nativeCurrency.symbol})
                  </Box>
                </Heading>
              </Flex>
            </Flex>
          </Flex>

          {!isDeprecated && (
            <LinkButton
              background="bgBlack"
              color="bgWhite"
              _hover={{
                opacity: 0.8,
              }}
              href="/explore"
            >
              Deploy to {sanitizedChainName}
            </LinkButton>
          )}
        </Flex>
      </Flex>
      <Flex gap={10} direction="column" py={6}>
        <DeprecatedAlert chain={chain} />
      </Flex>
    </Container>
  );
}

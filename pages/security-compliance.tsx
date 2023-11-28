import { Box, Container, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import LandingCardWithImageBackground from "components/landing-pages/card-with-image-background";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingShowcaseImage } from "components/landing-pages/showcase-image";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import React from "react";
import { Heading, Text, TrackedLink, TrackedLinkButton } from "tw-components";

const TRACKING_CATEGORY = "security-compliance-landing";

const SecurityComplianceLanding = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Buy NFTs with Credit Card Checkout",
        description:
          "Let users buy digital assets with a credit card, via a one-click checkout flow. Onboard anyone, even if they've never create a wallet.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/checkout.png`,
              width: 1200,
              height: 630,
              alt: "Buy NFTs with Credit Card Checkout",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: 160, md: 240 }}
      >
        <Flex flexDir="column" alignItems="center" textAlign="center" gap={6}>
          <Heading
            as="h2"
            size="display.md"
            textAlign="center"
            mt={{ base: 4, md: 28 }}
          >
            Security and Compliance
          </Heading>

          <Text size="body.md" maxW={600}>
            Security is foundational to our mission at thirdweb. We safeguard
            computing efforts that advance the emerging technology of web3 and
            continuously prepare for emerging security threats.
          </Text>

          <Flex alignItems="center">
            <TrackedLinkButton
              py={6}
              px={8}
              bgColor="white"
              _hover={{
                bgColor: "white",
                opacity: 0.8,
              }}
              color="black"
              href={"google.com"}
              category={TRACKING_CATEGORY}
              label={"ctaText"}
              fontWeight="bold"
              mr={30}
            >
              {"Visit our Terms of Service"}
            </TrackedLinkButton>

            <TrackedLinkButton
              py={6}
              px={8}
              bgColor="white"
              _hover={{
                bgColor: "white",
                opacity: 0.8,
              }}
              color="black"
              href={"google.com"}
              category={TRACKING_CATEGORY}
              label={"ctaText"}
              fontWeight="bold"
            >
              {"View our Privacy Policy"}
            </TrackedLinkButton>
          </Flex>
        </Flex>

        <LandingShowcaseImage
          miniTitle=""
          titleWithGradient=""
          title="Compliance"
          gradient=""
          description=""
          placeItems="center"
          customDescription={
            <Box>
              thirdweb is currently being audited for SOC2 Type 2 compliance and
              ISO 27001:2022.
              <Box mt={5}>
                thirdweb is following all policies and guidelines now in
                accordance with the observation period and expected to obtain
                audited certifications by Q1 2024.
              </Box>
            </Box>
          }
          image={require("public/assets/landingpage/compliance.png")}
        />

        <LandingShowcaseImage
          miniTitle=""
          titleWithGradient=""
          title="Audit"
          gradient=""
          description=""
          placeItems="center"
          imagePosition="left"
          customDescription={
            <Box>
              All audited smart contracts published by{" "}
              <TrackedLink
                href="https://thirdweb.com/thirdweb.eth"
                target="_blank"
                category={TRACKING_CATEGORY}
                label="security_compliance"
                trackingProps={{
                  contractLabel: "security_compliance",
                }}
                color="#3385FF"
              >
                thirdweb.eth
              </TrackedLink>{" "}
              on thirdweb&apos;s{" "}
              <TrackedLink
                href="https://thirdweb.com/explore"
                target="_blank"
                category={TRACKING_CATEGORY}
                label="security_compliance"
                trackingProps={{
                  contractLabel: "security_compliance",
                }}
                color="#3385FF"
              >
                Explore platform
              </TrackedLink>{" "}
              have been identified as audited and have links to the relevant
              audit report.
              <Box mt={5}>
                Our smart contract audits are conducted by our trusted partner,{" "}
                <TrackedLink
                  href="https://0xmacro.com/"
                  target="_blank"
                  category={TRACKING_CATEGORY}
                  label="security_compliance"
                  trackingProps={{
                    contractLabel: "security_compliance",
                  }}
                  color="#3385FF"
                >
                  0xMacro
                </TrackedLink>
                . If they do not have this audited sign, it means that the audit
                has yet to be conducted by a trusted third party.
              </Box>
            </Box>
          }
          image={require("public/assets/landingpage/audit.png")}
        />

        <LandingShowcaseImage
          miniTitle=""
          titleWithGradient=""
          title="Bug Bounty Program"
          gradient=""
          description=""
          placeItems="center"
          customDescription={
            <Box>
              thirdweb invests in security and invites ethical hackers and
              developers to participate in our Bug Bounty Program using
              HackerOne. For new features, we also periodically run promotions
              with extra support and awards.
              <Box mt={5}>
                If you are interested in joining the program and getting awarded
                bounties, submit a report or send us a message to{" "}
                <TrackedLink
                  href="https://0xmacro.com/"
                  target="_blank"
                  category={TRACKING_CATEGORY}
                  label="security_compliance"
                  trackingProps={{
                    contractLabel: "security_compliance",
                  }}
                  color="#3385FF"
                >
                  security@thirdweb.com
                </TrackedLink>{" "}
                with your H1 username and questions about how to excel.
              </Box>
            </Box>
          }
          image={require("public/assets/landingpage/bug-bounty.png")}
        />

        <Flex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          gap={6}
          w="full"
        >
          <Heading
            as="h2"
            size="display.md"
            textAlign="center"
            mt={{ base: 4, md: 28 }}
          >
            Reporting security issues
          </Heading>

          <Flex
            flexDir="column"
            alignItems="center"
            borderWidth={2}
            borderColor="#272B30"
            borderRadius="xl"
            w="full"
            pt={45}
            pr={45}
            pl={45}
            textAlign="center"
            mt={65}
          >
            <Heading as="h2" size="title.md" maxW={630}>
              If you suspect any malicious or fraudulent content, please report
              any issues to{" "}
              <TrackedLink
                href="https://0xmacro.com/"
                target="_blank"
                category={TRACKING_CATEGORY}
                label="security_compliance"
                trackingProps={{
                  contractLabel: "security_compliance",
                }}
                color="#3385FF"
              >
                abuse@thirdweb.com
              </TrackedLink>
            </Heading>

            <ChakraNextImage
              src={require("public/assets/landingpage/security.png")}
              alt=""
              borderRadius="xl"
              maxW={100}
              mt={8}
            />
          </Flex>
        </Flex>
      </Container>
    </LandingLayout>
  );
};

SecurityComplianceLanding.pageId = PageId.SecurityComplianceLanding;

export default SecurityComplianceLanding;

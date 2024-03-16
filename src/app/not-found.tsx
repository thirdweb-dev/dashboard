import { Box, Center, DarkMode, Flex } from "@chakra-ui/react";

import { HomepageSection } from "../../components/product-pages/homepage/HomepageSection";
import { Aurora } from "../../components/homepage/Aurora";
import NotFound from "public/assets/landingpage/not-found.png";
import { Heading } from "../../tw-components/heading";
import { Text } from "../../tw-components/text";
import { Link } from "../../tw-components/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        overflow="hidden"
      >
        <HomepageSection>
          <Aurora
            pos={{ left: "50%", top: "50%" }}
            size={{ width: "2400px", height: "2400px" }}
            color="hsl(289deg 78% 30% / 35%)"
          />

          <Center mb={6}>
            <Center p={2} position="relative" mb={6}>
              <Box
                position="absolute"
                bgGradient="linear(to-r, #F213A4, #040BBF)"
                top={0}
                left={0}
                bottom={0}
                right={0}
                borderRadius="3xl"
                overflow="visible"
                filter="blur(15px)"
              />

              <Image
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  zIndex: 1,
                }}
                alt=""
                width={32 * 4}
                height={32 * 4}
                placeholder="empty"
                src={NotFound}
              />
            </Center>
          </Center>
          <Heading textAlign="center" size="display.md">
            Uh oh.
            <br />
            Looks like web3
            <br />
            can&apos;t be found here.
          </Heading>
          <Text size="body.2xl" textAlign="center" mt={3}>
            Try our{" "}
            <Link href="/" color="blue.500">
              homepage
            </Link>
            ,{" "}
            <Link href="/dashboard" color="blue.500">
              dashboard
            </Link>{" "}
            or{" "}
            <Link href="https://portal.thirdweb.com" color="blue.500">
              developer portal
            </Link>{" "}
            instead.
          </Text>
        </HomepageSection>
      </Flex>
    </DarkMode>
  );
}

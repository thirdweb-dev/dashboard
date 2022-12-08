import {
  FAUCETS,
  FooterLinkInfo,
  LEGAL,
  NETWORKS,
  RESOURCES,
  SDKs,
  SOLUTIONS,
} from "./footerLinks";
import { SOCIALS } from "./socialLinks";
import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { PRODUCTS } from "components/product-pages/common/nav/DesktopMenu";
import {
  Heading,
  LinkButton,
  TrackedIconButton,
  TrackedLink,
} from "tw-components";

interface FooterLinkGroupProps {
  heading: string;
  links: FooterLinkInfo[];
}

function FooterLinkGroup(props: FooterLinkGroupProps) {
  return (
    <Stack spacing="4" minW="36" flex="1" mb={{ md: 12, base: 14 }}>
      <Heading as="h5" size="label.lg">
        {props.heading}
      </Heading>
      <Stack spacing="3" shouldWrapChildren>
        {props.links.map((link) => (
          <TrackedLink
            isExternal={link.isExternal}
            key={link.label}
            href={link.link}
            category="footer"
            label={link.label}
          >
            {link.name}
          </TrackedLink>
        ))}
      </Stack>
    </Stack>
  );
}

function FooterLinksGrid() {
  return (
    <Flex
      mb={10}
      direction={{ base: "column-reverse", md: "column", lg: "row" }}
      gap={{ base: "12", md: "8" }}
    >
      <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="8">
        <FooterLinkGroup heading="Products" links={PRODUCTS} />
        <FooterLinkGroup heading="Resources" links={RESOURCES} />
        <div>
          <FooterLinkGroup heading="SDKs" links={SDKs} />
          <FooterLinkGroup heading="Solutions" links={SOLUTIONS} />
        </div>
        <div>
          <FooterLinkGroup heading="Networks" links={NETWORKS} />
          <FooterLinkGroup heading="Faucets" links={FAUCETS} />
          <FooterLinkGroup heading="Legal" links={LEGAL} />
        </div>
      </SimpleGrid>
    </Flex>
  );
}

function SocialIcons() {
  return (
    <ButtonGroup variant="ghost">
      {SOCIALS.map((data) => (
        <TrackedIconButton
          key={data.link}
          as={LinkButton}
          isExternal
          noIcon
          href={data.link}
          icon={data.icon}
          category="footer"
          aria-label={data.ariaLabel}
          label={data.label}
        />
      ))}
    </ButtonGroup>
  );
}

export function HomepageFooter() {
  return (
    <Box bgColor="#111315" zIndex="100">
      <Container as="footer" maxW="container.page" color="gray.500">
        <Stack
          spacing="8"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          py={{ base: "12", md: "16" }}
        >
          {/* logo + social icons */}
          <Stack
            spacing={{ base: "6", md: "8" }}
            align={{ base: "center", md: "start" }}
            mb={12}
          >
            <Logo color="#fff" />
            <SocialIcons />
          </Stack>

          <FooterLinksGrid />
        </Stack>
      </Container>
    </Box>
  );
}

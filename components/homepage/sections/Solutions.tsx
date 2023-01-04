import { Aurora } from "../Aurora";
import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { Heading, Link, Text } from "tw-components";

interface SolutionCardProps {
  title: string;
  description: string;
  img: string;
  gradient: string;
  partnerIcon: string;
  arrowIcon: string;
  href: string;
}

const solutions: SolutionCardProps[] = [
  {
    title: "GamingKit",
    gradient: "linear-gradient(90deg, #A79AF9, #7AA8D2)",
    description:
      "The all-in-one platform for developers to easily bring their games onto web3. Build a stronger community around your game by giving players ownership of in-game assets.",
    img: "/assets/landingpage/GamingKit.png",
    partnerIcon: "/assets/landingpage/icons/Coinbase.svg",
    arrowIcon: "/assets/landingpage/icons/arrow-blue.svg",
    href: "/solutions/gaming",
  },
  {
    title: "CommerceKit",
    gradient: "linear-gradient(90deg, #E8B3E0, #A45B99)",
    description:
      "Add powerful web3 features to your Shopify storefront enabling tokengated commerce, NFT loyalty programs, digital collectible sales, and more.",
    img: "/assets/landingpage/CommerceKit.png",
    partnerIcon: "/assets/landingpage/icons/Shopify.svg",
    arrowIcon: "/assets/landingpage/icons/arrow-pink.svg",
    href: "/solutions/commerce",
  },
];

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  img,
  gradient,
  partnerIcon,
  arrowIcon,
  href,
}) => {
  return (
    <Flex
      overflow="hidden"
      direction="column"
      zIndex={10}
      as="section"
      background="rgba(0,0,0,0.4)"
      boxShadow="0 0 0 1px hsl(0deg 0% 100% / 10%)"
      borderRadius="8px"
    >
      <Image
        src={img}
        alt=""
        width="100%"
        height={{ lg: 250, base: 180 }}
        objectFit="cover"
      />
      <Flex
        direction="column"
        justifyContent="space-between"
        p={{ base: 6, lg: 12 }}
        py={{ base: 10 }}
        flexGrow={1}
      >
        <Box>
          <Heading
            as="h3"
            fontSize="24px"
            mb={6}
            bgGradient={gradient}
            bgClip="text"
          >
            {title}
          </Heading>
          <Text size="body.lg" lineHeight={1.7}>
            {description}
          </Text>
        </Box>

        <Flex alignItems="center" gap={2} mt={10}>
          <Text lineHeight={1}>In partnership with</Text>
          <Image src={partnerIcon} alt="" width={100} />
          <Link href={href} ml="auto" isExternal>
            <Image src={arrowIcon} alt="" width={8} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const SolutionsSection: React.FC = () => {
  return (
    <HomepageSection py={24}>
      <Aurora
        pos={{ left: "10%", top: "60%" }}
        size={{ width: "2400px", height: "1800px" }}
        color="hsl(219deg 78% 30% / 20%)"
      />

      <Aurora
        pos={{ left: "90%", top: "60%" }}
        size={{ width: "2400px", height: "1800px" }}
        color="hsl(289deg 78% 30% / 20%)"
      />

      <Heading
        as="h3"
        fontSize={{ base: "32px", md: "48px" }}
        fontWeight={700}
        letterSpacing="-0.04em"
        mb={4}
        textAlign="center"
      >
        Explore solutions.
      </Heading>
      <Text textAlign="center" size="body.lg" mb={14}>
        thirdweb powers the best web3 projects across verticals
      </Text>
      <SimpleGrid
        columns={{ md: 2, base: 1 }}
        gap={6}
        maxW={1000}
        margin="0 auto"
      >
        {solutions.map((feature) => (
          <SolutionCard key={feature.title} {...feature} />
        ))}
      </SimpleGrid>
    </HomepageSection>
  );
};

import {
  Box,
  DarkMode,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CopyButton } from "components/homepage/AnimatedCLICommand/AnimatedCLICommand";
import { ProductButton } from "components/product-pages/common/ProductButton";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { GetStaticPaths, GetStaticProps } from "next";
import { PageId } from "page-id";
import { templates } from "pages/templates";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

type TemplatePageProps = {
  template: (typeof templates)[0];
};

const TemplatePage: ThirdwebNextPage = (props: TemplatePageProps) => {
  console.log(props);

  // TODO: Bug: this flashes desktop-version first before rendering properly.
  // Right now we bias towards desktop vresion, so on mobile it flashes desktop version first.
  const isMobile = useBreakpointValue({
    base: false,
    xs: true,
    sm: true,
    md: false,
  });

  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
      >
        <HomepageTopNav />

        <Flex
          pt={24}
          px={{ base: 4, md: 8 }}
          ml="auto"
          mr="auto"
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          gap={{ base: 8, md: 0 }}
        >
          <Box maxWidth={440} pr={{ base: 0, md: 8 }}>
            {isMobile && (
              <Image
                src={"/assets/templates/marketplace.png"}
                alt={`Screenshot of ${props.template.title} template`}
                width="100%"
                height={{ base: "auto", md: 442 }}
                objectFit="cover"
                mb={12}
              />
            )}

            <Heading as="h1" fontSize="48px" fontWeight={700}>
              {props.template.title}
            </Heading>
            <Text
              mt={4}
              fontWeight={500}
              fontSize={16}
              lineHeight={1.5}
              opacity={0.7}
              color="whiteAlpha.900"
            >
              {props.template.description}
            </Text>
            <Flex
              direction="row"
              alignItems="center"
              gap={1}
              my={4}
              flexWrap="wrap"
            >
              {props.template.tags.map((tag, idx) => (
                <Box
                  as="div"
                  key={idx}
                  color="whiteAlpha.700"
                  border="1px solid #383838"
                  borderRadius="8px"
                  height="26px"
                  padding="6px 12px"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mt={1}
                >
                  <Text
                    as="span"
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight={1.2}
                    letterSpacing="-0.015em"
                    opacity={0.7}
                    color="whiteAlpha.900"
                  >
                    {tag}
                  </Text>
                </Box>
              ))}
            </Flex>

            <Box my={8}>
              <Text
                textTransform="uppercase"
                fontWeight={600}
                color="#646D7A"
                letterSpacing={"0.1em"}
                fontSize={"12px"}
              >
                Author
              </Text>
              <Flex direction="row" alignItems="center" mt={2}>
                <Image
                  src="/assets/templates/thirdweb-eth.png"
                  alt={"thirdweb icon"}
                  width={"16px"}
                  height={"16px"}
                  mr={1}
                />
                <Text
                  as="span"
                  color="whiteAlpha.900"
                  lineHeight={1.5}
                  fontSize={"12px"}
                  fontWeight={500}
                  letterSpacing="-0.02em"
                  opacity={0.75}
                >
                  thirdweb.eth
                </Text>
              </Flex>
            </Box>

            <Flex mt={8}>
              <ProductButton
                title={"View Demo"}
                href={props.template.homepage}
                color="blackAlpha.900"
                bg="white"
                height="44px"
                width="149px"
                fontSize="14px"
                lineHeight="20px"
                fontWeight={600}
                iconColor="blackAlpha.900"
              />
              <LinkButton
                as={TrackedLink}
                variant="outline"
                borderWidth="2px"
                w="full"
                py={"22px"}
                textAlign="center"
                borderRadius="md"
                href={props.template.repo}
                isExternal={true}
                noIcon
                height="44px"
                width="149px"
                fontSize="14px"
                lineHeight="20px"
                fontWeight={600}
                ml={4}
              >
                View Repo
              </LinkButton>
            </Flex>
          </Box>

          <Box
            borderLeft={{
              base: "none",
              md: "1px solid #222222",
            }}
            pl={{ base: 0, md: 16 }}
            minHeight="75vh"
            height={"100%"}
          >
            {!isMobile && (
              <Image
                src={"/assets/templates/marketplace.png"}
                alt={`Screenshot of ${props.template.title} template`}
                width="100%"
                height={{ base: "auto", md: 442 }}
                objectFit="cover"
              />
            )}

            <Heading as="h2" fontSize="32px" fontWeight={700} mt={16}>
              Get started
            </Heading>

            <Text
              mt={4}
              fontWeight={500}
              fontSize={16}
              lineHeight={1.5}
              opacity={0.7}
              color="whiteAlpha.900"
            >
              Kick start your project by copying this command into your CLI.
            </Text>

            <Flex
              border="1px solid rgba(255, 255, 255, 0.2)"
              borderRadius="md"
              flexShrink={0}
              py={3}
              px={4}
              my={4}
              minW={"300px"}
              gap={1}
              align="center"
              alignSelf="start"
            >
              <Text
                color="white"
                fontFamily="mono"
                fontSize="16px"
                fontWeight="500"
                whiteSpace="nowrap"
              >
                <span>npx thirdweb create --template {props.template.id}</span>
              </Text>
              <CopyButton
                text={`npx thirdweb create --template ${props.template.id}`}
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </DarkMode>
  );
};

export default TemplatePage;
TemplatePage.pageId = PageId.Template;

// server side ---------------------------------------------------------------
export const getStaticProps: GetStaticProps<TemplatePageProps> = async (
  ctx,
) => {
  try {
    // Using the id from the context, we can fetch the data for the template from GitHub.
    const { id } = ctx.params as { id: string };

    const template = templates.find((t) => t.id === id);

    if (!template) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        template,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  console.log(
    templates.map((template) => ({
      params: {
        id: template.id,
      },
    })),
  );

  return {
    fallback: true,
    paths: templates.map((template) => ({
      params: {
        id: template.id,
      },
    })),
  };
};

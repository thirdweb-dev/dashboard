import { Accordion, Box, DarkMode, Flex, Grid, Select } from "@chakra-ui/react";
import Event from "components/events/Event";
import { FeaturedCard } from "components/events/FeaturedCard";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const featuredEvents = [
  {
    type: "Hackathon",
    title: "Solana Hackathon",
    date: "June 1st - 30th",
    banner: "/assets/og-image/solanathon.jpg",
    link: "/hackathon/solanathon",
  },
  {
    type: "Hackathon",
    title: "Solana Hackathon",
    date: "June 1st - 30th",
    banner: "/assets/og-image/solanathon.jpg",
    link: "/hackathon/solanathon",
  },
];

const allEvents = [
  {
    type: "Hackathon",
    title: "Solana Hackathon",
    date: "June 1st - 30th",
    time: "5PM EST",
    location: "New York",
    description:
      "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    link: "",
  },
  {
    type: "Hackathon",
    title: "Solana Hackathon",
    date: "June 1st - 30th",
    time: "5PM EST",
    location: "New York",
    description:
      "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    link: "",
  },
  {
    type: "Hackathon",
    title: "Solana Hackathon",
    date: "June 1st - 30th",
    time: "5PM EST",
    location: "New York",
    description:
      "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    link: "",
  },
];

const EventsPage: ThirdwebNextPage = () => {
  return (
    <DarkMode>
      <NextSeo title="events" />
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
      >
        <HomepageTopNav />

        <Box maxW="100vw" mt="-100px" overflowX="hidden" minH="100vh" pt={20}>
          <HomepageSection id="header" topGradient>
            <Flex
              flexDir="column"
              align="center"
              gap={12}
              mt={{ base: 12, md: 24 }}
            >
              <Heading size="title.xl" textAlign="center">
                Explore our Upcoming Events!
              </Heading>
            </Flex>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap={12}
              mt={12}
            >
              {featuredEvents.map(({ type, title, date, banner, link }) => (
                <FeaturedCard
                  key={title}
                  type={type}
                  title={title}
                  date={date}
                  banner={banner}
                  link={link}
                />
              ))}
            </Grid>
          </HomepageSection>

          <HomepageSection mt={20}>
            <Select w={40} mx="auto">
              <option value="all">Sort by: Date</option>
            </Select>

            <Accordion
              mt={20}
              flexDir="column"
              gap={12}
              allowMultiple
              mx="auto"
            >
              {allEvents.map(
                ({ type, title, date, time, location, description, link }) => (
                  <Event
                    key={title}
                    type={type}
                    title={title}
                    date={date}
                    time={time}
                    location={location}
                    description={description}
                    link={link}
                  />
                ),
              )}
            </Accordion>
          </HomepageSection>
        </Box>
      </Flex>
    </DarkMode>
  );
};

EventsPage.pageId = PageId.SolanaHackathonLanding;

export default EventsPage;

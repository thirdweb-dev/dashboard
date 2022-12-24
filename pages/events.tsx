import { Accordion, Box, DarkMode, Flex, Grid, Select } from "@chakra-ui/react";
import Event from "components/events/Event";
import { FeaturedCard } from "components/events/FeaturedCard";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { useState } from "react";
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
    title: "Ready Player 3",
    date: "June 1st - 30th",
    banner: "/assets/og-image/solanathon.jpg",
    link: "/hackathon/solanathon",
  },
];

const allEvents = [
  {
    type: "Hackathon",
    title: "Solana Hackathon",
    timestamp: "2022-06-01T00:00:00.000Z",
    location: "online",
    description:
      "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    link: "",
  },
  {
    type: "Workshop",
    title: "Some workshop",
    timestamp: "2023-01-16T00:00:00.000Z",
    location: "earth",
    description:
      "Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
    link: "",
  },
];

const EventsPage: ThirdwebNextPage = () => {
  const [sortBy, setSortBy] = useState<"date" | "location" | "type" | "title">(
    "date",
  );
  const [sortedEvents, setSortedEvents] = useState(allEvents);

  const handleSort = (value: "date" | "location" | "type" | "title") => {
    setSortBy(value);
    switch (value) {
      case "date":
        setSortedEvents(
          allEvents.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateB.getTime() - dateA.getTime();
          }),
        );
        break;
      case "location":
        setSortedEvents(
          allEvents.sort((a, b) => {
            if (a.location < b.location) {
              return -1;
            }
            if (a.location > b.location) {
              return 1;
            }
            return 0;
          }),
        );
        break;
      case "type":
        setSortedEvents(
          allEvents.sort((a, b) => {
            if (a.type < b.type) {
              return -1;
            }
            if (a.type > b.type) {
              return 1;
            }
            return 0;
          }),
        );
        break;
      case "title":
        setSortedEvents(
          allEvents.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }),
        );
        break;
    }
  };

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
            <Select
              w={40}
              mx="auto"
              value={sortBy}
              onChange={(e) => {
                const value = e.target.value as
                  | "date"
                  | "location"
                  | "type"
                  | "title";
                handleSort(value);
              }}
            >
              <option value="date">Sort by: Date</option>
              <option value="location">Sort by: Location</option>
              <option value="type">Sort by: Type</option>
              <option value="type">Sort by: Title</option>
            </Select>

            <Accordion
              mt={20}
              flexDir="column"
              gap={12}
              allowMultiple
              mx="auto"
            >
              {sortedEvents.map(
                ({ type, title, timestamp, location, description, link }) => (
                  <Event
                    key={title}
                    type={type}
                    title={title}
                    timestamp={timestamp}
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

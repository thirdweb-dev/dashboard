import { Accordion, Box, DarkMode, Flex, Grid, Select } from "@chakra-ui/react";
import Event from "components/events/Event";
import { FeaturedCard } from "components/events/FeaturedCard";
import { Aurora } from "components/homepage/Aurora";
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
    title: "Ready Player 3 Hackathon",
    date: "Jan 16th - 31st",
    banner: "/assets/og-image/readyplayer3.png",
    link: "https://thirdweb.com/hackathon/readyplayer3",
  },
];

const allEvents = [
  {
    type: "Hackathon",
    title: "Hackathon Kickoff & Intro to GamingKit | Ready Player 3 Hackathon",
    timestamp: "2023-01-16T13:00:00+05:00",
    location: "online",
    description:
      "Come learn about how to get started with thirdweb's GamingKit and then put your skills to the test in a boundary-pushing web3 gaming hackathon! This event is perfect for beginners who want to learn about game development, or for experienced developers who want to try out our new tools. We'll have prizes for the most innovative and seamless games created during the hackathon, so come ready to showcase your talents!",
    link: "https://lu.ma/rp3kickoff",
  },
  {
    type: "Workshop",
    title: "Getting Started with thirdweb | Ready Player 3 Hackathon",
    timestamp: "2023-01-17T13:00:00-05:00",
    location: "online",
    description:
      "Join us for a workshop on getting started with thirdweb, and then put your new skills to the test in our Ready Player 3 Hackathon!",
    link: "https://lu.ma/rp3gettingstarted",
  },
  {
    type: "Workshop",
    title:
      "Create AI Generated In-Game NFT Assets with Scenario.gg | Ready Player 3 Hackathon",
    timestamp: "2023-01-18T13:00:00-05:00",
    location: "online",
    description:
      "Come learn how to use the new AI game asset generation tool from scenario.gg in combination with thirdweb's GamingKit!",
    link: "https://lu.ma/rp3scenario",
  },
  {
    type: "Workshop",
    title:
      "thirdweb & Coinbase Cloud Code-Along: Build With GamingKit | Ready Player 3 Hackathon",
    timestamp: "2023-01-19T13:00:00-05:00",
    location: "online",
    description:
      "​Learn how to build a web3 game, powered by thirdweb's GamingKit!",
    link: "https://lu.ma/rp3gamecodealong",
  },
  {
    type: "Workshop",
    title: "Workshop with Spindl.xyz | Ready Player 3 Hackathon",
    timestamp: "2023-01-23T13:00:00-05:00",
    location: "online",
    description: "",
    link: "https://lu.ma/rp3spindl",
  },
  {
    type: "Workshop",
    title: "Fireside Chat with Fractal | Ready Player 3 Hackathon",
    timestamp: "2023-01-24T13:00:00-05:00",
    location: "online",
    description: "",
    link: "https://lu.ma/rp3fractal",
  },
  {
    type: "Workshop",
    title:
      "How to Create Your Hackathon Submission on DevPost + Q&A | Ready Player 3 Hackathon",
    timestamp: "2023-01-25T13:00:00-05:00",
    location: "online",
    description: "",
    link: "https://lu.ma/rp3submissions",
  },
  {
    type: "Workshop",
    title: "Ready Player 3 Hackathon | Closing Ceremony + Winners Announcement",
    timestamp: "2023-02-06T13:00:00-05:00",
    location: "online",
    description: "",
    link: "https://lu.ma/rp3closing",
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
            return dateA.getTime() - dateB.getTime();
          }),
        );
        break;
      default:
        setSortedEvents(
          allEvents.sort((a, b) => {
            return a[value] < b[value] ? -1 : 1;
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
          <HomepageSection id="header">
            <Aurora
              pos={{ left: "50%", top: "50%" }}
              size={{ width: "2000px", height: "2000px" }}
              color={"hsl(280deg 78% 30% / 30%)"}
            />

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
              column={{ base: 1, md: featuredEvents.length === 2 ? 2 : 1 }}
              gap={12}
              mt={12}
              placeContent="center"
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
              bg="transparent"
              color="white"
            >
              <option value="date">Sort by: Date</option>
              <option value="location">Sort by: Location</option>
              <option value="type">Sort by: Type</option>
              <option value="title">Sort by: Title</option>
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

EventsPage.pageId = PageId.Events;

export default EventsPage;

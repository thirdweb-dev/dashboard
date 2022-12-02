import { ThirdwebNextPage } from "./_app";
import { DarkMode, Flex } from "@chakra-ui/react";
import { HomePageSections } from "components/homepage/HomePageSections";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageFooter } from "components/product-pages/homepage/Footer";
import { PageId } from "page-id";

const HomePage: ThirdwebNextPage = () => {
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
      >
        <HomepageTopNav />
        <HomePageSections />
        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};

HomePage.pageId = PageId.Homepage;

export default HomePage;

import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { Heading, Text, TrackedLinkButton } from "tw-components";

interface LandingPlanProps {
  title: string;
  description: string;
  iconImage: StaticImageData;
  listTitle?: string;
  list: (string | ReactNode)[];
  btnHref: string;
  btnTitle: string;
  trackingCategory: string;
}

export const LandingPlan = ({
  title,
  description,
  iconImage,
  listTitle,
  list,
  btnHref,
  btnTitle,
  trackingCategory,
}: LandingPlanProps) => {
  return (
    <Flex
      flexDir="column"
      borderRadius="12px"
      border="1px solid #26282F"
      background="#000001"
      padding="32px"
      minH={{ base: "auto", md: "714px" }}
    >
      <Flex flexDir="column" flex={1}>
        <Flex alignItems="center" gap="13px">
          <ChakraNextImage src={iconImage} height="50px" width="36px" alt="" />

          <Heading as="label" size="title.lg">
            {title}
          </Heading>
        </Flex>

        <Text size="body.lg" marginTop="14px" color="#646D7A">
          {description}
        </Text>

        <Flex marginTop="49px" flexDir="column" color="#646D7A" gap="16px">
          {listTitle && (
            <Text size="body.lg" color="#646D7A">
              {listTitle}
            </Text>
          )}

          {list.map((listItem, idx) => {
            return (
              <Flex key={idx} alignItems="center" gap="12px">
                <ChakraNextImage
                  src={require("/public/assets/landingpage/check.svg")}
                  height="16px"
                  width="16px"
                  alt=""
                />
                {typeof listItem === "string" ? (
                  <Text size="body.lg" color="#646D7A">
                    {listItem}
                  </Text>
                ) : (
                  listItem
                )}
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <TrackedLinkButton
        marginTop="130px"
        colorScheme="primary"
        category={trackingCategory}
        label={`contact_us_${title.replace(" ", "_").toLowerCase()}`}
        href={btnHref}
        borderRadius="lg"
        py={6}
        px={6}
        bgColor="white"
        _hover={{
          bgColor: "white",
          opacity: 0.8,
        }}
        size="md"
        color="black"
      >
        {btnTitle}
      </TrackedLinkButton>
    </Flex>
  );
};

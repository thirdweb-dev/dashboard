import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { Heading, Text } from "tw-components";

export interface CaseStudyStaticProps {
  title: ReactNode;
  description: string;
  image: StaticImageData;
}

const CaseStudyStatic = ({
  image,
  title,
  description,
}: CaseStudyStaticProps) => {
  return (
    <Flex
      flexDir="column"
      borderRadius="8px"
      border="1px solid #26282F"
      minW="371px"
      w="371px"
    >
      <ChakraNextImage
        src={image}
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        alt=""
      />

      <Flex gap="16px" flexDir="column" padding="36px">
        <Heading size="title.md" fontWeight={500}>
          {title}
        </Heading>

        <Text fontSize="16px" mt="8px">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CaseStudyStatic;

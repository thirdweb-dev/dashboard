import { Flex, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Heading, Text } from "tw-components";

export const Judges: React.FC = () => {
  const judges = [
    {
      name: "Furqan",
      handle: "@furqan",
      image: "/assets/hackathon/judges/furqan.png",
    },
    {
      name: "Furqan",
      handle: "@furqan",
      image: "/assets/hackathon/judges/furqan.png",
    },
    {
      name: "Furqan",
      handle: "@furqan",
      image: "/assets/hackathon/judges/furqan.png",
    },
  ];

  return (
    <VStack mb={20} mt="-50px">
      <Heading fontSize="48px">Judges</Heading>
      <Flex>
        {judges.map(({ name, handle, image }) => (
          <VStack key={name} m={4}>
            <Image
              width="175px"
              objectFit="cover"
              height="135px"
              src={image}
              alt={name}
            />
            <Text
              align="center"
              fontSize="24px"
              fontWeight="semibold"
              color="white"
            >
              {name}
            </Text>
            <Text
              as="span"
              fontSize="18px"
              color="#FFFFFF99"
              mt="-2 !important"
            >
              {handle}
            </Text>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
};

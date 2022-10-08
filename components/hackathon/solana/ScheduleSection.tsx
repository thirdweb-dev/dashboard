import { Flex, VStack } from "@chakra-ui/react";
import { SiBurgerking } from "react-icons/si";
import { Heading, Text } from "tw-components";

export const ScheduleSection: React.FC = () => {
  const items = [
    {
      date: 12,
      title: "Build any app with thirdweb on Solana Blockchain",
    },
    {
      date: 13,
      title: "Build xyz.com",
    },
    {
      date: 14,
      title: "Use thirdweb sdk and print “hello world”",
    },
    {
      date: 15,
      title: "Build any app with thirdweb on Solana Blockchain",
    },
  ];

  return (
    <VStack mt={20} px={20}>
      <Heading>Schedule</Heading>
      <Flex
        w="full"
        justify="space-between"
        flexDir="column"
        align="center"
        mt={4}
      >
        {items.map(({ date, title }, i) => (
          <Flex
            key={title}
            align="center"
            justify="space-between"
            w="full"
            px={10}
            bg="#FFFFFF0A"
            borderTopRadius={i === 0 ? 10 : 0}
            borderBottomRadius={i === items.length - 1 ? 10 : 0}
            py={2}
          >
            <VStack>
              <Heading fontSize="40px" color="white">
                {date}
              </Heading>
              <Text color="#FFFFFF99">OCT</Text>
            </VStack>

            <Flex gap="2" align="center">
              <SiBurgerking size="28px" color="#FFFFFF66" />
              <Heading
                textAlign="left"
                mt={1}
                fontSize="20px"
                maxW="350px"
                fontWeight={500}
              >
                {title}
              </Heading>
            </Flex>

            <Text>--</Text>
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};

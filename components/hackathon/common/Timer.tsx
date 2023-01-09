import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Text } from "tw-components";

interface ITimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  date: string;
}

const Timer: React.FC<TimerProps> = ({ date }) => {
  const calculateTimeLeft = () => {
    const difference = Number(new Date(date)) - Number(new Date());
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as ITimeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(calculateTimeLeft());
  const { days, hours, minutes, seconds } = timeLeft;

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const items = [
    { label: "Day", value: days },
    { label: "Hour", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  return (
    <Flex gap={2}>
      {items.map(({ label, value }) => (
        <Flex flexDir="column" key={label} align="center">
          <Text
            fontSize={{ base: "24px", md: "32px" }}
            bg="hsl(321deg 100% 50% / 8%)"
            // border="2px solid #f849ec2b"
            p={3}
            lineHeight={1.2}
            // w={{ base: "60px", md: "80px" }}
            align="center"
            // color="white"
            fontWeight={700}
            borderRadius={4}
            color="#f014a5"
            // textShadow={"0 0 10px #f849ec8a"}
          >
            {value < 10 ? `0${value}` : value}
          </Text>
          <Text fontWeight={500} fontSize="12px" color="#f014a5" mt={1}>
            {value === 1 ? label : `${label}s`}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Timer;

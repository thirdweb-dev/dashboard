import { Flex, FlexProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Text } from "tw-components";

interface ITimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps extends FlexProps {
  date: string;
  showSec?: boolean;
}

const Timer: React.FC<TimerProps> = ({ date, showSec, ...otherProps }) => {
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
    ...(showSec ? [{ label: "Sec", value: seconds }] : []),
  ];

  return (
    <Flex {...otherProps}>
      {items.map(({ label, value }) => (
        <Flex flexDir="column" key={label} align="center">
          <Text
            fontSize={{ base: "28px", md: "40px" }}
            bg="#FFFFFF14"
            border="1px solid #FFFFFF1A"
            w={{ base: "40px", md: "60px" }}
            align="center"
            color="#B8FC62"
          >
            {value < 10 ? `0${value}` : value}
          </Text>
          <Text color="#B8FC62">{value === 1 ? label : `${label}s`}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Timer;

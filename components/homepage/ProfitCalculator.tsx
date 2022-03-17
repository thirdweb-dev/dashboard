import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useThrottle } from "@react-hook/throttle";
import React, { useCallback, useMemo } from "react";
import { AnimatedGradient } from "./AnimatedGradient";

export const ProfitCalculator: React.FC = () => {
  const usdc = 100000;
  const [percent, setPercent] = useThrottle(10, 60);

  const NumberFormatInstanceWithDecimals: Intl.NumberFormat = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }, []);

  const NumberFormatInstanceWithOutDecimals: Intl.NumberFormat = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }, []);

  const commaify = useCallback(
    (val: number, noDecimals?: true) => {
      return (
        noDecimals
          ? NumberFormatInstanceWithOutDecimals
          : NumberFormatInstanceWithDecimals
      ).format(val);
    },
    [NumberFormatInstanceWithDecimals, NumberFormatInstanceWithOutDecimals],
  );

  const royalty = (usdc * percent) / 100;

  return (
    <Box position="relative">
      <Flex
        zIndex={1}
        flexDir="column"
        borderRadius="24px"
        background="white"
        overflow="hidden"
      >
        <Stack bg="primary.900" p={[4, 4, 8]} py={[6, 6, 8]}>
          <Heading variant="light" size="label.lg" fontSize="label.2xl">
            Income calculator
          </Heading>
          <Text color="paragraphLight" fontStyle="italic">
            Example using 100,000 USDC transaction volume
          </Text>
        </Stack>

        <Stack p={[4, 4, 8]} spacing={4}>
          <Heading size="subtitle.md">
            What&apos;s your royalty percentage?
          </Heading>
          <Slider
            id="pricing-slider"
            value={percent}
            onChange={setPercent}
            colorScheme="primary"
            min={0}
            max={100}
          >
            <SliderTrack bg="primary.100">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb bg="primary.500" />
          </Slider>
          <Flex justify="space-between" align="flex-start">
            <Text
              fontSize={["xs", "xs", "md"]}
              textAlign="left"
              opacity={0.8}
              fontWeight="500"
              w="15%"
            >
              0%
            </Text>
            <Text
              fontSize={["md", "md", "xl"]}
              fontWeight="700"
              textAlign="center"
              fontFamily="mono"
            >
              {percent}%
            </Text>
            <Text
              fontSize={["xs", "xs", "md"]}
              textAlign="right"
              opacity={0.8}
              fontWeight="500"
              w="15%"
            >
              100%
            </Text>
          </Flex>
        </Stack>
        <Divider />
        <SimpleGrid columns={2} spacing={0}>
          <Stat
            flexGrow={0}
            p={[4, 4, 8]}
            pb={[6, 6, 8]}
            borderRight="1px solid var(--chakra-colors-gray-200)"
          >
            <Heading as={StatLabel} size="subtitle.md">
              Your earnings
            </Heading>
            <Heading
              as={StatNumber}
              size="title.lg"
              fontSize={{
                base: "title.md",
                md: "title.xl",
              }}
              fontFamily="mono"
              color="twurple.500"
            >
              {commaify(Math.round(royalty * 0.95 * 100) / 100, true)}
              <Text
                fontFamily="body"
                as="span"
                color="inherit"
                fontSize="body.lg"
              >
                {" "}
                USDC
              </Text>
            </Heading>
            <StatHelpText fontSize="sm">
              95% of royalty:{" "}
              <Text as="span" fontFamily="mono">
                {commaify(Math.round(percent * 0.95 * 100) / 100)}%
              </Text>
            </StatHelpText>
          </Stat>

          <Stat p={[4, 4, 8]} pb={[6, 6, 8]} flexGrow={0}>
            <Heading as={StatLabel} size="subtitle.md">
              Our fees
            </Heading>
            <Heading
              as={StatNumber}
              size="title.lg"
              fontSize={{
                base: "title.md",
                md: "title.xl",
              }}
              fontFamily="mono"
              color="twurple.500"
            >
              {commaify(Math.round(royalty * 0.05 * 100) / 100, true)}
              <Text
                fontSize="body.lg"
                fontFamily="body"
                as="span"
                color="inherit"
              >
                {" "}
                USDC
              </Text>
            </Heading>
            <StatHelpText fontSize="sm">
              5% of royalty:{" "}
              <Text as="span" fontFamily="mono">
                {commaify(Math.round(percent * 0.05 * 100) / 100)}%
              </Text>
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </Flex>
      <AnimatedGradient
        opacity={1}
        zIndex={-1}
        w="100%"
        position="absolute"
        top={0}
        left={0}
      />
    </Box>
  );
};

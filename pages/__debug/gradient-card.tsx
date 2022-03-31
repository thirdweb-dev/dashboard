import { ConsolePage } from "../_app";
import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

const GradientCardTestPage: ConsolePage = () => {
  return (
    <Container maxW="container.page">
      <Flex my={12} gap={12} flexDir="column">
        <GradientCard gradients={["purple.500", "blue.500"]}>
          <Box h="750px" />
        </GradientCard>
        <GradientCard gradients={["purple.500", "#FF8D5C"]}>
          <Box h="750px" />
        </GradientCard>
        <GradientCard gradients={["purple.500", "#FF5C83"]}>
          <Box h="750px" />
        </GradientCard>
      </Flex>
    </Container>
  );
};

export default GradientCardTestPage;

export interface GradientCardProps {
  variant?: "subtle";
  gradients: [string, string];
}

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  variant = "subtle",
  gradients,
}) => {
  return (
    <Box
      bg="#11141E"
      position="relative"
      overflow="hidden"
      borderRadius="3xl"
      py={"64px"}
    >
      <Box zIndex={2}>{children}</Box>
      <Box position="absolute" top={0} bottom={0} left={0} right={0}>
        {variant === "subtle" ? (
          <Box
            position="absolute"
            bottom={{ base: 0, md: "-10%" }}
            left="-25%"
            right="-25%"
            h="300px"
            filter="blur(300px)"
          >
            {gradients.map((g, idx) => (
              <Box
                position="absolute"
                left={idx === 0 ? 0 : undefined}
                right={idx === 1 ? 0 : undefined}
                w="75%"
                h="100%"
                borderRadius="50%"
                key={`${g}_${idx}`}
                background={g}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

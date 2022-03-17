import { Center, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Card } from "components/layout/Card";
import * as React from "react";
import { CreateProjectButton } from "./CreateProjectButton";

export const NoProjectsFound: React.FC = () => {
  return (
    <Center w="100%">
      <Container as={Card}>
        <Stack py={7} align="center" spacing={7} w="100%">
          <ChakraNextImage
            src={require("public/assets/illustrations/no-apps-cube.png")}
            alt="no apps"
            boxSize={20}
            maxW="200px"
            mb={3}
          />
          <Heading size="title.lg" textAlign="center">
            Let&apos;s build your first project
          </Heading>
          <Text size="subtitle.lg">Create your web3 app in minutes</Text>
          <CreateProjectButton />
        </Stack>
      </Container>
    </Center>
  );
};

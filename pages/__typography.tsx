import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ConsolePage } from "./_app";

const TypographyPage: ConsolePage = () => {
  return (
    <Stack>
      <Box py={8}>
        <Container maxW="container.page">
          <Stack spacing="72px">
            <Stack>
              <Heading size="display.lg">
                Display Large/Inter/Extrabold/72px
              </Heading>
              <Heading size="display.md">
                Display Medium/Inter/Extrabold/64px
              </Heading>
              <Heading size="display.sm">
                Display Small/Inter/Extrabold/56px
              </Heading>
            </Stack>
            <Divider />
            <Stack>
              <Heading size="title.lg">Title Large/Inter/Bold/32px</Heading>
              <Heading size="title.md">Title Medium/Inter/Bold/24px</Heading>
              <Heading size="title.sm">Title Small/Inter/Bold/20px</Heading>
            </Stack>
            <Divider />
            <Stack>
              <Heading size="subtitle.lg">
                Subtitle Large/Inter/Bold/24px
              </Heading>
              <Heading size="subtitle.md">
                Subtitle Medium/Inter/Bold/20px
              </Heading>
              <Heading size="subtitle.sm">
                Subtitle Small/Inter/Bold/16px
              </Heading>
            </Stack>
            <Divider />
            <Stack>
              <Text size="label.lg">Label Large/Inter/Bold/16px</Text>
              <Text size="label.md">Label Medium/Inter/Bold/14px</Text>
              <Text size="label.sm">Label Small/Inter/Bold/12px</Text>
            </Stack>
            <Divider />
            <Stack>
              <Text size="body.lg">Body Large/Inter/Bold/16px</Text>
              <Text size="body.md">Body Medium/Inter/Bold/14px</Text>
              <Text size="body.sm">Body Small/Inter/Bold/12px</Text>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box bg="black" py={8}>
        <Container maxW="container.page">
          <Stack spacing="72px">
            <Stack>
              <Heading variant="light" size="display.lg">
                Display Large/Inter/Extrabold/72px
              </Heading>
              <Heading variant="light" size="display.md">
                Display Medium/Inter/Extrabold/64px
              </Heading>
              <Heading variant="light" size="display.sm">
                Display Small/Inter/Extrabold/56px
              </Heading>
            </Stack>
            <Divider />
            <Stack>
              <Heading variant="light" size="title.lg">
                Title Large/Inter/Bold/32px
              </Heading>
              <Heading variant="light" size="title.md">
                Title Medium/Inter/Bold/24px
              </Heading>
              <Heading variant="light" size="title.sm">
                Title Small/Inter/Bold/20px
              </Heading>
            </Stack>
            <Divider />
            <Stack>
              <Heading variant="light" size="subtitle.lg">
                Subtitle Large/Inter/Bold/24px
              </Heading>
              <Heading variant="light" size="subtitle.md">
                Subtitle Medium/Inter/Bold/20px
              </Heading>
              <Heading variant="light" size="subtitle.sm">
                Subtitle Small/Inter/Bold/16px
              </Heading>
            </Stack>
            <Divider />
            <Stack>
              <Text variant="light" size="label.lg">
                Label Large/Inter/Bold/16px
              </Text>
              <Text variant="light" size="label.md">
                Label Medium/Inter/Bold/14px
              </Text>
              <Text variant="light" size="label.sm">
                Label Small/Inter/Bold/12px
              </Text>
            </Stack>
            <Divider />
            <Stack>
              <Text variant="light" size="body.lg">
                Body Large/Inter/Bold/16px
              </Text>
              <Text variant="light" size="body.md">
                Body Medium/Inter/Bold/14px
              </Text>
              <Text variant="light" size="body.sm">
                Body Small/Inter/Bold/12px
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
};

export default TypographyPage;

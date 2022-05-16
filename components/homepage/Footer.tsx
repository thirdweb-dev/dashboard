import {
  Box,
  ButtonGroup,
  Container,
  DarkMode,
  Divider,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  LightMode,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { useTrack } from "hooks/analytics/useTrack";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";
import { Button, Heading, LinkButton, TrackedLink } from "tw-components";
import { sendEmailToConvertkit } from "utils/convertkit";

export const HomepageFooter: React.FC = () => {
  const { register, handleSubmit, setError } = useForm<{ email: string }>();
  const { trackEvent } = useTrack();
  return (
    <Box bgColor="#111315" zIndex="100">
      <Container as="footer" maxW="container.page" color="gray.500">
        <Box p={16} px={{ base: 4, md: 16 }} mx="auto">
          <Heading
            size="label.md"
            textTransform="uppercase"
            pb={5}
            textAlign="center"
          >
            20,000+ builders joined our bi-weekly newsletter
          </Heading>
          <Stack
            as="form"
            spacing="4"
            direction={{ base: "column", sm: "row" }}
            mx="auto"
            maxW={{ lg: "450px" }}
          >
            <InputGroup display="flex">
              <InputLeftElement pointerEvents="none">
                <Icon as={HiOutlineMail} />
              </InputLeftElement>
              <Input
                variant="outline"
                borderColor="rgba(255,255,255,.2)"
                placeholder="Email address"
                type="email"
                borderRadius="lg"
                required
                {...register("email")}
              />
              <InputRightElement w="auto" pr={1}>
                <LightMode>
                  <Button
                    size="sm"
                    variant="gradient"
                    fromcolor="#1D64EF"
                    tocolor="#E0507A"
                    type="submit"
                    borderRadius="md"
                    borderWidth="1px"
                    flexShrink={0}
                    onSubmit={handleSubmit(async ({ email }) => {
                      try {
                        await sendEmailToConvertkit(email);
                      } catch (err) {
                        console.error(
                          "failed to send email to convertkit",
                          err,
                        );
                        setError("email", {
                          message:
                            err instanceof Error
                              ? err.message
                              : "Something went wrong",
                        });
                      }
                    })}
                  >
                    <Box as="span">Get web3 scoops</Box>
                  </Button>
                </LightMode>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Box>
        <DarkMode>
          <Divider borderColor="rgba(255,255,255,0.1)" />
        </DarkMode>
        <Stack
          spacing="8"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          py={{ base: "12", md: "16" }}
        >
          <Stack spacing={{ base: "6", md: "8" }} align="start">
            <Logo color="#fff" />
            <ButtonGroup variant="ghost">
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://twitter.com/thirdweb_"
                aria-label="Twitter"
                icon={<SiTwitter fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "twitter",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://discord.gg/thirdweb"
                aria-label="Discord"
                icon={<SiDiscord fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "discord",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://www.youtube.com/channel/UCdzMx7Zhy5va5End1-XJFbA"
                aria-label="YouTube"
                icon={<SiYoutube fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "youtube",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://www.linkedin.com/company/third-web/"
                aria-label="LinkedIn"
                icon={<SiLinkedin fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "linkedin",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://www.instagram.com/thirdweb/"
                aria-label="Instagram"
                icon={<SiInstagram fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "instagram",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://www.tiktok.com/@thirdweb"
                aria-label="TikTok"
                icon={<SiTiktok fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "tiktok",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://github.com/thirdweb-dev"
                aria-label="GitHub"
                icon={<SiGithub fontSize="1.25rem" />}
                onClick={() =>
                  trackEvent({
                    category: "footer",
                    action: "click",
                    label: "github",
                  })
                }
              />
            </ButtonGroup>
          </Stack>
          <Stack
            direction={{ base: "column-reverse", md: "column", lg: "row" }}
            spacing={{ base: "12", md: "8" }}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">Product</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <TrackedLink
                    href="#features"
                    category="footer"
                    label="features"
                  >
                    Features
                  </TrackedLink>
                  <TrackedLink href="#fees" category="footer" label="pricing">
                    Pricing
                  </TrackedLink>
                  <TrackedLink
                    href="/dashboard"
                    category="footer"
                    label="dashboard"
                  >
                    Dashboard
                  </TrackedLink>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">Company</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <TrackedLink
                    isExternal
                    href="https://portal.thirdweb.com"
                    category="footer"
                    label="portal"
                  >
                    Developer Portal
                  </TrackedLink>
                  <TrackedLink
                    isExternal
                    href="https://blog.thirdweb.com/"
                    category="footer"
                    label="blog"
                  >
                    Blog
                  </TrackedLink>
                  <TrackedLink
                    isExternal
                    href="https://portal.thirdweb.com/guides"
                    category="footer"
                    label="guides"
                  >
                    Guides
                  </TrackedLink>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">SDKs</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <TrackedLink
                    isExternal
                    href="https://portal.thirdweb.com/typescript"
                    category="footer"
                    label="javascript"
                  >
                    JavaScript
                  </TrackedLink>
                  <TrackedLink
                    isExternal
                    href="https://portal.thirdweb.com/react"
                    category="footer"
                    label="react"
                  >
                    React
                  </TrackedLink>
                  <TrackedLink
                    isExternal
                    href="https://portal.thirdweb.com/python"
                    category="footer"
                    label="python"
                  >
                    Python
                  </TrackedLink>
                  <TrackedLink
                    isExternal
                    href="https://portal.thirdweb.com/contracts"
                    category="footer"
                    label="contracts"
                  >
                    Contracts
                  </TrackedLink>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">Legal</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <TrackedLink
                    isExternal
                    href="/privacy"
                    category="footer"
                    label="privacy"
                  >
                    Privacy policy
                  </TrackedLink>
                  <TrackedLink
                    isExternal
                    href="/tos"
                    category="footer"
                    label="terms"
                  >
                    Terms of service
                  </TrackedLink>
                </Stack>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

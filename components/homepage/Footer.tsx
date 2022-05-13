import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { useForm } from "react-hook-form";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Button, Heading, Link } from "tw-components";
import { sendEmailToConvertkit } from "utils/convertkit";

export const HomepageFooter = () => {
  const { register, handleSubmit, setError } = useForm<{ email: string }>();
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
                placeholder="Your email address"
                type="email"
                borderRadius="lg"
                required
                {...register("email")}
              />
              <InputRightElement w="auto" pr={1}>
                <Button
                  size="sm"
                  variant="gradient"
                  fromcolor="#E838D0"
                  tocolor="#FA6E66"
                  type="submit"
                  borderRadius="md"
                  borderWidth="1px"
                  flexShrink={0}
                  onSubmit={handleSubmit(async ({ email }) => {
                    try {
                      await sendEmailToConvertkit(email);
                    } catch (err) {
                      console.error("failed to send email to convertkit", err);
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
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Box>
        <Divider />
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
                as="a"
                href="https://twitter.com/thirdweb_"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://www.youtube.com/channel/UCdzMx7Zhy5va5End1-XJFbA"
                aria-label="YouTube"
                icon={<FaYoutube fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/company/third-web/"
                aria-label="LinkedIn"
                icon={<FaLinkedin fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://github.com/thirdweb-dev"
                aria-label="GitHub"
                icon={<FaGithub fontSize="1.25rem" />}
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
                  <Link href="#features">Features</Link>
                  <Link href="#fees">Pricing</Link>
                  <Link href="/dashboard">Dashboard</Link>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">Company</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <Link isExternal href="https://portal.thirdweb.com">
                    Developer Portal
                  </Link>
                  <Link isExternal href="https://blog.thirdweb.com/">
                    Blog
                  </Link>
                  <Link isExternal href="https://portal.thirdweb.com/guides">
                    Guides
                  </Link>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">SDKs</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <Link
                    isExternal
                    href="https://portal.thirdweb.com/typescript"
                  >
                    JavaScript
                  </Link>
                  <Link isExternal href="https://portal.thirdweb.com/react">
                    React
                  </Link>
                  <Link isExternal href="https://portal.thirdweb.com/python">
                    Python
                  </Link>
                  <Link isExternal href="https://portal.thirdweb.com/contracts">
                    Solidity
                  </Link>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Heading size="label.lg">Legal</Heading>
                <Stack spacing="3" shouldWrapChildren>
                  <Link isExternal href="/privacy">
                    Privacy policy
                  </Link>
                  <Link isExternal href="/tos">
                    Terms of service
                  </Link>
                </Stack>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

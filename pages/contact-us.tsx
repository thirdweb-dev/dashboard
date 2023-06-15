import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { PartnerLogo } from "components/partners/partner-logo";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { PageId } from "page-id";
import { useForm } from "react-hook-form";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Button, Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

interface FormSchema {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  jobtitle: string;
  size_of_company: string;
  product_type: string;
  products: string;
  when_do_you_expect_to_launch_: string;
}

const ContactUs: ThirdwebNextPage = () => {
  const form = useForm<FormSchema>();

  return (
    <Flex justify="center" flexDir="column" as="main" bg="#000">
      <HomepageTopNav />
      <HomepageSection py={24} mx="auto">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap={14}
        >
          <Flex flexDir="column" gap={8}>
            <Heading size="display.sm">
              Discover how <br />
              <Box
                as="span"
                bgClip="text"
                bgGradient="linear(to-tr, #3387FF, #95BBF2)"
              >
                Web3 can 10x <br /> your business.
              </Box>
            </Heading>
            <Text size="label.lg">
              Speak to our team of Web3 experts to <br />
              learn how we can get you shipping faster.
            </Text>
            <List as={Flex} flexDir="column" gap={3}>
              <ListItem>
                <Flex gap={2} alignItems="center">
                  <Image
                    src="/assets/dashboard/extension-check.svg"
                    alt=""
                    objectFit="contain"
                    mb="2px"
                  />
                  <Text size="body.lg">
                    Technical support from real Web3 developers
                  </Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex gap={2} alignItems="center">
                  <Image
                    src="/assets/dashboard/extension-check.svg"
                    alt=""
                    objectFit="contain"
                    mb="2px"
                  />
                  <Text size="body.lg">
                    Help figuring out the solution you need
                  </Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex gap={2} alignItems="center">
                  <Image
                    src="/assets/dashboard/extension-check.svg"
                    alt=""
                    objectFit="contain"
                    mb="2px"
                  />
                  <Text size="body.lg">
                    Personalized demos of our products and solutions
                  </Text>
                </Flex>
              </ListItem>
            </List>
            <TrustedBy display={{ base: "none", md: "flex" }} />
          </Flex>
          <Card bgColor="white" p={{ base: 6, md: 12 }}>
            <Flex flexDir="column" gap={4} as="form">
              <Flex gap={4}>
                <FormControl gap={6} isRequired>
                  <Input
                    h={14}
                    borderColor="gray.300"
                    placeholder="First name *"
                    color="black"
                    _placeholder={{ color: "gray.700" }}
                    {...form.register("firstname", { required: true })}
                  />
                </FormControl>
                <FormControl gap={6} isRequired>
                  <Input
                    h={14}
                    borderColor="gray.300"
                    placeholder="Last name *"
                    color="black"
                    _placeholder={{ color: "gray.700" }}
                    {...form.register("lastname", { required: true })}
                  />
                </FormControl>
              </Flex>
              <FormControl gap={6} isRequired>
                <Input
                  h={14}
                  borderColor="gray.300"
                  placeholder="Your email *"
                  color="black"
                  _placeholder={{ color: "gray.700" }}
                  {...form.register("email", { required: true })}
                />
              </FormControl>
              <FormControl gap={6} isRequired>
                <Input
                  h={14}
                  borderColor="gray.300"
                  placeholder="Your Company *"
                  color="black"
                  _placeholder={{ color: "gray.700" }}
                  {...form.register("company", { required: true })}
                />
              </FormControl>
              <FormControl gap={6} isRequired>
                <Input
                  h={14}
                  borderColor="gray.300"
                  placeholder="Job Title *"
                  color="black"
                  _placeholder={{ color: "gray.700" }}
                  {...form.register("jobtitle", { required: true })}
                />
              </FormControl>
              <FormControl gap={6} isRequired>
                <Select
                  h={14}
                  borderColor="gray.300"
                  placeholder="Size of Company *"
                  color={form.watch("size_of_company") ? "black" : "gray.700"}
                  {...form.register("size_of_company", { required: true })}
                >
                  <option value="solo">Solo</option>
                  <option value="2-10">2-10</option>
                  <option value="11-49">11-49</option>
                  <option value="500-99">500-99</option>
                  <option value="100-249">100-249</option>
                  <option value="250+">250</option>
                </Select>
              </FormControl>
              <FormControl gap={6} isRequired>
                <Select
                  h={14}
                  borderColor="gray.300"
                  placeholder="What industry is your company most closely aligned with? *&nbsp;&nbsp;&nbsp;"
                  color={form.watch("product_type") ? "black" : "gray.700"}
                  {...form.register("product_type", { required: true })}
                >
                  <option value="Brand / Commerce">Brand / Commerce</option>
                  <option value="Game">Game</option>
                  <option value="Tech">Tech</option>
                  <option value="Protocols & Chains">Protocols & Chains</option>
                </Select>
              </FormControl>
              <FormControl gap={6}>
                <Select
                  h={14}
                  borderColor="gray.300"
                  placeholder="What solution are you most interested in?"
                  color={form.watch("products") ? "black" : "gray.700"}
                  {...form.register("products")}
                >
                  <option value="GamingKit">GamingKit</option>
                  <option value="CommerceKit">CommerceKit</option>
                  <option value="MintingAPI">Minting API</option>
                  <option value="Wallets">Wallets</option>
                  <option value="Marketplaces">Marketplaces</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl gap={6} isRequired>
                <Select
                  h={14}
                  borderColor="gray.300"
                  placeholder="When do you expect to launch? *"
                  color={
                    form.watch("when_do_you_expect_to_launch_")
                      ? "black"
                      : "gray.700"
                  }
                  {...form.register("when_do_you_expect_to_launch_", {
                    required: true,
                  })}
                >
                  <option value="ASAP">ASAP</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="1+ year">1+ year</option>
                </Select>
              </FormControl>
              <Box color="white" mx={{ base: "auto", md: "inherit" }}>
                <Button
                  bg="black"
                  _hover={{ bg: "black", opacity: 0.8 }}
                  px={8}
                  py={6}
                  leftIcon={<Icon as={BsFillLightningChargeFill} />}
                >
                  <Text color="white" size="label.lg">
                    Submit
                  </Text>
                </Button>
              </Box>
            </Flex>
          </Card>
          <TrustedBy display={{ base: "flex", md: "none" }} mt={0} />
        </Flex>
      </HomepageSection>
      <HomepageFooter />
    </Flex>
  );
};

const TrustedBy: React.FC<FlexProps> = (flexProps) => {
  return (
    <Flex flexDir="column" gap={8} mt={10} {...flexProps}>
      <Heading size="subtitle.md" color="white">
        Trusted by leading companies
      </Heading>
      <SimpleGrid
        columns={{ base: 2, md: 3 }}
        mx="auto"
        gap={6}
        px={{ base: 8, md: 0 }}
      >
        <PartnerLogo partner="shopify" />
        <PartnerLogo partner="animoca" />
        <PartnerLogo partner="coinbase" />
        <PartnerLogo partner="polygon" />
        <PartnerLogo partner="gala_games" />
        <PartnerLogo partner="mirror" />
      </SimpleGrid>
    </Flex>
  );
};

ContactUs.pageId = PageId.ContactUs;

export default ContactUs;

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import { Heading, Text } from "tw-components";

export const FAQ: React.FC = () => {
  return (
    <Container
      maxW={{
        base: "full",
        md: "55%",
      }}
      display="flex"
      flexDirection="column"
    >
      <Heading fontSize="3.5rem" alignSelf="center">
        FAQ
      </Heading>
      <Accordion mt={8} allowMultiple rounded="xl">
        <AccordionItem>
          <Text fontSize="1rem">
            <AccordionButton p={6}>
              <Box as="span" flex="1" textAlign="left">
                Who is eligible to claim?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <Flex gap={4} flexDirection="column">
              <Text>
                Any wallet which has deployed a smart contract between the dates
                of 2022-01-01 and 2023-04-01 to the following blockchains is
                eligible to claim:
              </Text>
              <UnorderedList>
                <ListItem>Ethereum</ListItem>
                <ListItem>
                  Polygon <br />
                </ListItem>
                <ListItem>
                  Avax <br />
                </ListItem>
                <ListItem>
                  Fantom <br />
                </ListItem>
                <ListItem>
                  Goerli <br />
                </ListItem>
                <ListItem>
                  Mumbai <br />
                </ListItem>
              </UnorderedList>
              <Text>
                Whilst we appreciate there are many more chains with thousands
                more builders, technical limitations in scraping this data meant
                we could only make the above chains eligible.{" "}
              </Text>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Text fontSize="1rem">
            <AccordionButton p={6}>
              <Box as="span" flex="1" textAlign="left">
                What can I win?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <Flex gap={4} flexDirection="column">
              <Box>
                <Text fontWeight="bold">Common</Text>
                <Text fontWeight="normal">Bear Market Builder NFT</Text>
              </Box>

              <Box>
                <Text
                  fontWeight="bold"
                  bgGradient="linear(to-r, #4830A4, #9786DF)"
                  bgClip="text"
                  w="min-content"
                >
                  Rare
                </Text>
                <Text fontWeight="normal">
                  thirdweb pro early access NFT <br />
                  1 MATIC <br />
                  5 MATIC <br />
                  0.1 ETH <br />
                  1 ETH <br />
                  1K AWS Credits
                </Text>
              </Box>

              <Box>
                <Text
                  fontWeight="bold"
                  bgGradient="linear(to-r, #C35AB1, #E9A8D9)"
                  bgClip="text"
                  w="min-content"
                >
                  Legendary
                </Text>
                <Text fontWeight="normal">
                  Lexica AI Art Pass <br />
                  Club IRL NFT <br />
                  Consensus 2023 Two-Day Pass <br />
                  CPG Genesis NFT
                </Text>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Text fontSize="1rem">
            <AccordionButton p={6}>
              <Box as="span" flex="1" textAlign="left">
                How does the airdrop work?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <Flex direction="column" gap={4}>
              <Text>
                We have compiled a list of every wallet address which deployed a
                smart contract between <b>January 1st 2022</b> and{" "}
                <b>April 1st 2023</b>. These addresses have been added to a
                whitelist which will allow you to claim an ERC1155 NFT
              </Text>
              <Text>
                The ERC1155 NFT is an NFT lootbox which uses{" "}
                <Link
                  style={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                  href="https://portal.thirdweb.com/pre-built-contracts/pack"
                  rel="noreferrer"
                  target="_blank"
                >
                  thirdweb&apos;s pack contract
                </Link>{" "}
                to bundle other tokens together. When a lootbox is opened, a
                pre-defined quantity of tokens are randomly selected from the
                ones that were used to create the packs (that haven&apos;t
                already been selected), and awarded to the opener. The pack NFT
                is burned as it&apos;s opened.
              </Text>
              <Text>
                These ‘tokens’ are ERC721 NFTs, and some of which can be
                ‘redeemed’ for the prizes listed above.
              </Text>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Text fontSize="1rem">
            <AccordionButton p={6}>
              <Box as="span" flex="1" textAlign="left">
                How do I redeem a prize?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <Flex direction="column" gap={4}>
              <Text>There are three different ways to redeem a prize:</Text>
              <Text fontWeight="bold">In Pack</Text>
              <Text>
                For some prizes, they will be wrapped inside the packs
                themselves. When you open the pack, these prizes will be
                automatically sent to your wallet.
              </Text>
              <Text>The following prizes will follow this method:</Text>
              <UnorderedList>
                <ListItem>Bear Market Builder NFT</ListItem>
                <ListItem>thirdweb pro early access NFT</ListItem>
                <ListItem>1 MATIC</ListItem>
                <ListItem>5 MATIC</ListItem>
                <ListItem>0.1 ETH</ListItem>
                <ListItem>1 ETH</ListItem>
              </UnorderedList>
              <Text fontWeight="bold">NFT Airdrop</Text>
              <Text>
                For some prizes, you will be sent a placeholder NFT once you
                have opened the pack. At a later date, you will be airdropped
                your prize directly into your wallet.
              </Text>
              <Text>The following prizes will follow this method:</Text>
              <UnorderedList>
                <ListItem>CPG Genesis NFT</ListItem>
              </UnorderedList>
              <Text fontWeight="bold">Email</Text>
              <Text>
                For some prizes, you will receive an email with instructions on
                how to claim or receive your prize. For this reason, please make
                sure you include a correct email address at the start of the
                claim flow.
              </Text>
              <Text>The following prizes will follow this method:</Text>
              <UnorderedList>
                <ListItem>Lexica AI Art Pass</ListItem>
                <ListItem>Club IRL NFT</ListItem>
                <ListItem>Consensus 2023 Two-Day Pass</ListItem>
              </UnorderedList>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

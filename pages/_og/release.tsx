import { Box, Flex, Icon } from "@chakra-ui/react";
import { ChainId } from "@thirdweb-dev/react";
import { MaskedAvatar } from "components/contract-components/releaser/masked-avatar";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { FiBox } from "react-icons/fi";
import { Heading, Text } from "tw-components";

export default function OGReleaseImage() {
  return (
    <CustomSDKContext desiredChainId={ChainId.Polygon}>
      <Box
        position="fixed"
        top={0}
        bottom={0}
        right={0}
        left={0}
        bg="black"
        overflow="hidden"
      >
        <Box
          position="absolute"
          left={0}
          bottom={0}
          top={0}
          w="50%"
          bg="url(/assets/og-image/purple-gradient.png)"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="left bottom"
          zIndex={-1}
        />
        <Box
          position="absolute"
          right={0}
          bottom={0}
          top={0}
          w="50%"
          bg="url(/assets/og-image/blue-gradient.png)"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="right top"
          zIndex={-1}
        />
        <Flex
          p="70px"
          w="100%"
          height="100%"
          direction="column"
          align="space-between"
        >
          <Flex direction="row" justify="space-between" align="center" w="100%">
            <Flex
              flexGrow={0}
              w="calc(1200px - 140px - 70px - 150px)"
              direction="column"
            >
              <Flex direction="row" align="center" gap="14px">
                <Icon
                  boxSize="50px"
                  color="gray.700"
                  as={FiBox}
                  flexShrink={0}
                />
                <Heading
                  noOfLines={1}
                  size="title.lg"
                  fontSize="64px"
                  fontWeight={700}
                >
                  ERC721DropRestrictedMarkets
                </Heading>
              </Flex>
              <Text
                noOfLines={2}
                size="body.2xl"
                fontSize="32px"
                lineHeight={1.5}
              >
                ERC721 Drop contract that can disable trading on certain
                marketplaces
              </Text>
            </Flex>
            <Flex
              flexGrow={0}
              flexShrink={0}
              direction="column"
              gap="16px"
              align="center"
              textAlign="center"
            >
              <MaskedAvatar
                boxSize={128}
                src="https://gateway.thirdweb.dev/ipfs/QmUtyhSLAWz4udJBHN79iwWcM4N45N8NMTYN5iCehktTrK/0.png"
              />
              <Heading size="subtitle.lg">joenrv.eth</Heading>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </CustomSDKContext>
  );
}

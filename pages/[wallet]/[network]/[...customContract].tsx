import type { ConsolePage } from "../../_app";
import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
  usePrevious,
} from "@chakra-ui/react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { Logo } from "components/logo";
import { LinkButton } from "components/shared/LinkButton";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { FeatureIconMap } from "constants/mappings";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { isBrowser } from "utils/isBrowser";

export function useResolvedContract(contractAddress?: string) {
  const sdk = useSDK();

  return useQueryWithNetwork(
    ["contract", contractAddress],
    async () => {
      if (!contractAddress || !sdk) {
        return undefined;
      }

      try {
        const contractType = await sdk.resolveContractType(contractAddress);
        return {
          contractType,
          contract: sdk.getContract(contractAddress, contractType),
        };
      } catch (err) {
        console.info("failed to load contract type, custom contract");
      }
      const contract = await sdk.unstable_getCustomContract(contractAddress);
      return {
        contractType: "custom",
        contract,
      };
    },
    {
      enabled: !!sdk && !!contractAddress,
    },
  );
}

const CustomContractPage: ConsolePage = () => {
  const router = useRouter();
  const query = router.query.customContract || [];
  const contractAddress = query[0];
  const activeTab = query[1] || "";

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLElement>();

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById("tw-scroll-container");

    if (el) {
      scrollContainerRef.current = el;
    }
  }, []);

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < -5) {
        setIsScrolled(false);
      } else if (currPos.y >= -5) {
        setIsScrolled(true);
      }
    },
    [isMobile],
    scrollRef,
    false,
    16,
    scrollContainerRef,
  );

  return (
    <Flex direction="column" ref={scrollRef}>
      {/* sub-header-nav */}
      <Box
        position="sticky"
        top={0}
        borderBottomColor="borderColor"
        borderBottomWidth={1}
        bg="backgroundHighlight"
        flexShrink={0}
        w="full"
        as="nav"
      >
        <Container maxW="container.page">
          <Flex direction="row" align="center">
            <Button
              borderRadius="none"
              variant="unstyled"
              transition="all .25s ease"
              transform={
                isScrolled ? "translateZ(0px)" : "translate3d(0,-20px,0)"
              }
              opacity={isScrolled ? 1 : 0}
              visibility={isScrolled ? "visible" : "hidden"}
              onClick={() =>
                scrollContainerRef.current?.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              <Logo hideWordmark />
            </Button>
            <Box
              transition="all .25s ease"
              transform={
                isScrolled
                  ? "translate3d(18px,0,0)"
                  : `translate3d(calc(var(--chakra-sizes-${
                      isMobile ? "9" : "10"
                    }) * -1),0,0)`
              }
            >
              <ContractSubnav
                contractAddress={contractAddress}
                activeTab={activeTab}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
      {/* sub-header */}
      <Box
        borderBottomColor="borderColor"
        borderBottomWidth={1}
        bg="backgroundHighlight"
        w="full"
        as="aside"
        py={6}
      >
        <Container maxW="container.page">
          <Flex justify="space-between" align="center" direction="row">
            <ContractMetadata contractAddress={contractAddress} />
            <AddressCopyButton address={contractAddress} />
          </Flex>
        </Container>
      </Box>
      {/* main content */}
      <Container maxW="container.page">
        <Box height="300vh" py={8}>
          {activeTab === ""
            ? "Contract overview here"
            : "Contract settings here"}
        </Box>
      </Container>
    </Flex>
  );
};

export default CustomContractPage;

CustomContractPage.Layout = AppLayout;
function useContractMetadataQuery(
  contractAddress: string,
  contractQuery: ReturnType<typeof useResolvedContract>,
) {
  return useQueryWithNetwork(
    ["contract", contractAddress, "metadata"],
    () => {
      return contractQuery.data?.contract.metadata.get();
    },
    {
      enabled:
        !!contractQuery.data?.contract.metadata &&
        !!("get" in contractQuery.data.contract.metadata),
    },
  );
}

interface ContractMetadataProps {
  contractAddress: string;
}

const ContractMetadata: React.VFC<ContractMetadataProps> = ({
  contractAddress,
}) => {
  const contractQuery = useResolvedContract(contractAddress);
  const metadataQuery = useContractMetadataQuery(
    contractAddress,
    contractQuery,
  );

  const isError = metadataQuery.isError || contractQuery.isError;
  const isSuccess = metadataQuery.isSuccess;

  const contractType = contractQuery.data?.contractType;
  const contractTypeImage =
    (contractType &&
      contractType !== "custom" &&
      FeatureIconMap[contractType]) ||
    FeatureIconMap["vote"];

  if (isError) {
    return <Box>Failed to load contract metadata</Box>;
  }

  return (
    <Flex align="center" gap={2}>
      <Skeleton isLoaded={isSuccess}>
        {metadataQuery.data?.image ? (
          <Image
            objectFit="contain"
            boxSize="64px"
            src={metadataQuery.data.image}
            alt={metadataQuery.data?.name}
          />
        ) : contractTypeImage ? (
          <ChakraNextImage
            boxSize="64px"
            src={contractTypeImage}
            alt={metadataQuery.data?.name || ""}
          />
        ) : null}
      </Skeleton>
      <Flex direction="column" gap={1}>
        <Skeleton isLoaded={isSuccess}>
          <Heading size="title.md">
            {isSuccess ? metadataQuery.data?.name : "testing testing testing"}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={isSuccess}>
          <Text size="body.md">
            {isSuccess ? metadataQuery.data?.description : "foo bar baz"}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

interface ContractSubnavProps {
  activeTab: string;
  contractAddress?: string;
}
const ContractSubnav: React.VFC<ContractSubnavProps> = ({
  activeTab,
  contractAddress,
}) => {
  const [hoveredEl, setHoveredEl] = useState<EventTarget & HTMLButtonElement>();
  const previousEl = usePrevious(hoveredEl);
  const isMouseOver = useRef(false);

  const router = useRouter();

  return (
    <Flex
      direction="row"
      gap={0}
      position="relative"
      align="center"
      role="group"
      ml={-3}
      onMouseOver={() => {
        isMouseOver.current = true;
      }}
      onMouseOut={() => {
        isMouseOver.current = false;
        setTimeout(() => {
          if (!isMouseOver.current) {
            setHoveredEl(undefined);
          }
        }, 10);
      }}
    >
      <Box
        position="absolute"
        transitionDuration={previousEl && hoveredEl ? "150ms" : "0ms"}
        w={hoveredEl?.clientWidth || 0}
        h="66%"
        transform={`translate3d(${hoveredEl?.offsetLeft || 0}px,0,0)`}
        bg="inputBgHover"
        borderRadius="md"
      />
      <ContractSubNavLinkButton
        onHover={setHoveredEl}
        isActive={activeTab === ""}
        href={{
          pathname: router.pathname,
          query: {
            ...router.query,
            customContract: [contractAddress || "", ""],
          },
        }}
      >
        Overview
      </ContractSubNavLinkButton>
      <ContractSubNavLinkButton
        onHover={setHoveredEl}
        isActive={activeTab === "settings"}
        href={{
          pathname: router.pathname,
          query: {
            ...router.query,
            customContract: [contractAddress || "", "settings"],
          },
        }}
      >
        Settings
      </ContractSubNavLinkButton>
    </Flex>
  );
};
interface ContractSubNavLinkButton {
  href: string | LinkProps["href"];
  onHover: (event: EventTarget & HTMLButtonElement) => void;
  isActive: boolean;
}

const ContractSubNavLinkButton: React.FC<ContractSubNavLinkButton> = (
  props,
) => {
  const onClick = useCallback(() => {
    if (isBrowser()) {
      document.getElementById("tw-scroll-container")?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <LinkButton
      _focus={{
        boxShadow: "none",
      }}
      variant="unstyled"
      onMouseOverCapture={(e) => props.onHover(e.currentTarget)}
      size="sm"
      height="auto"
      p={3}
      color="heading"
      borderRadius="none"
      _after={
        props.isActive
          ? {
              content: `""`,
              position: "absolute",
              bottom: "0",
              left: 3,
              right: 3,
              height: "2px",
              bg: "heading",
            }
          : undefined
      }
      href={props.href}
      onClick={onClick}
    >
      {props.children}
    </LinkButton>
  );
};

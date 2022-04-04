import type { ConsolePage } from "../../_app";
import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  useBreakpointValue,
  usePrevious,
} from "@chakra-ui/react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useContract, useSDK } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { Logo } from "components/logo";
import { LinkButton } from "components/shared/LinkButton";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function useContractTypeResolver(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    ["contractType", contractAddress],
    () =>
      contractAddress ? sdk?.resolveContractType(contractAddress) : undefined,
    {
      enabled: !!contractAddress && !!sdk,
    },
  );
}

export function useResolvedContract(contractAddress?: string) {
  const resolvedContractType = useContractTypeResolver(contractAddress);

  return {
    ...resolvedContractType,
    data: useContract(resolvedContractType.data, contractAddress),
  };
}

const CustomContractPage: ConsolePage = () => {
  const router = useRouter();
  const query = router.query.customContract || [];
  const contractAddress = query[0];

  const contract = useResolvedContract(contractAddress);

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

  if (!contract.data && contract.isLoading) {
    return <Spinner />;
  }

  // console.log("*** contract", contract);
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
        <Container py={2} maxW="container.page">
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
                  ? "translate3d(8px,0,0)"
                  : `translate3d(calc(var(--chakra-sizes-${
                      isMobile ? "9" : "10"
                    }) * -1),0,0)`
              }
            >
              <ContractSubnav contractQuery={contract} />
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
          <Box>sub header goes here</Box>
        </Container>
      </Box>
      {/* main content */}
      <Container maxW="container.page">
        <Box height="300vh">content goes here</Box>
      </Container>
    </Flex>
  );
};

export default CustomContractPage;

CustomContractPage.Layout = AppLayout;

interface ContractSubnavProps {
  contractQuery: ReturnType<typeof useResolvedContract>;
}

const ContractSubnav: React.VFC<ContractSubnavProps> = ({ contractQuery }) => {
  const [hoveredEl, setHoveredEl] = useState<EventTarget & HTMLButtonElement>();
  const previousEl = usePrevious(hoveredEl);

  console.log("***", { previousEl, hoveredEl });

  return (
    <Flex
      direction="row"
      gap={0}
      position="relative"
      align="center"
      role="group"
      ml={-3}
    >
      <Box
        position="absolute"
        transitionDuration={previousEl && hoveredEl ? "150ms" : "0ms"}
        w={hoveredEl?.clientWidth || 0}
        h="100%"
        transform={`translate3d(${hoveredEl?.offsetLeft || 0}px,0,0)`}
        bg="inputBgHover"
        borderRadius="md"
      />
      <LinkButton
        variant="unstyled"
        onMouseOverCapture={(e) => setHoveredEl(e.currentTarget)}
        // onMouseOutCapture={() => setHoveredEl(undefined)}
        size="sm"
        borderRadius="md"
        height="auto"
        p={3}
        py={1.5}
        href="/"
      >
        Overview
      </LinkButton>
      <LinkButton
        variant="unstyled"
        onMouseOverCapture={(e) => setHoveredEl(e.currentTarget)}
        // onMouseOutCapture={() => setHoveredEl(undefined)}
        size="sm"
        borderRadius="md"
        height="auto"
        p={3}
        py={1.5}
        href="/"
      >
        Settings
      </LinkButton>
    </Flex>
  );
};

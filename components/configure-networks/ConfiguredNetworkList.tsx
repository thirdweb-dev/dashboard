import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import { defaultChains } from "@thirdweb-dev/chains";
import { ChainIcon } from "components/icons/ChainIcon";
import { StoredChain } from "contexts/configured-chains";
import {
  useConfiguredChains,
  useConfiguredChainsRecord,
} from "hooks/chains/configureChains";
import { useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button, Heading } from "tw-components";

interface ConfiguredNetworkListProps {
  onDelete: (network: StoredChain) => void;
  onClick: (network: StoredChain) => void;
  onAdd: (network: StoredChain) => void;
  activeNetwork?: StoredChain;
}

export const ConfiguredNetworkList: React.FC<ConfiguredNetworkListProps> = (
  props,
) => {
  const configuredChains = useConfiguredChains();
  const configuredChainsRecord = useConfiguredChainsRecord();

  const deletedDefaultChains: StoredChain[] = useMemo(() => {
    const _deletedDefaultChains: StoredChain[] = [];
    defaultChains.forEach((chain) => {
      if (
        !(chain.chainId in configuredChainsRecord) ||
        configuredChainsRecord[chain.chainId].isAutoConfigured
      ) {
        _deletedDefaultChains.push(chain);
      }
    });
    return _deletedDefaultChains;
  }, [configuredChainsRecord]);

  const { mainnets, testnets } = useMemo(() => {
    const _mainets: StoredChain[] = [];
    const _testnets: StoredChain[] = [];

    configuredChains.forEach((network) => {
      // don't show autoconfigured networks
      if (network.isAutoConfigured) {
        return;
      }

      if (network.testnet) {
        _testnets.push(network);
      } else {
        _mainets.push(network);
      }
    });

    return {
      mainnets: _mainets,
      testnets: _testnets,
    };
  }, [configuredChains]);

  return (
    <>
      <List
        spacing={0}
        overflow="auto"
        maxH={{ lg: "600px", base: "260px" }}
        sx={{
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "inputBg",
            borderRadius: 24,
          },
        }}
        pb={8}
      >
        {mainnets.length > 0 && (
          <Box mb={8}>
            <Heading
              fontSize="md"
              fontWeight={600}
              color="accent.500"
              mb={4}
              ml={{ base: 4, md: 8 }}
            >
              Mainnets
            </Heading>
            {mainnets.map((network) => (
              <NetworkListItem
                isActive={props.activeNetwork === network}
                onClick={() => props.onClick(network)}
                name={network.name}
                key={network.name}
                img={network.icon?.url}
              />
            ))}
          </Box>
        )}

        {testnets.length > 0 && (
          <Box mb={8}>
            <Heading
              fontSize="md"
              fontWeight={600}
              color="accent.500"
              mb={4}
              ml={8}
            >
              Testnets
            </Heading>
            {testnets.map((network) => (
              <NetworkListItem
                isActive={props.activeNetwork === network}
                onClick={() => props.onClick(network)}
                name={network.name}
                key={network.slug}
                img={network.icon?.url}
              />
            ))}
          </Box>
        )}

        {deletedDefaultChains.length > 0 && (
          <>
            <Divider />
            <Box mb={8} mt={8}>
              <Heading
                fontSize="md"
                fontWeight={600}
                color="accent.500"
                mb={4}
                ml={8}
              >
                Removed Default Networks
              </Heading>
              {deletedDefaultChains.map((network) => (
                <AddNetworkItem
                  onAdd={() => {
                    props.onAdd(network);
                  }}
                  name={network.name}
                  key={network.slug}
                  img={network.icon?.url}
                />
              ))}
            </Box>
          </>
        )}
      </List>
    </>
  );
};

const NetworkListItem: React.FC<{
  onClick: () => void;
  name: string;
  isActive: boolean;
  img?: string;
}> = (props) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Button
        display="flex"
        justifyContent="flex-start"
        w="100%"
        alignItems="center"
        gap={3}
        _dark={{
          background: props.isActive ? "inputBg" : "transparent",
        }}
        _light={{
          background: props.isActive ? "accent.200" : "transparent",
        }}
        color="accent.900"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 4, md: 8 }}
        py={4}
        _hover={{
          _dark: {
            background: "inputBg",
          },
          _light: {
            background: "accent.200",
          },
        }}
        onClick={props.onClick}
        textAlign="left"
        borderRadius={0}
        lineHeight={1.5}
      >
        <ChainIcon size={20} ipfsSrc={props.img} />
        {props.name}
      </Button>
    </ListItem>
  );
};

const AddNetworkItem: React.FC<{
  onAdd: () => void;
  name: string;
  img?: string;
}> = (props) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        alignItems="center"
        gap={3}
        color="accent.900"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 4, md: 8 }}
        py={3}
        lineHeight={1.5}
        bg="transparent"
      >
        <Flex alignItems="center" gap={3}>
          <ChainIcon size={20} ipfsSrc={props.img} />
          {props.name}
        </Flex>

        <IconButton
          w={6}
          h={6}
          px={1}
          py={1}
          minW={6}
          bg="inputBg"
          _hover={{ bg: "inputBgHover" }}
          icon={<Icon as={IoMdAdd} onClick={props.onAdd} />}
          aria-label="Add Network"
        />
      </Box>
    </ListItem>
  );
};

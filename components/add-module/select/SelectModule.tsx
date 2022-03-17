import { ModuleType } from "@3rdweb/sdk";
import { Center, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import useAddModuleContext from "contexts/AddModuleContext";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { FeatureIconMap } from "utils/feature-icons";
import { ModuleButton } from "./ModuleButton";

interface ModuleButtonInfo {
  image: StaticImageData;
  name: string;
  label: string;
  description: string;
  standard?: string;
  portal?: string;
}

export const MODULE_TYPE_TO_NAME: Record<ModuleType, string> = {
  [ModuleType.NFT]: "NFT Collection",
  [ModuleType.BUNDLE]: "Bundle Collection",
  [ModuleType.DROP]: "NFT Drop",
  [ModuleType.BUNDLE_DROP]: "Bundle Drop",
  [ModuleType.BUNDLE_SIGNATURE]: "Bundle Signature",
  [ModuleType.MARKETPLACE]: "Marketplace",
  [ModuleType.CURRENCY]: "Token",
  [ModuleType.PACK]: "Pack",
  [ModuleType.SPLITS]: "Splits",
  [ModuleType.VOTE]: "Vote",
  [ModuleType.DYNAMIC_NFT]: "Dynamic NFT",
  [ModuleType.ACCESS_NFT]: "Access NFT",
  [ModuleType.DATASTORE]: "Data Store",
  [ModuleType.MARKET]: "Marketplace",
};

export const MODULE_BUTTON_INFO: Partial<Record<ModuleType, ModuleButtonInfo>> =
  {
    [ModuleType.NFT]: {
      image: FeatureIconMap[ModuleType.NFT],
      name: MODULE_TYPE_TO_NAME[ModuleType.NFT],
      label: "Create a collection of one-of-one NFTs.",
      description: "Collection of one-of-one NFTs",
      portal: "https://portal.thirdweb.com/guides/nft-collection",
      standard: "ERC721",
    },
    [ModuleType.BUNDLE]: {
      image: FeatureIconMap[ModuleType.BUNDLE],
      name: MODULE_TYPE_TO_NAME[ModuleType.BUNDLE],
      label:
        "Create a collection of NFTs that lets you optionally mint multiple copies of each NFT",
      description: "Collection of NFTs with many copies",
      portal: "https://portal.thirdweb.com/guides/bundle-collection",
      standard: "ERC1155",
    },
    [ModuleType.DROP]: {
      image: FeatureIconMap[ModuleType.DROP],
      name: MODULE_TYPE_TO_NAME[ModuleType.DROP],
      label:
        "Setup a collection of one-of-one NFTs that are minted as users claim them.",
      description: "Claimable drop of one-of-one NFTs",
      portal: "https://portal.thirdweb.com/guides/nft-drop",
      standard: "ERC721",
    },
    [ModuleType.BUNDLE_DROP]: {
      image: FeatureIconMap[ModuleType.DROP],
      name: MODULE_TYPE_TO_NAME[ModuleType.BUNDLE_DROP],
      label:
        "Setup a collection of NFTs with a customizable number of each NFT that are minted as users claim them.",
      description: "Claimable drop of NFTs with many copies",
      standard: "ERC1155",
      portal: "https://portal.thirdweb.com/guides/bundle-drop",
    },
    [ModuleType.BUNDLE_SIGNATURE]: {
      image: FeatureIconMap[ModuleType.DROP],
      name: MODULE_TYPE_TO_NAME[ModuleType.BUNDLE_DROP],
      label: "",
      description: "",
      standard: "ERC1155",
      portal: "https://portal.thirdweb.com/guides/bundle-signature",
    },
    [ModuleType.MARKETPLACE]: {
      image: FeatureIconMap[ModuleType.MARKETPLACE],
      name: MODULE_TYPE_TO_NAME[ModuleType.MARKETPLACE],
      label:
        "Create your own whitelabel marketplace that enables users to buy and sell any digital assets.",
      description: "Whitelabel marketplace for digital assets",
      portal: "https://portal.thirdweb.com/guides/marketplace",
    },
    [ModuleType.CURRENCY]: {
      image: FeatureIconMap[ModuleType.CURRENCY],
      name: MODULE_TYPE_TO_NAME[ModuleType.CURRENCY],
      label: "Create a standard crypto token/crypto currency.",
      description: "Standard crypto token or currency",
      portal: "https://portal.thirdweb.com/guides/token",
      standard: "ERC20",
    },
    [ModuleType.PACK]: {
      image: FeatureIconMap[ModuleType.PACK],
      name: MODULE_TYPE_TO_NAME[ModuleType.PACK],
      label: "Create lootboxes of NFTs with rarity based open mechanics.",
      description: "Lootbox of NFTs",
      portal: "https://portal.thirdweb.com/guides/pack",
    },
    [ModuleType.SPLITS]: {
      image: FeatureIconMap[ModuleType.SPLITS],
      name: MODULE_TYPE_TO_NAME[ModuleType.SPLITS],
      label: "Create custom royalty splits to distribute funds.",
      description: "Custom royalty splits and fund distribution",
      portal: "https://portal.thirdweb.com/guides/splits",
    },
    [ModuleType.VOTE]: {
      image: FeatureIconMap[ModuleType.VOTE],
      name: MODULE_TYPE_TO_NAME[ModuleType.VOTE],
      label:
        "Create a decentralized organization for token holders to vote on proposals.",
      description: "Decentralized voting and governance protocol",
      portal: "https://portal.thirdweb.com/guides/vote",
    },
  };

enum Selection {
  NFT = 0,
  DROP = 1,
  MARKETPLACE = 2,
  GOVERNANCE = 3,
}

const SELECTION_TO_MODULE: Record<Selection, ModuleType[]> = {
  [Selection.NFT]: [
    ModuleType.NFT,
    ModuleType.BUNDLE,
    ModuleType.TOKEN,
    ModuleType.PACK,
  ],
  [Selection.DROP]: [ModuleType.DROP, ModuleType.BUNDLE_DROP],
  [Selection.MARKETPLACE]: [ModuleType.MARKETPLACE],
  [Selection.GOVERNANCE]: [ModuleType.VOTE, ModuleType.SPLITS],
};

const SELECTION_TO_HEADING: Record<Selection, string> = {
  [Selection.NFT]: "What type of token do you want to create?",
  [Selection.DROP]: "What type of drop would you like to release?",
  [Selection.MARKETPLACE]: "Which module would you like to use?",
  [Selection.GOVERNANCE]: "Which module would you like to use?",
};

export const SelectModule: React.FC = () => {
  const [selection, setSelection] = useState<Selection | undefined>();

  if (selection !== undefined) {
    return (
      <SelectModuleType selection={selection} setSelection={setSelection} />
    );
  }

  return (
    <Stack align="center" spacing={0} mt="20px">
      <Heading>What do you want to build?</Heading>

      <Flex gap={5} flexWrap="wrap" justify="center" padding="40px">
        <Stack
          padding="20px"
          width="350px"
          height="200px"
          borderRadius="md"
          bg="pink.50"
          borderColor="pink.100"
          borderWidth="1px"
          _hover={{ bg: "pink.100" }}
          cursor="pointer"
          justify="space-between"
          onClick={() => setSelection(Selection.NFT)}
        >
          <ChakraNextImage
            src={require("/public/assets/add-module/nft.png")}
            alt="nft"
            w={150}
          />
          <Stack>
            <Heading size="label.lg">Create NFTs and Tokens</Heading>
            <Text>Mint your own NFTs, packs, and other tokens</Text>
          </Stack>
        </Stack>
        <Stack
          padding="20px"
          width="350px"
          height="200px"
          borderRadius="md"
          bg="green.50"
          borderColor="green.100"
          borderWidth="1px"
          _hover={{ bg: "green.100" }}
          cursor="pointer"
          justify="space-between"
          onClick={() => setSelection(Selection.DROP)}
        >
          <ChakraNextImage
            src={require("/public/assets/add-module/drop.png")}
            alt="drop"
            w={150}
          />
          <Stack>
            <Heading size="label.lg">Release Drop</Heading>
            <Text>Drop NFTs for others to claim</Text>
          </Stack>
        </Stack>
        <Stack
          padding="20px"
          width="350px"
          height="200px"
          borderRadius="md"
          bg="orange.50"
          borderColor="orange.100"
          borderWidth="1px"
          _hover={{ bg: "orange.100" }}
          cursor="pointer"
          justify="space-between"
          onClick={() => setSelection(Selection.MARKETPLACE)}
        >
          <ChakraNextImage
            src={require("/public/assets/add-module/marketplace.png")}
            alt="marketplace"
            w={150}
          />
          <Stack>
            <Heading size="label.lg">Setup Marketplace</Heading>
            <Text>Create marketplaces to list or auction assets</Text>
          </Stack>
        </Stack>
        <Stack
          padding="20px"
          width="350px"
          height="200px"
          borderRadius="md"
          bg="blue.50"
          borderColor="blue.100"
          borderWidth="1px"
          _hover={{ bg: "blue.100" }}
          cursor="pointer"
          justify="space-between"
          onClick={() => setSelection(Selection.GOVERNANCE)}
        >
          <ChakraNextImage
            src={require("/public/assets/add-module/governance.png")}
            alt="governance"
            w="90px"
          />
          <Stack>
            <Heading size="label.lg">Setup Governance</Heading>
            <Text>Establish decentralized governance</Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

interface ISelectModuleType {
  selection: Selection;
  setSelection: any;
}

const SelectModuleType: React.FC<ISelectModuleType> = ({
  selection,
  setSelection,
}) => {
  const { setSelectedModule } = useAddModuleContext();

  return (
    <Stack align="center" spacing={0} mt="20px">
      <Flex direction="row" justify="center" position="relative" width="100%">
        <Center
          position="absolute"
          left="20px"
          bg="gray.50"
          cursor="pointer"
          height="40px"
          width="40px"
          borderRadius="50px"
          _hover={{ bg: "gray.100" }}
          onClick={() => {
            setSelection(undefined);
            setSelectedModule(undefined);
          }}
        >
          <Icon boxSize={5} as={IoChevronBack} color="gray.600" />
        </Center>
        <Heading>{SELECTION_TO_HEADING[selection]}</Heading>
      </Flex>

      <Flex gap={5} flexWrap="wrap" justify="center" padding="40px">
        {SELECTION_TO_MODULE[selection].map((moduleType: ModuleType) => (
          <ModuleButton
            key={moduleType}
            moduleType={moduleType}
            moduleButtonInfo={MODULE_BUTTON_INFO[moduleType]}
            onClick={() => setSelectedModule(moduleType)}
          />
        ))}
      </Flex>
    </Stack>
  );
};

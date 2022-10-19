import { useDashboardNetwork } from "@3rdweb-sdk/react";
import {
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark";
import { useMemo, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { Button, Card, Heading, Text } from "tw-components";

interface ContractBadgeProps {
  address: string;
}

export const ContractBadge: React.FC<ContractBadgeProps> = ({ address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const network = useDashboardNetwork();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const audited = false;

  const badgeUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("address", address);
    if (audited) {
      params.set("audited", "true");
    }
    if (theme) {
      params.set("theme", theme);
    }
    return `/api/badges/contract?${params.toString()}`;
  }, [address, audited, theme]);

  const badgeCode = `
    <a href="https://thirdweb.com/${network}/${address}?utm_source=contract_badge" target="_blank" rel="noopener noreferrer">
      <img src="https://thirdweb.com${badgeUrl}" alt="View contract on thirdweb.com" />
    </a>`;

  const { hasCopied, onCopy } = useClipboard(badgeCode, 3000);

  console.log(badgeUrl);

  return (
    <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button size="xs">Embed badge</Button>
      </PopoverTrigger>
      <Card
        maxW="sm"
        w="auto"
        as={PopoverContent}
        bg="backgroundCardHighlight"
        mx={6}
        boxShadow="0px 0px 2px 0px var(--popper-arrow-shadow-color)"
      >
        <PopoverArrow bg="backgroundCardHighlight" />
        <PopoverBody>
          <Flex flexDir="column" gap={4}>
            <Heading size="title.sm">Embed badge</Heading>
            <Flex alignItems="center" gap={3}>
              <Text>Theme</Text>
              <Select
                size="sm"
                value={theme}
                onChange={(e) => setTheme(e.target.value as "light" | "dark")}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </Select>
            </Flex>
            <Image src={badgeUrl} w="200px" alt={address} />
            <Button
              size="sm"
              colorScheme="purple"
              w="auto"
              onClick={onCopy}
              leftIcon={hasCopied ? <IoMdCheckmark /> : <FiCopy />}
            >
              {hasCopied ? "Copied!" : "Copy code to clipboard"}
            </Button>
          </Flex>
        </PopoverBody>
      </Card>
    </Popover>
  );
};

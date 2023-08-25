import { NavCard, NavCardProps } from "./NavCard";
import {
  Box,
  Fade,
  Flex,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Card, Text } from "tw-components";
import { PRODUCT_SECTIONS } from "./DesktopMenu";
import { ProductNavCard } from "./ProductNavCard";
import { useRef, useState } from "react";

interface ProductHoverMenuProps {
  title: string;
  items: NavCardProps[];
}

export const ProductHoverMenu: React.FC<ProductHoverMenuProps> = ({
  title,
  items,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [hoveredSection, setHoveredSection] = useState<string>("contracts");

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    // Set a timer to call onOpen after 500ms
    hoverTimeout.current = setTimeout(() => {
      setHoveredSection(label);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  const handleBoxLeave = () => {
    onClose();
    setHoveredSection("contracts");
  };

  return (
    <Box onMouseLeave={handleBoxLeave}>
      <Text
        color="white"
        fontSize="16px"
        cursor="pointer"
        py={3}
        opacity={isOpen ? 0.8 : 1}
        transition="opacity 0.1s"
        onMouseEnter={onOpen}
      >
        {title}
      </Text>

      <Box position="relative" display={isOpen ? "block" : "none"}>
        <Fade in={isOpen}>
          <Card
            p={0}
            position="absolute"
            top={0}
            left={"-280px"}
            borderColor="whiteAlpha.100"
            bg="black"
            borderWidth="2px"
            overflow="hidden"
          >
            <Flex>
              <Flex
                flexDir="column"
                borderRight="1px"
                borderRightColor="gray.900"
              >
                {PRODUCT_SECTIONS.map((section) => (
                  <Stack
                    key={section.name}
                    width={"300px"}
                    onMouseEnter={() => handleMouseEnter(section.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <SimpleGrid columns={1}>
                      <ProductNavCard
                        key={section.label}
                        selected={hoveredSection === section.label}
                        {...section}
                      />
                    </SimpleGrid>
                  </Stack>
                ))}
              </Flex>
              <Flex p={6}>
                <Stack width={"660px"}>
                  <SimpleGrid columns={2} gap={4}>
                    {items
                      .filter((item) => item.section === hoveredSection)
                      .map((item) => (
                        <NavCard key={item.label} {...item} />
                      ))}
                  </SimpleGrid>
                </Stack>
              </Flex>
            </Flex>
          </Card>
        </Fade>
      </Box>
    </Box>
  );
};

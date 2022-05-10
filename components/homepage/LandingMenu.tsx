import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { NextLink } from "components/shared/NextLink";
import { useTrack } from "hooks/analytics/useTrack";
import { useCallback } from "react";

export const LandingMenu: React.FC = () => {
  const { trackEvent } = useTrack();

  const scrollToId = useCallback(
    (id: string) => {
      if (document) {
        trackEvent({ category: "topnav", action: "click", label: id });
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    [trackEvent],
  );

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        color="white"
        _focus={{ bgColor: "black" }}
        _hover={{ bgColor: "black" }}
        _active={{ bgColor: "black" }}
      />
      <MenuList bgColor="black" color="white">
        <MenuItem
          onClick={() => scrollToId("features")}
          _focus={{ bgColor: "black" }}
          _hover={{ bgColor: "black" }}
          _active={{ bgColor: "black" }}
        >
          Features
        </MenuItem>
        <MenuItem
          onClick={() => scrollToId("developers")}
          _focus={{ bgColor: "black" }}
          _hover={{ bgColor: "black" }}
          _active={{ bgColor: "black" }}
        >
          Developers
        </MenuItem>
        <MenuItem
          onClick={() => scrollToId("fees")}
          _focus={{ bgColor: "black" }}
          _hover={{ bgColor: "black" }}
          _active={{ bgColor: "black" }}
        >
          Pricing
        </MenuItem>
        <NextLink
          href="https://portal.thirdweb.com"
          isExternal
          _focus={{ bgColor: "black" }}
          _hover={{ bgColor: "black" }}
          _active={{ bgColor: "black" }}
        >
          <MenuItem>Developer Portal</MenuItem>
        </NextLink>
        <NextLink href="/dashboard">
          <MenuItem
            onClick={() =>
              trackEvent({
                category: "topnav",
                action: "click",
                label: "start",
              })
            }
            _focus={{ bgColor: "black" }}
            _hover={{ bgColor: "black" }}
            _active={{ bgColor: "black" }}
          >
            Start building
          </MenuItem>
        </NextLink>
      </MenuList>
    </Menu>
  );
};

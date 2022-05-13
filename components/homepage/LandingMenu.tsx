import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useCallback } from "react";
import { Link, MenuItem } from "tw-components";

export const LandingMenu: React.FC<IconButtonProps> = (props) => {
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
        {...props}
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
        <Link
          href="https://portal.thirdweb.com"
          isExternal
          _focus={{ bgColor: "black" }}
          _hover={{ bgColor: "black" }}
          _active={{ bgColor: "black" }}
        >
          <MenuItem>Developer Portal</MenuItem>
        </Link>
        <Link href="/dashboard">
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
        </Link>
      </MenuList>
    </Menu>
  );
};

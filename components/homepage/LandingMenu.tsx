import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Divider,
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { MenuGroup, MenuItem, TrackedLink } from "tw-components";

export const LandingMenu: React.FC<IconButtonProps> = (props) => {
  return (
    <Menu>
      <MenuButton
        {...props}
        as={IconButton}
        aria-label="Menu"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList bgColor="black" color="white">
        <MenuGroup title={<>Products</>}>
          <MenuItem
            as={TrackedLink}
            href="#contracts"
            category="topnav"
            label="contracts"
          >
            Contracts
          </MenuItem>
          <MenuItem
            as={TrackedLink}
            href="#developers"
            category="mobile-menu"
            label="developers"
          >
            SDKs
          </MenuItem>
          <MenuItem
            as={TrackedLink}
            href="#dashboards"
            category="mobile-menu"
            label="dashboards"
          >
            Dashboards
          </MenuItem>
          <MenuItem
            as={TrackedLink}
            href="/authentication"
            category="topnav"
            label="authentication"
            isExternal
          >
            Authentication
          </MenuItem>
        </MenuGroup>

        <Divider />

        <MenuGroup title={<>Resources</>}>
          <MenuItem
            as={TrackedLink}
            href="https://portal.thirdweb.com"
            category="topnav"
            label="docs"
            isExternal
          >
            Docs
          </MenuItem>
          <MenuItem
            as={TrackedLink}
            href="https://portal.thirdweb.com/guides"
            category="topnav"
            label="guides"
            isExternal
          >
            Guides
          </MenuItem>
          <MenuItem
            as={TrackedLink}
            href="https://blog.thirdweb.com"
            category="topnav"
            label="blog"
            isExternal
          >
            Blog
          </MenuItem>
        </MenuGroup>

        <Divider />

        <MenuItem
          as={TrackedLink}
          href="#fees"
          category="mobile-menu"
          label="fees"
        >
          Pricing
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

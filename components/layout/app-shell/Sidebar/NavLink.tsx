import { Link } from "@chakra-ui/layout";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

interface ISidebarNavLinkExternal {
  href: string;
  isExternal: true | ButtonProps["rightIcon"];
  icon?: undefined;
  isActive?: boolean;
}
interface ISidebarNavLinkInternal {
  href: string;
  icon?: ButtonProps["rightIcon"];
  isExternal?: undefined;
  isActive?: boolean;
}

export const SidebarNavLink: React.FC<
  ISidebarNavLinkExternal | ISidebarNavLinkInternal
> = ({ children, href, isExternal, icon, isActive }) => {
  if (isExternal) {
    return (
      <Button
        fontFamily="var(--chakra-fonts-heading)"
        opacity={0.8}
        p={3}
        textDecoration="none!important"
        style={{
          marginLeft: "calc(var(--chakra-space-3) * -1)",
          marginRight: "calc(var(--chakra-space-3) * -1)",
        }}
        _hover={{ opacity: 1, bg: "rgba(255,255,255,.1)" }}
        color="inherit"
        justifyContent="space-between"
        rightIcon={
          isExternal === true ? <Icon as={FiExternalLink} /> : isExternal
        }
        textAlign="left"
        variant="link"
        as={Link}
        href={href}
        isExternal
      >
        {children}
      </Button>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Button
        rightIcon={icon}
        fontFamily="var(--chakra-fonts-heading)"
        p={3}
        textDecoration="none!important"
        style={{
          marginLeft: "calc(var(--chakra-space-3) * -1)",
          marginRight: "calc(var(--chakra-space-3) * -1)",
        }}
        _hover={{ opacity: 1, bg: "rgba(255,255,255,.1)" }}
        color="inherit"
        justifyContent="space-between"
        textAlign="left"
        variant="link"
        as={Link}
        {...(isActive
          ? {
              opacity: 0.8,
              bg: "rgba(255,255,255,.1)",
            }
          : {
              opacity: 0.8,
            })}
      >
        {children}
      </Button>
    </NextLink>
  );
};

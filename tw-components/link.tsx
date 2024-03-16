"use-client";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  LinkOverlay,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import _NextLink, { LinkProps as _NextLinkProps } from "next/link";
import React, { useCallback } from "react";

export type ChakraNextLinkProps = Omit<ChakraLinkProps, "as"> &
  Omit<_NextLinkProps, "as">;
export const ChakraNextLink: React.FC<
  React.PropsWithRef<ChakraNextLinkProps>
> = (props) => <ChakraLink as={_NextLink} {...props} prefetch={false} />;

interface LinkProps
  extends Omit<ChakraLinkProps, "href">,
    Pick<_NextLinkProps, "href"> {
  isExternal?: boolean;
  noIcon?: true;
  href: string;

  scroll?: true;
}

/**
 * A link component that can be used to navigate to other pages.
 * Combines the `NextLink` and Chakra `Link` components.
 */
export const Link: React.FC<React.PropsWithRef<LinkProps>> = ({
  href,
  isExternal,
  children,
  scroll,
  ...restLinkProps
}) => {
  if (isExternal) {
    return (
      <ChakraLink isExternal href={href} {...restLinkProps}>
        {children}
      </ChakraLink>
    );
  }

  return (
    <ChakraNextLink
      href={href}
      scroll={scroll}
      scrollBehavior="smooth"
      _focus={{ boxShadow: "none" }}
      {...restLinkProps}
    >
      {children}
    </ChakraNextLink>
  );
};

Link.displayName = "Link";

export interface TrackedLinkProps extends LinkProps {
  category: string;
  label?: string;
  trackingProps?: Record<string, string>;
}

/**
 * A link component extends the `Link` component and adds tracking.
 */
export const TrackedLink: React.FC<React.PropsWithRef<TrackedLinkProps>> = ({
  category,
  label,
  trackingProps,

  ...props
}) => {
  const trackEvent = useTrack();

  const onClick = useCallback(() => {
    trackEvent({ category, action: "click", label, ...trackingProps });
  }, [trackEvent, category, label, trackingProps]);

  return <Link onClick={onClick} {...props} />;
};

TrackedLink.displayName = "TrackedLink";

/**
 * A link component extends the `LinkOverlay` component and adds tracking.
 */
export const TrackedLinkOverlay = React.forwardRef<
  HTMLAnchorElement,
  TrackedLinkProps
>(({ category, label, trackingProps, ...props }, ref) => {
  const trackEvent = useTrack();

  const onClick = useCallback(() => {
    trackEvent({ category, action: "click", label, ...trackingProps });
  }, [trackEvent, category, label, trackingProps]);

  return <LinkOverlay ref={ref} onClick={onClick} {...props} />;
});

TrackedLinkOverlay.displayName = "TrackedLinkOverlay";

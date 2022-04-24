import {
  BadgeProps,
  Badge as ChakraBadge,
  LightMode,
  forwardRef,
} from "@chakra-ui/react";
import React from "react";

export const Badge = forwardRef<BadgeProps, "button">(
  ({ py = 0.5, ...props }, ref) => {
    if (props.colorScheme) {
      return (
        <LightMode>
          <ChakraBadge py={py} {...props} ref={ref} />
        </LightMode>
      );
    }
    return <ChakraBadge py={py} {...props} ref={ref} />;
  },
);

Badge.displayName = "Badge";

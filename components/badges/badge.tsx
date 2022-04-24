import {
  BadgeProps,
  Badge as ChakraBadge,
  LightMode,
  forwardRef,
} from "@chakra-ui/react";
import React from "react";

export const Badge = forwardRef<BadgeProps, "button">((props, ref) => {
  if (props.colorScheme) {
    return (
      <LightMode>
        <ChakraBadge {...props} ref={ref} />
      </LightMode>
    );
  }
  return <ChakraBadge {...props} ref={ref} />;
});

Badge.displayName = "Badge";

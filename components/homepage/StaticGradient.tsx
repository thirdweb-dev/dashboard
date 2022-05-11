import { AspectRatio, AspectRatioProps, Box } from "@chakra-ui/react";
import React from "react";

export const StaticGradient: React.FC<
  Omit<AspectRatioProps, "ratio"> & { hero?: true }
> = ({ opacity, ...props }) => {
  return (
    <AspectRatio ratio={300 / 468} {...props}>
      <Box
        overflow="visible!important"
        bgGradient="linear(to-r, #C200C6, #2D8EFF)"
        opacity={opacity ? opacity : 0.4}
        filter="blur(136px)"
        borderRadius="full"
      />
    </AspectRatio>
  );
};

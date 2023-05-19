import { Flex } from "@chakra-ui/react";
import NextImage, { StaticImageData } from "next/image";
import { Heading, TrackedLink } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

interface AmbassadorProps {
  icon: StaticImageData;
}

export const AmbassadorCard: ComponentWithChildren<AmbassadorProps> = ({
  icon,
  children,
}) => {
  return (
    <Flex
      direction="column"
      bg="rgba(255, 255, 255, 0.05)"
      border="1px solid rgba(255, 255, 255, 0.05)"
      borderRadius="16px"
      padding="24px"
      alignItems="center"
    >
      <NextImage
        src={icon}
        alt=""
        priority
        style={{
          width: "101px",
          height: "91px",
        }}
      />
      <Flex
        direction={"column"}
        fontSize="body.lg"
        mt="16px"
        color="paragraph"
        lineHeight={1.6}
        h="100%"
        textAlign="center"
      >
        {children}
      </Flex>
    </Flex>
  );
};

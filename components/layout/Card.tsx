import { Box, BoxProps } from "@chakra-ui/layout";

type DefaultedBoxProps = Pick<
  BoxProps,
  "shadow" | "backgroundColor" | "py" | "px" | "borderRadius" | "border"
>;

const defaultBoxProps: Required<DefaultedBoxProps> = {
  shadow: "sm",
  backgroundColor: "gray.50",
  px: 4,
  py: 4,
  borderRadius: "md",
  border: "1px solid var(--chakra-colors-gray-200)",
};

export interface CardProps extends BoxProps {}
export const Card: React.FC<CardProps> = ({
  children,
  ...requiredBoxProps
}) => {
  return <Box {...{ ...defaultBoxProps, ...requiredBoxProps }}>{children}</Box>;
};

import { Box, BoxProps } from "@chakra-ui/layout";

type DefaultedBoxProps = Pick<
  BoxProps,
  | "shadow"
  | "backgroundColor"
  | "py"
  | "px"
  | "borderRadius"
  | "borderWidth"
  | "borderColor"
>;

const defaultBoxProps: Required<DefaultedBoxProps> = {
  shadow: "sm",
  backgroundColor: "backgroundHighlight",
  px: 4,
  py: 4,
  borderRadius: "xl",
  borderWidth: "1px",
  borderColor: "borderColor",
};

export interface CardProps extends BoxProps {}
export const Card: React.FC<CardProps> = ({
  children,
  ...requiredBoxProps
}) => {
  return <Box {...{ ...defaultBoxProps, ...requiredBoxProps }}>{children}</Box>;
};

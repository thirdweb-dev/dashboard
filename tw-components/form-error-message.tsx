import {
  FormErrorMessage as ChakraFormErrorMessage,
  HelpTextProps as ChakraFormErrorMessageProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  BodyBase,
  BodySizes,
  TypographySize,
  baseFontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  mdFontSizes,
} from "theme/typography";
import { ComponentWithChildren } from "types/component-with-children";

export interface FormErrorMessageProps
  extends Omit<ChakraFormErrorMessageProps, "size"> {
  size?: BodySizes;
}

export const FormErrorMessage: ComponentWithChildren<FormErrorMessageProps> = ({
  size = "body.sm",
  ...restProps
}) => {
  const [base, fontSizeKey] = size.split(".") as [BodyBase, TypographySize];
  const fontSizeMap =
    useBreakpointValue({
      base: baseFontSizes,
      md: mdFontSizes,
    }) || mdFontSizes;

  return (
    <ChakraFormErrorMessage
      fontSize={fontSizeMap[base][fontSizeKey]}
      fontWeight={fontWeights[base]}
      lineHeight={lineHeights[base]}
      letterSpacing={letterSpacings[base]}
      {...restProps}
    />
  );
};

import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import type { ButtonProps } from "@chakra-ui/react";

export interface IModuleActionButtonProps extends ButtonProps {
  account?: string;
  module?: EitherBaseModuleType;
}

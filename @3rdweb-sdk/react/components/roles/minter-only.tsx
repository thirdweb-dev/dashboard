import { useIsAccountRole } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useWeb3 } from "@3rdweb/hooks";

interface IMinterOnlyProps {
  module?: EitherBaseModuleType;
}
export const MinterOnly: React.FC<IMinterOnlyProps> = ({
  children,
  module,
}) => {
  const { address } = useWeb3();
  const isMinter = useIsAccountRole("minter", module, address);
  if (!isMinter) {
    return null;
  }
  return <>{children}</>;
};

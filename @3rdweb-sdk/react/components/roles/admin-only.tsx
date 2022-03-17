import { useIsAccountRole } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useWeb3 } from "@3rdweb/hooks";

interface IAdminOnlyProps {
  module?: EitherBaseModuleType;
}
export const AdminOnly: React.FC<IAdminOnlyProps> = ({ children, module }) => {
  const { address } = useWeb3();
  const isAdmin = useIsAccountRole("admin", module, address);
  if (!isAdmin) {
    return null;
  }
  return <>{children}</>;
};

export const AdminOrSelfOnly: React.FC<IAdminOnlyProps & { self: string }> = ({
  children,
  self,
  module,
}) => {
  const { address } = useWeb3();
  if (address === self) {
    return <>{children}</>;
  }
  return <AdminOnly module={module}>{children}</AdminOnly>;
};

import { Image } from "@chakra-ui/react";
import { useMemo } from "react";

interface ContractBadgeProps {
  contractAddress: string;
  audited?: boolean;
  theme?: "light" | "dark";
}

export const ContractBadge: React.FC<ContractBadgeProps> = ({
  contractAddress,
  audited,
  theme,
}) => {
  const badgeUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("address", contractAddress);
    if (audited) {
      params.set("audited", "true");
    }
    if (theme) {
      params.set("theme", theme);
    }
    return `/api/badges/contract?${params.toString()}`;
  }, [contractAddress, audited, theme]);

  console.log(badgeUrl);

  return <Image src={badgeUrl} w="200px" />;
};

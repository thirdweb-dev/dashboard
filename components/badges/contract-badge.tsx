import { useContractBadge } from "@3rdweb-sdk/react/useContractBadge";
import { Image } from "@chakra-ui/react";
import parse from "html-react-parser";

interface ContractBadgeProps {
  contractAddress: string;
  audited: boolean;
  theme: "light" | "dark";
}

export const ContractBadge: React.FC<ContractBadgeProps> = ({
  contractAddress,
  audited,
  theme,
}) => {
  const contractBadge = useContractBadge(contractAddress);

  console.log(contractBadge);

  if (!contractBadge?.data?.svg) {
    return null;
  }

  return <div>{parse(contractBadge.data.svg)}</div>;
};

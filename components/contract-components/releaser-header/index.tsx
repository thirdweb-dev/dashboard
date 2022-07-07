import { useReleaserProfile } from "../hooks";
import { Flex } from "@chakra-ui/react";

interface ReleaseHeaderProps {
  wallet: string;
}

export const ReleaserHeader: React.FC<ReleaseHeaderProps> = ({ wallet }) => {
  const releaserProfile = useReleaserProfile(wallet);
  console.log(wallet);
  console.log(releaserProfile.data);
  return <Flex>hey</Flex>;
};

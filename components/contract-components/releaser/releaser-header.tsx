import { useReleaserProfile } from "../hooks";
import { EditProfile } from "./edit-profile";
import { ReleaserSocials } from "./releaser-socials";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ChakraNextImage } from "components/Image";
import { Heading, Link } from "tw-components";
import { shortenAddress } from "utils/usedapp-external";

interface ReleaserHeaderProps {
  wallet: string;
  page?: boolean;
}

export const ReleaserHeader: React.FC<ReleaserHeaderProps> = ({
  wallet,
  page,
}) => {
  const releaserProfile = useReleaserProfile(wallet);
  const address = useAddress();

  return (
    <Flex
      flexDirection={{ base: "column", md: page ? "column" : "row" }}
      justifyContent="space-between"
    >
      <Flex direction="column" gap={4}>
        <Heading size="title.sm">Released by</Heading>
        <Flex gap={4} alignItems="center">
          <ChakraNextImage
            alt=""
            boxSize={12}
            src={require("public/assets/others/hexagon.png")}
          />
          <Flex flexDir="column">
            <Link href={`/contracts/${wallet}`}>
              <Heading size="subtitle.sm">
                {releaserProfile?.data?.name || shortenAddress(wallet)}
              </Heading>
            </Link>
            {releaserProfile?.data && (
              <ReleaserSocials releaserProfile={releaserProfile.data} />
            )}
          </Flex>
        </Flex>
      </Flex>
      {wallet === address && <EditProfile />}
    </Flex>
  );
};

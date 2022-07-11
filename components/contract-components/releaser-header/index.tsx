import { useReleaserProfile } from "../hooks";
import { Flex, Icon } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { SiDiscord, SiTwitter } from "react-icons/si";
import { Heading, LinkButton, TrackedIconButton } from "tw-components";
import { shortenAddress } from "utils/usedapp-external";

interface ReleaserHeaderProps {
  wallet: string;
}

export const ReleaserHeader: React.FC<ReleaserHeaderProps> = ({ wallet }) => {
  const releaserProfile = useReleaserProfile(wallet);

  return (
    <Flex direction="column" gap={2}>
      <Heading size="title.sm">Author</Heading>
      <Flex gap={4} alignItems="center">
        <ChakraNextImage
          alt=""
          boxSize={12}
          src={require("public/assets/others/hexagon.png")}
        />
        <Flex flexDir="column">
          <Heading size="subtitle.sm">
            {releaserProfile?.data?.name || shortenAddress(wallet)}
          </Heading>
          <Flex>
            <TrackedIconButton
              as={LinkButton}
              isExternal
              noIcon
              href="https://twitter.com/thirdweb_"
              bg="transparent"
              aria-label="twitter"
              icon={<Icon boxSize={5} as={SiTwitter} />}
              category="releaser-header"
              label="twitter"
            />
            <TrackedIconButton
              as={LinkButton}
              isExternal
              noIcon
              href="https://discord.gg/thirdweb"
              bg="transparent"
              aria-label="discord"
              icon={<Icon boxSize="1rem" as={SiDiscord} />}
              category="releaser-"
              label="discord"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

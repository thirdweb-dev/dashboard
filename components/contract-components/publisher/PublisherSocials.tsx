import { ButtonGroup, Icon } from "@chakra-ui/react";
// eslint-disable-next-line no-duplicate-imports
import type { ButtonGroupProps } from "@chakra-ui/react";
import { SiDiscord } from "@react-icons/all-files/si/SiDiscord";
import { SiFacebook } from "@react-icons/all-files/si/SiFacebook";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";
import { SiLinkedin } from "@react-icons/all-files/si/SiLinkedin";
import { SiMedium } from "@react-icons/all-files/si/SiMedium";
import { SiReddit } from "@react-icons/all-files/si/SiReddit";
import { SiTelegram } from "@react-icons/all-files/si/SiTelegram";
import { SiTwitter } from "@react-icons/all-files/si/SiTwitter";
import type { ProfileMetadata } from "@thirdweb-dev/sdk/evm";
import { FiGlobe } from "react-icons/fi";
import { LinkButton, TrackedIconButton } from "tw-components";

interface PublisherSocialsProps extends ButtonGroupProps {
  publisherProfile: ProfileMetadata;
}

export const PublisherSocials: React.FC<PublisherSocialsProps> = ({
  publisherProfile,
  spacing = 0,
  size = "sm",
  ...props
}) => (
  <ButtonGroup size={size} spacing={spacing} {...props}>
    {publisherProfile.twitter && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.twitter}
        bg="transparent"
        aria-label="twitter"
        icon={<Icon as={SiTwitter} />}
        category="releaser-header"
        label="twitter"
      />
    )}
    {publisherProfile.discord && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.discord}
        bg="transparent"
        aria-label="discord"
        icon={<Icon as={SiDiscord} />}
        category="releaser-header"
        label="discord"
      />
    )}
    {publisherProfile.github && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.github}
        bg="transparent"
        aria-label="github"
        icon={<Icon as={SiGithub} />}
        category="releaser-header"
        label="github"
      />
    )}
    {publisherProfile.website && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.website}
        bg="transparent"
        aria-label="website"
        icon={<Icon as={FiGlobe} />}
        category="releaser-header"
        label="website"
      />
    )}

    {publisherProfile.medium && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.medium}
        bg="transparent"
        aria-label="medium"
        icon={<Icon as={SiMedium} />}
        category="releaser-header"
        label="medium"
      />
    )}
    {publisherProfile.telegram && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.telegram}
        bg="transparent"
        aria-label="telegram"
        icon={<Icon as={SiTelegram} />}
        category="releaser-header"
        label="telegram"
      />
    )}
    {publisherProfile.facebook && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.facebook}
        bg="transparent"
        aria-label="facebook"
        icon={<Icon as={SiFacebook} />}
        category="releaser-header"
        label="facebook"
      />
    )}
    {publisherProfile.reddit && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.reddit}
        bg="transparent"
        aria-label="reddit"
        icon={<Icon as={SiReddit} />}
        category="releaser-header"
        label="reddit"
      />
    )}
    {publisherProfile.linkedin && (
      <TrackedIconButton
        as={LinkButton}
        isExternal
        noIcon
        href={publisherProfile.linkedin}
        bg="transparent"
        aria-label="linkedin"
        icon={<Icon as={SiLinkedin} />}
        category="releaser-header"
        label="linkedin"
      />
    )}
  </ButtonGroup>
);

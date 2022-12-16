import { Flex, List, ListItem } from "@chakra-ui/react";
import type { FC } from "react";
import { Heading, Link } from "tw-components";

export const Resources: FC = () => {
  const resources = [
    {
      name: "GamingKit",
      link: "https://portal.thirdweb.com/gamingkit",
    },
    {
      name: "GamingKit QuickStart",
      link: "https://portal.thirdweb.com/gamingkit/quickstart",
    },
    {
      name: "Gaming Guides/Blog",
      link: "https://blog.thirdweb.com/tag/gaming/",
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/c/thirdweb_",
    },
    {
      name: "Documentation",
      link: "https://portal.thirdweb.com/",
    },
    {
      name: "Office Hours & Workshops",
      link: "",
    },
  ];

  return (
    <Flex flexDir="column">
      <Heading>Resources</Heading>
      <List>
        {resources.map(({ name, link }, i) => (
          <ListItem key={name}>
            <Link href={link}>
              {i + 1}. {name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

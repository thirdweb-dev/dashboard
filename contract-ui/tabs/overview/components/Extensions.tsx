import { useContractEnabledExtensions } from "../../../../components/contract-components/hooks";
import { Flex, Icon, List, ListItem } from "@chakra-ui/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { FcCheckmark } from "react-icons/fc";
import { Heading, Text, TrackedLink } from "tw-components";

type ExtensionsProps = {
  contract: SmartContract;
};

const Extensions: React.FC<ExtensionsProps> = ({ contract }) => {
  const enabledExtensions = useContractEnabledExtensions(contract?.abi);

  return (
    <Flex flexDir="column" gap={4}>
      <Heading as="h4" size="title.sm">
        Extensions
      </Heading>
      <List as={Flex} flexDir="column" gap={3}>
        {enabledExtensions.length ? (
          enabledExtensions.map((extension) => (
            <ListItem key={extension.name}>
              <Flex gap={2} alignItems="center">
                <Icon as={FcCheckmark} boxSize={5} />
                <Text size="label.md">
                  <TrackedLink
                    href={`https://portal.thirdweb.com/contracts/${extension.docLinks.contracts}`}
                    isExternal
                    category="extension"
                    label={extension.name}
                  >
                    {extension.name}
                  </TrackedLink>
                </Text>
              </Flex>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Text size="body.md" fontStyle="italic">
              No extensions detected
            </Text>
          </ListItem>
        )}
      </List>
    </Flex>
  );
};

export default Extensions;

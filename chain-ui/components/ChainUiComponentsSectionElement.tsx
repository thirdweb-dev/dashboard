import { Flex, GridItem, GridItemProps, Icon } from "@chakra-ui/react";
import { Heading } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import { ChainUiComponentsStatusIcons } from "./ChainUiComponentsStatusIcons";

interface ChainUiComponentsSectionElementProps
  extends Pick<GridItemProps, "colSpan"> {
  label: string;
  status?: "good" | "bad" | "neutral";
  moreElem?: JSX.Element;
}

export const ChainUiComponentsSectionElement: ComponentWithChildren<
  ChainUiComponentsSectionElementProps
> = ({ colSpan, label, status, moreElem, children }) => {
  return (
    <GridItem colSpan={colSpan} as={Flex} flexDir="column" gap={2}>
      <Flex align="center" gap={4} justify="space-between">
        <Flex gap={1} align="center">
          <Heading as="h3" size="label.lg" opacity={0.6} fontWeight={400}>
            {label}
          </Heading>
          {status && (
            <Icon
              boxSize={3.5}
              as={ChainUiComponentsStatusIcons[status]}
              _light={{
                color: `${ChainUiComponentsStatusIcons[status]}.600`,
              }}
              _dark={{
                color: `${ChainUiComponentsStatusIcons[status]}.400`,
              }}
            />
          )}
        </Flex>
        {moreElem}
      </Flex>

      {children}
    </GridItem>
  );
};

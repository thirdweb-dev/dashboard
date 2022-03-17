import { Box, Flex } from "@chakra-ui/layout";
import { Button, Input, Text, Icon } from "@chakra-ui/react";
import { Property } from "hooks/usePropertiesBuilder";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { GiCancel } from "react-icons/gi";

export interface PropertiesBuilderProps {
  properties: Property[];
  setProperties: Dispatch<SetStateAction<Property[]>>;
}

export default function PropertiesBuilder({
  properties,
  setProperties,
}: PropertiesBuilderProps) {
  const updateKey = useCallback(
    (index: number, v: string) => {
      setProperties((prev) => {
        const newProps = [...prev];
        newProps[index].key = v;
        return newProps;
      });
    },
    [setProperties],
  );

  const updateValue = useCallback(
    (index: number, v: string) => {
      setProperties((prev) => {
        const newProps = [...prev];
        newProps[index].value = v;
        return newProps;
      });
    },
    [setProperties],
  );

  const removeKey = useCallback(
    (key: string) => {
      setProperties((prev) => {
        const newProps = [...prev];
        return newProps.filter((prop) => prop.key !== key);
      });
    },
    [setProperties],
  );

  return (
    <Box shadow="sm">
      {properties.map((property, i) => {
        return (
          <Flex flexDir="row" key={i} width="100%">
            <Flex
              flexDir="row"
              height="40px"
              alignItems="center"
              width="100%"
              mr={2}
              mt={2}
            >
              <Input
                width="40%"
                minWidth="60px"
                placeholder="Key"
                value={property.key}
                onChange={(e) => updateKey(i, e.target.value)}
                mr={2}
              />
              <Input
                placeholder="Value"
                value={property.value}
                onChange={(e) => updateValue(i, e.target.value)}
              />
              <Icon
                as={GiCancel}
                m={2}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  removeKey(property.key);
                }}
              />
            </Flex>
          </Flex>
        );
      })}
      <Button
        size="sm"
        my={3}
        onClick={() =>
          setProperties((prev) => prev.concat([{ key: "", value: "" }]))
        }
      >
        Add Property
      </Button>
    </Box>
  );
}

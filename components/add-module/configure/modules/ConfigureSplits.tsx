import { useActiveChainId } from "@3rdweb-sdk/react";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import { Card } from "components/layout/Card";
import { THIRDWEB_TREASURY_ADDRESSES } from "constants/treasury";
import useAddModuleContext from "contexts/AddModuleContext";
import { isAddress } from "ethers/lib/utils";
import { FiTrash } from "react-icons/fi";
import { SupportedChainId } from "utils/network";

export const ConfigureSplits: React.FC = () => {
  const chainId = useActiveChainId();
  const {
    watch,
    splits: { addSplit, removeSplit },
    edit: { editable, setEditable },
  } = useAddModuleContext();

  const isValid =
    watch("recipientSplits").length === 0 ||
    watch("recipientSplits")
      ?.map((split: any) => split.percentage)
      .reduce((s1: any, s2: any) => parseFloat(s1) + parseFloat(s2), 0) === 100;

  return (
    <Stack spacing={10}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading size="label.lg">Split Recipients</Heading>
          <Text mb="24px">
            In this section, you can configure all the addresses that will
            received revenue from your splits and allocate ownership to each
            address by percentage.
          </Text>
        </Stack>

        <Card>
          <Stack direction="row" align="flex-end">
            <FormControl flexGrow={1}>
              <Text size="label.md">Address</Text>
              <FormHelperText mb="4px">
                This address will be added to your split.
              </FormHelperText>
              <Input
                placeholder={AddressZero}
                fontFamily="monospace"
                value={editable?.address}
                onChange={(e) =>
                  setEditable({
                    ...editable,
                    address: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl flexGrow={1}>
              <Text size="label.md">Percentage</Text>
              <FormHelperText mb="4px">
                The percent ownership the address will have in your split
              </FormHelperText>
              <Input
                fontFamily="monospace"
                value={editable?.percentage}
                onChange={(e) =>
                  setEditable({
                    ...editable,
                    percentage: e.target.value,
                  })
                }
              />
            </FormControl>

            <Button
              flexGrow={1}
              width="320px"
              colorScheme="primary"
              borderRadius="md"
              onClick={() => addSplit(editable.address, editable.percentage)}
              isDisabled={!isAddress(editable.address)}
            >
              Add Address
            </Button>
          </Stack>
        </Card>

        {watch("recipientSplits")?.map((recipient: any) => {
          if (
            recipient.address.toLowerCase() ===
            THIRDWEB_TREASURY_ADDRESSES[
              chainId as SupportedChainId
            ].toLowerCase()
          ) {
            return (
              <Tooltip
                width="100%"
                key={recipient.address}
                label={`thirdweb charges a ${
                  watch("isRoyalty") ? "5.0%" : "0.3%"
                } fee on funds processed through this module.`}
              >
                <Flex width="100%">
                  <Card width="100%">
                    <Flex direction="column">
                      <Text>
                        <strong>Address:</strong> thirdweb.eth
                      </Text>
                      <Text>
                        <strong>Percentage:</strong>{" "}
                        {watch("isRoyalty") ? "5.0%" : "0.3%"}
                      </Text>
                    </Flex>
                  </Card>
                </Flex>
              </Tooltip>
            );
          } else {
            return (
              <Card key={recipient.address}>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>
                      <strong>Address:</strong> {recipient.address}
                    </Text>
                    <Text>
                      <strong>Share:</strong> {recipient.percentage}%
                    </Text>
                  </Flex>
                  <Stack direction="row">
                    <Icon
                      onClick={() => removeSplit(recipient.address)}
                      as={FiTrash}
                      boxSize={5}
                      color="red.200"
                      cursor="pointer"
                      ml="12px"
                      _hover={{
                        color: "red.400",
                      }}
                    />
                  </Stack>
                </Flex>
              </Card>
            );
          }
        })}

        {!isValid && (
          <Text color="red.400" fontSize="12px">
            Split percentages must add up to 100.
          </Text>
        )}
      </Stack>
    </Stack>
  );
};

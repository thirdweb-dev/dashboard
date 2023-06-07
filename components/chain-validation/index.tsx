import {
  Code,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useRpcValidation } from "hooks/chains/useRpcValidation";
import { useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { Button, Card, FormLabel, TableContainer } from "tw-components";

const StatusCheck = ({ valid }: { valid: boolean }) => {
  return (
    <Icon
      fontSize={16}
      color={valid ? "green.500" : "red.500"}
      as={valid ? BiCheckCircle : BiErrorCircle}
    />
  );
};

const ChainValidation: React.FC<{}> = () => {
  const [rpcUrl, setRpcUrl] = useState("");
  const [validatedRpcUrl, setValidatedRpcUrl] = useState("");
  const [validationReport, validate] = useRpcValidation(validatedRpcUrl);

  const trackEvent = useTrack();

  const handleValidate = () => {
    if (rpcUrl.length > 0) {
      setValidatedRpcUrl(rpcUrl);
      validate();

      trackEvent({
        category: "validation",
        action: "validate",
        label: "rpc",
        url: rpcUrl,
      });
    } else {
      setValidatedRpcUrl("");
    }
  };

  return (
    <Card maxW="xl">
      <Flex direction="column" gap={6}>
        <FormControl gap={6}>
          <FormLabel>RPC URL</FormLabel>
          <InputGroup gap={2}>
            <Input
              isInvalid={
                validatedRpcUrl.length > 0 && !validationReport.urlValid
              }
              value={rpcUrl}
              isDisabled={validationReport.urlLoading}
              onChange={(e) => setRpcUrl(e.currentTarget.value)}
              placeholder="https://rpc.yourchain.com/rpc"
              type="url"
            />
            <Button onClick={handleValidate} colorScheme="primary">
              Validate
            </Button>
          </InputGroup>
        </FormControl>

        {validatedRpcUrl.length > 0 && (
          <TableContainer>
            {validationReport?.urlLoading && (
              <Flex align="center" justifyContent="center" py={16}>
                <Spinner size="sm" alignSelf="center" />
              </Flex>
            )}
            {!validationReport?.urlLoading && (
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th colSpan={2}>RPC validation report</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>RPC URL valid</Td>
                    <Td textAlign="right">
                      <StatusCheck valid={validationReport.urlValid} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      RPC supports <Code>eth_chainId</Code> method
                    </Td>
                    <Td textAlign="right">
                      <StatusCheck valid={validationReport.chainIdSupported} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      RPC supports <Code>eth_blockNumber</Code> method
                    </Td>
                    <Td textAlign="right">
                      <StatusCheck
                        valid={validationReport.blockNumberSupported}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
          </TableContainer>
        )}
      </Flex>
    </Card>
  );
};

export default ChainValidation;

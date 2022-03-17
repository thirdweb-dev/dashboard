import {
  AspectRatio,
  Center,
  Code,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { BsFillCloudUploadFill } from "react-icons/bs";

interface UploadStepProps {
  getRootProps: any;
  getInputProps: any;
  noCsv: boolean;
  isDragActive: boolean;
}

export const UploadStep: React.FC<UploadStepProps> = ({
  getRootProps,
  noCsv,
  isDragActive,
  getInputProps,
}) => {
  return (
    <Flex flexGrow={1} align="center" overflow="auto">
      <Container maxW="container.page">
        <Flex gap={8} flexDir={{ base: "column", md: "row" }}>
          <AspectRatio w="50%">
            <Center
              borderRadius="md"
              {...getRootProps()}
              cursor="pointer"
              border="2px dashed lightgrey"
              bg={noCsv ? "red.200" : isDragActive ? "gray.100" : "white"}
            >
              <input {...getInputProps()} />
              <VStack>
                <Icon
                  as={BsFillCloudUploadFill}
                  boxSize={8}
                  mb={2}
                  color="gray.600"
                />
                {isDragActive ? (
                  <Heading as={Text} size="label.md" color="gray.600">
                    Drop the files here
                  </Heading>
                ) : (
                  <Heading as={Text} size="label.md" color="gray.600">
                    {noCsv
                      ? "No CSV file found, please try again"
                      : "Drag & Drop files or folders here, or click to select files"}
                  </Heading>
                )}
              </VStack>
            </Center>
          </AspectRatio>
          <Flex gap={2} flexDir="column" w="50%">
            <Heading size="subtitle.sm">Requirements</Heading>
            <UnorderedList>
              <ListItem>
                Files <em>must</em> contain one .csv file with metadata. -{" "}
                <Link download color="blue.500" href="/example.csv">
                  Download example.csv
                </Link>
              </ListItem>
              <ListItem>
                Asset names <em>must</em> be sequential 0,1,2,3...n.[extension].
                It doesn&apos;t matter at what number you begin. (Example:{" "}
                <Code>131.png</Code>, <Code>132.png</Code>).
              </ListItem>
            </UnorderedList>
            <Heading size="subtitle.sm" mt={4}>
              Options
            </Heading>
            <UnorderedList>
              <ListItem>
                Images and other file types can be used in combination.
                <br />
                <small>
                  They both have to follow the asset naming convention above.
                  (Example: <Code>0.png</Code> and <Code>0.mp4</Code>,{" "}
                  <Code>1.png</Code> and <Code>1.glb</Code>, etc.)
                </small>
              </ListItem>
              <ListItem>
                When uploading files, we will upload them and pin them to IPFS
                automatically for you. If you already have the files uploaded,
                you can add an <Code>image</Code> and/or{" "}
                <Code>animation_url</Code> column and add the IPFS hashes there.
                (Example: <Code>ipfs://hash/tokenId</Code>)
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

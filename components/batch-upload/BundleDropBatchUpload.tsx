import { useBundleDropBatchMint } from "@3rdweb-sdk/react";
import { BundleDropModule } from "@3rdweb/sdk";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import Papa from "papaparse";
import { useCallback, useMemo, useRef, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { BatchTable } from "./BatchTable";
import { UploadStep } from "./UploadStep";

interface BundleDropBatchUploadProps {
  module?: BundleDropModule;
  isOpen: boolean;
  onClose: () => void;
}

function removeEmptyKeysFromObject(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

interface CSVData extends Record<string, string | undefined> {
  name: string;
  description?: string;
  external_url?: string;
  background_color?: string;
  youtube_url?: string;
}

export const BundleDropBatchUpload: React.FC<BundleDropBatchUploadProps> = ({
  module,
  isOpen,
  onClose,
}) => {
  const [csvData, setCSVData] = useState<Papa.ParseResult<CSVData>>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [noCsv, setNoCsv] = useState(false);

  const mintBatch = useBundleDropBatchMint(module);

  const reset = useCallback(() => {
    setCSVData(undefined);
    setImageFiles([]);
    setVideoFiles([]);
    setNoCsv(false);
  }, []);

  const _onClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onDrop = useCallback<Required<DropzoneOptions>["onDrop"]>(
    (acceptedFiles) => {
      setNoCsv(false);

      const csvMimeTypes = [
        "text/csv",
        "text/plain",
        "text/x-csv",
        "application/vnd.ms-excel",
        "application/csv",
        "application/x-csv",
        "text/comma-separated-values",
        "text/x-comma-separated-values",
        "text/tab-separated-values",
      ];

      const csv = acceptedFiles.find(
        (f) => csvMimeTypes.includes(f.type) || f.name.endsWith(".csv"),
      );
      const images = acceptedFiles
        .filter((f) => f.type.includes("image/"))
        // sort in ascending order
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
      const videos = acceptedFiles
        .filter((f) => f.type.includes("video/"))
        // sort in ascending order
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
      if (!csv) {
        console.error("No CSV file found");
        setNoCsv(true);
        return;
      }

      Papa.parse<CSVData>(csv, {
        header: true,
        complete: (results) => {
          const validResults: Papa.ParseResult<CSVData> = {
            ...results,
            data: [],
          };
          for (let i = 0; i < results.data.length; i++) {
            if (!results.errors.find((e) => e.row === i)) {
              if (
                results.data[i].name ||
                results.data[i].Name ||
                results.data[i].NAME
              ) {
                validResults.data.push(results.data[i]);
              }
            }
          }
          setCSVData(validResults);
        },
      });

      setImageFiles(images);
      setVideoFiles(videos);
    },
    [],
  );

  const mergedData = useMemo(() => {
    if (!csvData?.data) {
      return [];
    }

    return csvData.data.map((row, index) => {
      const {
        name,
        Name,
        NAME,
        description,
        image,
        animation_url,
        external_url,
        background_color,
        youtube_url,
        ...properties
      } = row;

      return removeEmptyKeysFromObject({
        name: name || Name || NAME,
        description,
        external_url,
        background_color,
        youtube_url,
        properties: removeEmptyKeysFromObject(properties),
        image: imageFiles[index] || image || undefined,
        animation_url: videoFiles[index] || animation_url || undefined,
      });
    });
  }, [csvData, imageFiles, videoFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const paginationPortalRef = useRef<HTMLDivElement>(null);
  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="full"
      onClose={_onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex direction="column" gap={6} h="100%">
          <Flex shadow="sm">
            <Container maxW="container.page">
              <Flex align="center" justify="space-between" p={4}>
                <Flex gap={2}>
                  <Logo hideWordmark />
                  <Heading size="title.md">Batch upload</Heading>
                </Flex>
                <DrawerCloseButton position="relative" right={0} top={0} />
              </Flex>
            </Container>
          </Flex>

          {csvData ? (
            <BatchTable
              portalRef={paginationPortalRef}
              data={mergedData}
              fields={csvData?.meta.fields || []}
            />
          ) : (
            <Flex flexGrow={1} align="center" overflow="auto">
              <Container maxW="container.page">
                <UploadStep
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  noCsv={noCsv}
                  isDragActive={isDragActive}
                />
              </Container>
            </Flex>
          )}

          <Flex boxShadow="rgba(0,0,0,.1) 0px -2px 4px 0px">
            <Container maxW="container.page">
              <Flex align="center" justify="space-between" p={4}>
                <Box ref={paginationPortalRef} />
                <Flex gap={2} align="center">
                  <Button
                    size="md"
                    isDisabled={mintBatch.isLoading}
                    colorScheme="gray"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    isLoading={mintBatch.isLoading}
                    size="lg"
                    isDisabled={!mergedData.length}
                    colorScheme="blue"
                    onClick={() => {
                      mintBatch.mutate(mergedData, { onSuccess: _onClose });
                    }}
                  >
                    Upload {mergedData.length} NFTs
                  </Button>
                </Flex>
              </Flex>
            </Container>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

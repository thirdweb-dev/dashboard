import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  ListItem,
  Portal,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { isAddress } from "ethers/lib/utils";
import Papa from "papaparse";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { IoAlertCircleOutline } from "react-icons/io5";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { Column, usePagination, useTable } from "react-table";

interface SnapshotUploadProps {
  setAddresses: Dispatch<SetStateAction<string[]>>;
  isOpen: boolean;
  onClose: () => void;
}

export const SnapshotUpload: React.FC<SnapshotUploadProps> = ({
  setAddresses,
  isOpen,
  onClose,
}) => {
  const [validAddresses, setValidAddresses] = useState<string[]>([]);
  const [noCsv, setNoCsv] = useState(false);

  const reset = useCallback(() => {
    setValidAddresses([]);
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
      if (!csv) {
        console.error("No CSV file found");
        setNoCsv(true);
        return;
      }

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const addresses: string[] = [
            ...new Set(
              results.data.map((r) => Object.values(r as string[])).flat(),
            ),
          ].filter((address) => address !== "");

          setValidAddresses(addresses);
        },
      });
    },
    [],
  );

  const data = useMemo(() => {
    const valid = validAddresses.filter((address) => isAddress(address));
    const invalid = validAddresses.filter((address) => !isAddress(address));
    const ordered = [...invalid, ...valid];
    return ordered.map((address) => ({ address }));
  }, [validAddresses]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const paginationPortalRef = useRef<HTMLDivElement>(null);

  const onSave = () => {
    setAddresses(validAddresses);
    onClose();
  };

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
                  <Heading size="title.md">Snapshot Upload</Heading>
                </Flex>
                <DrawerCloseButton position="relative" right={0} top={0} />
              </Flex>
            </Container>
          </Flex>

          {validAddresses?.length > 0 ? (
            <SnapshotTable portalRef={paginationPortalRef} data={data} />
          ) : (
            <Flex flexGrow={1} align="center" overflow="auto">
              <Container maxW="container.page">
                <Flex gap={8} flexDir="column">
                  <AspectRatio ratio={21 / 9} w="100%">
                    <Center
                      borderRadius="md"
                      {...getRootProps()}
                      cursor="pointer"
                      bg={
                        noCsv
                          ? "red.200"
                          : isDragActive
                          ? "gray.400"
                          : "gray.100"
                      }
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <Heading as={Text} size="label.md">
                          Drop the files here
                        </Heading>
                      ) : (
                        <Heading as={Text} size="label.md">
                          {noCsv
                            ? "No CSV file found, please try again"
                            : "Drag & Drop a CSV file here"}
                        </Heading>
                      )}
                    </Center>
                  </AspectRatio>
                  <Flex gap={2} flexDir="column">
                    <Heading size="subtitle.sm">Requirements</Heading>
                    <UnorderedList>
                      <ListItem>
                        Files <em>must</em> contain one .csv file with a list of
                        addresses. -{" "}
                        <Link download color="blue.500" href="/snapshot.csv">
                          Download an example csv
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </Flex>
              </Container>
            </Flex>
          )}

          <Flex boxShadow="rgba(0,0,0,.1) 0px -2px 4px 0px">
            <Container maxW="container.page">
              <Flex align="center" justify="space-between" p={4}>
                <Box ref={paginationPortalRef} />
                <Flex gap={2} align="center">
                  <Button
                    size="lg"
                    colorScheme="gray"
                    onClick={() => {
                      reset();
                    }}
                    disabled={validAddresses.length === 0}
                  >
                    Reset
                  </Button>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    onClick={onSave}
                    isDisabled={
                      validAddresses.length === 0 ||
                      validAddresses.filter((address) => !isAddress(address))
                        .length > 0
                    }
                  >
                    Save
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

interface SnapshotTableProps {
  data: { address: string }[];
  portalRef: React.RefObject<HTMLDivElement>;
}

const SnapshotTable: React.FC<SnapshotTableProps> = ({ data, portalRef }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Addresses",
        accessor: ({ address }) => {
          if (isAddress(address)) {
            return address;
          } else {
            return (
              <Flex>
                <Tooltip
                  label={
                    address.endsWith(".eth")
                      ? "ENS address are not currently supported. Please use hex addresses only."
                      : "This is not a valid address"
                  }
                >
                  <Stack direction="row" align="center">
                    <Icon
                      as={IoAlertCircleOutline}
                      color="red.500"
                      boxSize={5}
                    />
                    <Text fontWeight="bold" color="red.500" cursor="default">
                      {address}
                    </Text>
                  </Stack>
                </Tooltip>
              </Flex>
            );
          }
        },
      },
    ] as Column<{ address: string }>[];
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // Instead of using 'rows', we'll use page,
    page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 50,
        pageIndex: 0,
      },
    },
    usePagination,
  );

  // Render the UI for your table
  return (
    <Flex flexGrow={1} overflow="auto">
      <Box w="100%">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Portal containerRef={portalRef}>
        <Center w="100%">
          <HStack>
            <IconButton
              isDisabled={!canPreviousPage}
              aria-label="first page"
              icon={<Icon as={MdFirstPage} />}
              onClick={() => gotoPage(0)}
            />
            <IconButton
              isDisabled={!canPreviousPage}
              aria-label="previous page"
              icon={<Icon as={MdNavigateBefore} />}
              onClick={() => previousPage()}
            />
            <Text whiteSpace="nowrap">
              Page <strong>{pageIndex + 1}</strong> of{" "}
              <strong>{pageOptions.length}</strong>
            </Text>
            <IconButton
              isDisabled={!canNextPage}
              aria-label="next page"
              icon={<Icon as={MdNavigateNext} />}
              onClick={() => nextPage()}
            />
            <IconButton
              isDisabled={!canNextPage}
              aria-label="last page"
              icon={<Icon as={MdLastPage} />}
              onClick={() => gotoPage(pageCount - 1)}
            />

            <Select
              onChange={(e) => {
                setPageSize(parseInt(e.target.value as string, 10));
              }}
              value={pageSize}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </Select>
          </HStack>
        </Center>
      </Portal>
    </Flex>
  );
};

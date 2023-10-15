import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";
import { Center, Flex, Tooltip } from "@chakra-ui/react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { DASHBOARD_STORAGE_URL } from "lib/sdk";
import { Button, Card, Heading, Text, TrackedCopyButton } from "tw-components";
import { formatDistance } from "date-fns";
import { useMemo } from "react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { toSize } from "utils/number";

export interface PinnedFilesResponse {
  result: PinnedFilesResult;
}

export interface PinnedFilesResult {
  pinnedFiles: PinnedFile[];
  cursor: string;
  count: number;
}

export interface PinnedFile {
  ipfsHash: string;
  fileSizeBytes: string;
  pinnedAt: string;
}

// TODO: move to hooks file
const PINNED_FILES_QUERY_KEY_ROOT = "pinned-files";

const PAGE_SIZE = 50;
function useAllPinnedFilesQuery() {
  const user = useLoggedInUser();
  const { token } = useApiAuthToken();

  return useInfiniteQuery({
    queryKey: [
      PINNED_FILES_QUERY_KEY_ROOT,
      { userAddress: user.user?.address, __page_size__: PAGE_SIZE },
    ],
    queryFn: async ({ pageParam }) => {
      if (!user.isLoggedIn) {
        throw new Error("User is not logged in");
      }
      if (!token) {
        throw new Error("No token");
      }
      const res = await fetch(
        `${DASHBOARD_STORAGE_URL}/ipfs/pinned?limit=${PAGE_SIZE}${
          pageParam ? `&cursor=${pageParam}` : ``
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return (await res.json()) as PinnedFilesResponse;
    },
    getNextPageParam: (lastPage) =>
      // there is only a next page cursor if the last page was full && there is a cursor
      lastPage.result.pinnedFiles.length === PAGE_SIZE &&
      lastPage.result.cursor,
    enabled: user.isLoggedIn && !!user.user?.address && !!token,
  });
}

function useUnpinFileMutation() {
  const { token } = useApiAuthToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cid }: { cid: string }) => {
      if (!token) {
        throw new Error("No token");
      }
      const res = await fetch(`${DASHBOARD_STORAGE_URL}/ipfs/pinned/${cid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
    onSuccess: () => {
      // invalidate all queries to do with pinned files
      return queryClient.invalidateQueries([PINNED_FILES_QUERY_KEY_ROOT]);
    },
  });
}

// END TOOD

const TRACKING_CATEGORY = "storage-files";

const columnHelper = createColumnHelper<PinnedFile>();

const columns = [
  columnHelper.accessor((row) => row.ipfsHash, {
    header: "IPFS Hash (CID)",
    cell: ({ cell }) => {
      const value = cell.getValue();

      return (
        <Flex align="center" maxW="300px">
          <Text isTruncated>{value}</Text>
          <TrackedCopyButton
            value={value}
            category={TRACKING_CATEGORY}
            label="copy-cid"
            aria-label="Copy CID"
          />
        </Flex>
      );
    },
  }),
  columnHelper.accessor((row) => toSize(BigInt(row.fileSizeBytes), "MB"), {
    header: "File Size",
    cell: ({ cell }) => <Text fontFamily="mono">{cell.getValue()}</Text>,
  }),
  columnHelper.accessor((row) => row.pinnedAt, {
    header: "Pinned",
    cell: ({ cell }) => {
      const date = new Date(cell.getValue());
      return (
        <Tooltip
          p={0}
          bg="transparent"
          boxShadow="none"
          label={
            <Card py={2} px={4} bgColor="backgroundHighlight">
              <Text size="label.sm">{date.toLocaleString()}</Text>
            </Card>
          }
        >
          <Text>{formatDistance(date, new Date())} ago</Text>
        </Tooltip>
      );
    },
  }),
  columnHelper.accessor((row) => row.ipfsHash, {
    id: "action",
    header: "",
    cell: ({ cell }) => <UnpinButton cid={cell.getValue()} />,
  }),
];

const UnpinButton: React.FC<{ cid: string }> = ({ cid }) => {
  const { mutateAsync, isLoading } = useUnpinFileMutation();
  return (
    <Button
      isLoading={isLoading}
      size="sm"
      variant="outline"
      onClick={() => mutateAsync({ cid })}
    >
      Unpin
    </Button>
  );
};

export const YourFilesSection: React.FC = () => {
  const user = useLoggedInUser();
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAllPinnedFilesQuery();

  const mergedPages = useMemo(
    () =>
      data?.pages.reduce(
        (acc, page) => [...acc, ...page.result.pinnedFiles],
        [] as PinnedFile[],
      ),
    [data?.pages],
  );

  return (
    <Flex flexDir="column" w="full" gap={4}>
      <Heading size="title.md" as="h2">
        Your Pinned Files
      </Heading>

      {user.isLoggedIn ? (
        <>
          <TWTable
            title="file"
            data={mergedPages || []}
            columns={columns}
            isLoading={isLoading}
            isFetched={isFetched}
          />
          {hasNextPage && (
            <Center>
              <Button
                isLoading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                size="sm"
                variant="outline"
              >
                Load more
              </Button>
            </Center>
          )}
        </>
      ) : (
        <Card>
          <Center>
            <Text>
              Please connect your wallet to see the files you have pinned.
            </Text>
          </Center>
        </Card>
      )}
    </Flex>
  );
};

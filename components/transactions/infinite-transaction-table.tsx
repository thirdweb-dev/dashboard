import { Chain } from "@thirdweb-dev/chains";
import {
  useAddress,
  useContract,
  useContractRead,
  useSDK,
} from "@thirdweb-dev/react";
import { getTransactions } from "data/api/functions/transactions";
import {
  useInfiniteTransactionsQuery,
  useLatestTransactionQuery,
} from "data/api/hooks/transactions";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "tw-components";

interface InfiniteTransactionsTableProps {
  chain: Chain;
  contractAddress: string;
}

export const InfiniteTransactionsTable: React.FC<
  InfiniteTransactionsTableProps
> = ({ chain, contractAddress }) => {
  const [startingBlock, setStartingBlock] = useState<number>(0);
  const promRef = useRef<Promise<any>>();

  useEffect(() => {
    if (!startingBlock && !promRef.current && chain && contractAddress) {
      promRef.current = getTransactions({
        chain,
        address: contractAddress,
        limit: 1,
      })
        .then((res) => {
          setStartingBlock(res.result[0].block_number);
        })
        .catch((err) => {
          promRef.current = undefined;
          console.error(err);
        });
    }
  }, [chain, contractAddress, startingBlock]);

  if (!startingBlock) {
    return null;
  }

  return (
    <RecursiveRowRenderer
      chain={chain}
      contractAddress={contractAddress}
      endBlock={startingBlock}
    />
  );
};

// const TransactionTable

interface RecursiveRowRendererProps {
  chain: Chain;
  contractAddress: string;
  startBlock?: number;
  endBlock: number;
}

const RecursiveRowRenderer: React.FC<RecursiveRowRendererProps> = ({
  chain,
  contractAddress,
  startBlock = 0,
  endBlock,
}) => {
  const [show, setShow] = useState(false);
  const latestTransaction = useLatestTransactionQuery({
    chain,
    address: contractAddress,
    start_block: startBlock.toString(),
    isEnabled: !show,
  });

  const infiniteQuery = useInfiniteTransactionsQuery({
    chain,
    address: contractAddress,
    end_block: endBlock.toString(),
    start_block: startBlock.toString(),
  });

  const latestBlock = latestTransaction.data?.result[0]?.block_number;
  const firstInfiniteBlock =
    infiniteQuery.data?.pages[0]?.result[0]?.block_number;
  return (
    <>
      {firstInfiniteBlock &&
      latestBlock &&
      latestBlock !== firstInfiniteBlock ? (
        show ? (
          <RecursiveRowRenderer
            chain={chain}
            contractAddress={contractAddress}
            endBlock={latestBlock}
            startBlock={firstInfiniteBlock}
          />
        ) : (
          <Button onClick={() => setShow(true)}>Show Above</Button>
        )
      ) : null}
      {infiniteQuery.data?.pages.map((page) => (
        <React.Fragment key={page.next}>
          {page.result.map((project) => (
            <p
              // style={{
              //   border: "1px solid gray",
              //   borderRadius: "5px",
              //   background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
              // }}
              key={project.hash}
            >
              {project.hash}
            </p>
          ))}
        </React.Fragment>
      ))}
      {infiniteQuery.hasNextPage && (
        <div>
          <Button
            // ref={ref}
            onClick={() => infiniteQuery.fetchNextPage()}
            disabled={
              !infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage
            }
          >
            {infiniteQuery.isFetchingNextPage
              ? "Loading more..."
              : "Load Newer"}
          </Button>
        </div>
      )}
    </>
  );
};

import { analyticsKeys } from "../cache-keys";
import { useQueryWithNetwork } from "./query/useQueryWithNetwork";
import { useContractType } from "@thirdweb-dev/react";
import { ValidContractClass } from "@thirdweb-dev/sdk";
import { C } from "ts-toolbelt";

interface Event {
  eventName: string;
  dataName: string;
}

const CONTRACT_ANALYTICS: Record<string, Event[]> = {
  "nft-collection": [
    { eventName: "TokensMinted", dataName: "Tokens Minted" },
    { eventName: "Transfer", dataName: "Tokens Transferred" },
  ],
  edition: [
    { eventName: "TokensMinted", dataName: "Tokens Minted" },
    { eventName: "Transfer", dataName: "Tokens Transferred" },
  ],
  token: [
    { eventName: "TokensMinted", dataName: "Tokens Minted" },
    { eventName: "Transfer", dataName: "Tokens Transferred" },
  ],
  marketplace: [
    { eventName: "ListingAdded", dataName: "Listings Created" },
    { eventName: "NewOffer", dataName: "Offers Made" },
    { eventName: "NewSale", dataName: "Sales Made" },
    { eventName: "AuctionClosed", dataName: "Auctions Closed" },
  ],
  "nft-drop": [
    { eventName: "TokensLazyMinted", dataName: "Tokens Minted" },
    { eventName: "Transfer", dataName: "Tokens Transferred" },
  ],
  "edition-drop": [
    { eventName: "TokensLazyMinted", dataName: "Tokens Minted" },
    { eventName: "Transfer", dataName: "Tokens Transferred" },
  ],
  "token-drop": [
    { eventName: "TokensLazyMinted", dataName: "Tokens Minted" },
    { eventName: "Transfer", dataName: "Tokens Transferred" },
  ],
  pack: [],
  split: [
    { eventName: "PaymentsReceived", dataName: "Payments Received" },
    { eventName: "PaymentsReleased", dataName: "Payments Released" },
  ],
  vote: [
    { eventName: "ProposalCreated", dataName: "Proposals Created" },
    { eventName: "ProposalExecuted", dataName: "Proposals Executed" },
    { eventName: "VoteCast", dataName: "Votes Casted" },
  ],
  custom: [],
};

export function useContractAnalytics<TContract extends ValidContractClass>(
  contract?: C.Instance<TContract>,
) {
  const { data: type } = useContractType(contract?.getAddress());

  return useQueryWithNetwork(
    analyticsKeys.detail(contract?.getAddress()),
    async () => {
      const events = CONTRACT_ANALYTICS[type as string];
      const analytics = events.map(async (event) => {
        const data = await contract?.analytics.query(event.eventName);
        return {
          name: event.dataName,
          value: data?.length,
        };
      });
      return await Promise.all(analytics);
    },
    {
      enabled: !!contract && !!type,
    },
  );
}

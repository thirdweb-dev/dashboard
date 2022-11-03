import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { shouldNeverPersistQuery } from "@thirdweb-dev/react";
import { del, get, set } from "idb-keyval";

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery") {
  return {
    persistClient: async (client: PersistedClient) => {
      set(
        idbValidKey,
        JSON.stringify({
          ...client,
          clientState: {
            ...client.clientState,
            queries: client.clientState.queries.filter(
              // covers solana as well as evm
              (q) => !shouldNeverPersistQuery(q.queryKey),
            ),
          },
        }),
      );
    },
    restoreClient: async () => {
      const store = await get<string>(idbValidKey);
      return store ? (JSON.parse(store) as PersistedClient) : undefined;
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
}

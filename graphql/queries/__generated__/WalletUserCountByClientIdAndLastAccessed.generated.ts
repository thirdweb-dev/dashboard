import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WalletUserCountByClientIdAndLastAccessedQueryVariables = Types.Exact<{
  clientId: Types.Scalars['uuid']['input'];
  lastAccessedAt: Types.Scalars['timestamptz']['input'];
}>;


export type WalletUserCountByClientIdAndLastAccessedQuery = { __typename?: 'query_root', wallet_user_aggregate: { __typename?: 'wallet_user_aggregate', aggregate?: { __typename?: 'wallet_user_aggregate_fields', count: number } | null } };


export const WalletUserCountByClientIdAndLastAccessedDocument = gql`
    query WalletUserCountByClientIdAndLastAccessed($clientId: uuid!, $lastAccessedAt: timestamptz!) {
  wallet_user_aggregate(
    where: {client_id: {_eq: $clientId}, last_accessed_at: {_gte: $lastAccessedAt}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useWalletUserCountByClientIdAndLastAccessedQuery__
 *
 * To run a query within a React component, call `useWalletUserCountByClientIdAndLastAccessedQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletUserCountByClientIdAndLastAccessedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletUserCountByClientIdAndLastAccessedQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      lastAccessedAt: // value for 'lastAccessedAt'
 *   },
 * });
 */
export function useWalletUserCountByClientIdAndLastAccessedQuery(baseOptions: Apollo.QueryHookOptions<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>(WalletUserCountByClientIdAndLastAccessedDocument, options);
      }
export function useWalletUserCountByClientIdAndLastAccessedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>(WalletUserCountByClientIdAndLastAccessedDocument, options);
        }
export function useWalletUserCountByClientIdAndLastAccessedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>(WalletUserCountByClientIdAndLastAccessedDocument, options);
        }
export type WalletUserCountByClientIdAndLastAccessedQueryHookResult = ReturnType<typeof useWalletUserCountByClientIdAndLastAccessedQuery>;
export type WalletUserCountByClientIdAndLastAccessedLazyQueryHookResult = ReturnType<typeof useWalletUserCountByClientIdAndLastAccessedLazyQuery>;
export type WalletUserCountByClientIdAndLastAccessedSuspenseQueryHookResult = ReturnType<typeof useWalletUserCountByClientIdAndLastAccessedSuspenseQuery>;
export type WalletUserCountByClientIdAndLastAccessedQueryResult = Apollo.QueryResult<WalletUserCountByClientIdAndLastAccessedQuery, WalletUserCountByClientIdAndLastAccessedQueryVariables>;
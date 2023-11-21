import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FloatWalletFragmentDoc } from '../../fragments/__generated__/FloatWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListFloatWalletsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListFloatWalletsQuery = { __typename?: 'query_root', float_wallet: Array<{ __typename?: 'float_wallet', address: string, nickname: string, env_var_key?: string | null, description?: string | null }> };


export const ListFloatWalletsDocument = gql`
    query ListFloatWallets {
  float_wallet(where: {deleted_at: {_is_null: true}}, order_by: {nickname: asc}) {
    ...FloatWallet
  }
}
    ${FloatWalletFragmentDoc}`;

/**
 * __useListFloatWalletsQuery__
 *
 * To run a query within a React component, call `useListFloatWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFloatWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFloatWalletsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListFloatWalletsQuery(baseOptions?: Apollo.QueryHookOptions<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>(ListFloatWalletsDocument, options);
      }
export function useListFloatWalletsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>(ListFloatWalletsDocument, options);
        }
export function useListFloatWalletsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>(ListFloatWalletsDocument, options);
        }
export type ListFloatWalletsQueryHookResult = ReturnType<typeof useListFloatWalletsQuery>;
export type ListFloatWalletsLazyQueryHookResult = ReturnType<typeof useListFloatWalletsLazyQuery>;
export type ListFloatWalletsSuspenseQueryHookResult = ReturnType<typeof useListFloatWalletsSuspenseQuery>;
export type ListFloatWalletsQueryResult = Apollo.QueryResult<ListFloatWalletsQuery, ListFloatWalletsQueryVariables>;
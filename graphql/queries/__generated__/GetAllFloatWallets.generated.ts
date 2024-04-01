import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllFloatWalletsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllFloatWalletsQuery = { __typename?: 'query_root', float_wallet: Array<{ __typename?: 'float_wallet', address: string }> };


export const GetAllFloatWalletsDocument = gql`
    query GetAllFloatWallets {
  float_wallet(where: {deleted_at: {_is_null: true}}) {
    address
  }
}
    `;

/**
 * __useGetAllFloatWalletsQuery__
 *
 * To run a query within a React component, call `useGetAllFloatWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFloatWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFloatWalletsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFloatWalletsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>(GetAllFloatWalletsDocument, options);
      }
export function useGetAllFloatWalletsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>(GetAllFloatWalletsDocument, options);
        }
export function useGetAllFloatWalletsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>(GetAllFloatWalletsDocument, options);
        }
export type GetAllFloatWalletsQueryHookResult = ReturnType<typeof useGetAllFloatWalletsQuery>;
export type GetAllFloatWalletsLazyQueryHookResult = ReturnType<typeof useGetAllFloatWalletsLazyQuery>;
export type GetAllFloatWalletsSuspenseQueryHookResult = ReturnType<typeof useGetAllFloatWalletsSuspenseQuery>;
export type GetAllFloatWalletsQueryResult = Apollo.QueryResult<GetAllFloatWalletsQuery, GetAllFloatWalletsQueryVariables>;
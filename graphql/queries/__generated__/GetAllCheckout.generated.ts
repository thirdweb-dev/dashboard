import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllCheckoutQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCheckoutQuery = { __typename?: 'query_root', checkout: Array<{ __typename?: 'checkout', contract_chain: string, owner_id: string, created_at: any }> };


export const GetAllCheckoutDocument = gql`
    query GetAllCheckout {
  checkout(
    order_by: {created_at: asc}
    where: {collection_title: {_nin: ["Paper Explorers 721", "Paper Explorers 1155", "Paper Explorers"]}, created_at: {_lte: "2022-06-07T21:05:57.627Z", _gt: "2022-04-06T11:36:25.920Z"}}
  ) {
    contract_chain
    owner_id
    created_at
  }
}
    `;

/**
 * __useGetAllCheckoutQuery__
 *
 * To run a query within a React component, call `useGetAllCheckoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCheckoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCheckoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCheckoutQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>(GetAllCheckoutDocument, options);
      }
export function useGetAllCheckoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>(GetAllCheckoutDocument, options);
        }
export function useGetAllCheckoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>(GetAllCheckoutDocument, options);
        }
export type GetAllCheckoutQueryHookResult = ReturnType<typeof useGetAllCheckoutQuery>;
export type GetAllCheckoutLazyQueryHookResult = ReturnType<typeof useGetAllCheckoutLazyQuery>;
export type GetAllCheckoutSuspenseQueryHookResult = ReturnType<typeof useGetAllCheckoutSuspenseQuery>;
export type GetAllCheckoutQueryResult = Apollo.QueryResult<GetAllCheckoutQuery, GetAllCheckoutQueryVariables>;
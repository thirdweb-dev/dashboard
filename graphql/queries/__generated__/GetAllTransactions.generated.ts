import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllValidTransactionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllValidTransactionsQuery = { __typename?: 'query_root', transaction: Array<{ __typename?: 'transaction', total_price_usd_cents?: number | null, wallet_address?: string | null, payment_completed_at?: any | null, checkout: { __typename?: 'checkout', owner_id: string, contract_chain: string } }> };


export const GetAllValidTransactionsDocument = gql`
    query GetAllValidTransactions {
  transaction(
    order_by: {created_at: asc}
    where: {transfer_completed_at: {_is_null: false}, payment_completed_at: {_is_null: false}, total_price_usd_cents: {_is_null: false}, wallet_address: {_is_null: false}}
  ) {
    checkout {
      owner_id
      contract_chain
    }
    total_price_usd_cents
    wallet_address
    payment_completed_at
  }
}
    `;

/**
 * __useGetAllValidTransactionsQuery__
 *
 * To run a query within a React component, call `useGetAllValidTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllValidTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllValidTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllValidTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>(GetAllValidTransactionsDocument, options);
      }
export function useGetAllValidTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>(GetAllValidTransactionsDocument, options);
        }
export function useGetAllValidTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>(GetAllValidTransactionsDocument, options);
        }
export type GetAllValidTransactionsQueryHookResult = ReturnType<typeof useGetAllValidTransactionsQuery>;
export type GetAllValidTransactionsLazyQueryHookResult = ReturnType<typeof useGetAllValidTransactionsLazyQuery>;
export type GetAllValidTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetAllValidTransactionsSuspenseQuery>;
export type GetAllValidTransactionsQueryResult = Apollo.QueryResult<GetAllValidTransactionsQuery, GetAllValidTransactionsQueryVariables>;
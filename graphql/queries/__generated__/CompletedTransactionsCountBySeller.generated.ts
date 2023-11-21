import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompletedTransactionsCountBySellerQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type CompletedTransactionsCountBySellerQuery = { __typename?: 'query_root', transaction_aggregate: { __typename?: 'transaction_aggregate', aggregate?: { __typename?: 'transaction_aggregate_fields', count: number } | null } };


export const CompletedTransactionsCountBySellerDocument = gql`
    query CompletedTransactionsCountBySeller($sellerId: String!) {
  transaction_aggregate(
    where: {payment_completed_at: {_is_null: false}, checkout: {seller: {id: {_eq: $sellerId}}}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useCompletedTransactionsCountBySellerQuery__
 *
 * To run a query within a React component, call `useCompletedTransactionsCountBySellerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedTransactionsCountBySellerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedTransactionsCountBySellerQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useCompletedTransactionsCountBySellerQuery(baseOptions: Apollo.QueryHookOptions<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>(CompletedTransactionsCountBySellerDocument, options);
      }
export function useCompletedTransactionsCountBySellerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>(CompletedTransactionsCountBySellerDocument, options);
        }
export function useCompletedTransactionsCountBySellerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>(CompletedTransactionsCountBySellerDocument, options);
        }
export type CompletedTransactionsCountBySellerQueryHookResult = ReturnType<typeof useCompletedTransactionsCountBySellerQuery>;
export type CompletedTransactionsCountBySellerLazyQueryHookResult = ReturnType<typeof useCompletedTransactionsCountBySellerLazyQuery>;
export type CompletedTransactionsCountBySellerSuspenseQueryHookResult = ReturnType<typeof useCompletedTransactionsCountBySellerSuspenseQuery>;
export type CompletedTransactionsCountBySellerQueryResult = Apollo.QueryResult<CompletedTransactionsCountBySellerQuery, CompletedTransactionsCountBySellerQueryVariables>;
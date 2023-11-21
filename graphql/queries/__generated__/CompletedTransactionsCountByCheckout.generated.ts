import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompletedTransactionsCountByCheckoutQueryVariables = Types.Exact<{
  checkoutId: Types.Scalars['uuid']['input'];
}>;


export type CompletedTransactionsCountByCheckoutQuery = { __typename?: 'query_root', transaction_aggregate: { __typename?: 'transaction_aggregate', aggregate?: { __typename?: 'transaction_aggregate_fields', count: number } | null } };


export const CompletedTransactionsCountByCheckoutDocument = gql`
    query CompletedTransactionsCountByCheckout($checkoutId: uuid!) {
  transaction_aggregate(
    where: {checkout: {id: {_eq: $checkoutId}}, payment_completed_at: {_is_null: false}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useCompletedTransactionsCountByCheckoutQuery__
 *
 * To run a query within a React component, call `useCompletedTransactionsCountByCheckoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedTransactionsCountByCheckoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedTransactionsCountByCheckoutQuery({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *   },
 * });
 */
export function useCompletedTransactionsCountByCheckoutQuery(baseOptions: Apollo.QueryHookOptions<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>(CompletedTransactionsCountByCheckoutDocument, options);
      }
export function useCompletedTransactionsCountByCheckoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>(CompletedTransactionsCountByCheckoutDocument, options);
        }
export function useCompletedTransactionsCountByCheckoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>(CompletedTransactionsCountByCheckoutDocument, options);
        }
export type CompletedTransactionsCountByCheckoutQueryHookResult = ReturnType<typeof useCompletedTransactionsCountByCheckoutQuery>;
export type CompletedTransactionsCountByCheckoutLazyQueryHookResult = ReturnType<typeof useCompletedTransactionsCountByCheckoutLazyQuery>;
export type CompletedTransactionsCountByCheckoutSuspenseQueryHookResult = ReturnType<typeof useCompletedTransactionsCountByCheckoutSuspenseQuery>;
export type CompletedTransactionsCountByCheckoutQueryResult = Apollo.QueryResult<CompletedTransactionsCountByCheckoutQuery, CompletedTransactionsCountByCheckoutQueryVariables>;
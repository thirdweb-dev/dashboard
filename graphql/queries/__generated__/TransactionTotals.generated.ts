import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransactionTotalsQueryVariables = Types.Exact<{
  checkoutId: Types.Scalars['uuid']['input'];
  startTimestamp: Types.Scalars['timestamptz']['input'];
  endTimestamp: Types.Scalars['timestamptz']['input'];
}>;


export type TransactionTotalsQuery = { __typename?: 'query_root', transaction_aggregate: { __typename?: 'transaction_aggregate', aggregate?: { __typename?: 'transaction_aggregate_fields', sum?: { __typename?: 'transaction_sum_fields', total_price_usd_cents?: number | null, service_fee_usd_cents?: number | null, network_fee_usd_cents?: number | null, quantity?: number | null } | null } | null } };


export const TransactionTotalsDocument = gql`
    query TransactionTotals($checkoutId: uuid!, $startTimestamp: timestamptz!, $endTimestamp: timestamptz!) {
  transaction_aggregate(
    where: {checkout_id: {_eq: $checkoutId}, transfer_completed_at: {_gte: $startTimestamp, _lte: $endTimestamp}}
  ) {
    aggregate {
      sum {
        total_price_usd_cents
        service_fee_usd_cents
        network_fee_usd_cents
        quantity
      }
    }
  }
}
    `;

/**
 * __useTransactionTotalsQuery__
 *
 * To run a query within a React component, call `useTransactionTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionTotalsQuery({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      startTimestamp: // value for 'startTimestamp'
 *      endTimestamp: // value for 'endTimestamp'
 *   },
 * });
 */
export function useTransactionTotalsQuery(baseOptions: Apollo.QueryHookOptions<TransactionTotalsQuery, TransactionTotalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionTotalsQuery, TransactionTotalsQueryVariables>(TransactionTotalsDocument, options);
      }
export function useTransactionTotalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionTotalsQuery, TransactionTotalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionTotalsQuery, TransactionTotalsQueryVariables>(TransactionTotalsDocument, options);
        }
export function useTransactionTotalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionTotalsQuery, TransactionTotalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionTotalsQuery, TransactionTotalsQueryVariables>(TransactionTotalsDocument, options);
        }
export type TransactionTotalsQueryHookResult = ReturnType<typeof useTransactionTotalsQuery>;
export type TransactionTotalsLazyQueryHookResult = ReturnType<typeof useTransactionTotalsLazyQuery>;
export type TransactionTotalsSuspenseQueryHookResult = ReturnType<typeof useTransactionTotalsSuspenseQuery>;
export type TransactionTotalsQueryResult = Apollo.QueryResult<TransactionTotalsQuery, TransactionTotalsQueryVariables>;
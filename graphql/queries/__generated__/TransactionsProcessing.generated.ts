import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransactionsProcessingQueryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String']['input'];
  fromPaymentCompletedAt: Types.Scalars['timestamptz']['input'];
}>;


export type TransactionsProcessingQuery = { __typename?: 'query_root', transaction_aggregate: { __typename?: 'transaction_aggregate', aggregate?: { __typename?: 'transaction_aggregate_fields', count: number } | null } };


export const TransactionsProcessingDocument = gql`
    query TransactionsProcessing($contractAddress: String!, $fromPaymentCompletedAt: timestamptz!) {
  transaction_aggregate(
    where: {checkout: {contract_address: {_eq: $contractAddress}}, payment_completed_at: {_gt: $fromPaymentCompletedAt}, transfer_completed_at: {_is_null: true}, refunded_at: {_is_null: true}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useTransactionsProcessingQuery__
 *
 * To run a query within a React component, call `useTransactionsProcessingQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsProcessingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsProcessingQuery({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      fromPaymentCompletedAt: // value for 'fromPaymentCompletedAt'
 *   },
 * });
 */
export function useTransactionsProcessingQuery(baseOptions: Apollo.QueryHookOptions<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>(TransactionsProcessingDocument, options);
      }
export function useTransactionsProcessingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>(TransactionsProcessingDocument, options);
        }
export function useTransactionsProcessingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>(TransactionsProcessingDocument, options);
        }
export type TransactionsProcessingQueryHookResult = ReturnType<typeof useTransactionsProcessingQuery>;
export type TransactionsProcessingLazyQueryHookResult = ReturnType<typeof useTransactionsProcessingLazyQuery>;
export type TransactionsProcessingSuspenseQueryHookResult = ReturnType<typeof useTransactionsProcessingSuspenseQuery>;
export type TransactionsProcessingQueryResult = Apollo.QueryResult<TransactionsProcessingQuery, TransactionsProcessingQueryVariables>;
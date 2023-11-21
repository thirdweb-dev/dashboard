import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransactionsProcessingWithTokenIdQueryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String']['input'];
  tokenId: Types.Scalars['String']['input'];
  fromPaymentCompletedAt: Types.Scalars['timestamptz']['input'];
}>;


export type TransactionsProcessingWithTokenIdQuery = { __typename?: 'query_root', transaction_aggregate: { __typename?: 'transaction_aggregate', aggregate?: { __typename?: 'transaction_aggregate_fields', count: number } | null } };


export const TransactionsProcessingWithTokenIdDocument = gql`
    query TransactionsProcessingWithTokenId($contractAddress: String!, $tokenId: String!, $fromPaymentCompletedAt: timestamptz!) {
  transaction_aggregate(
    where: {checkout: {contract_address: {_eq: $contractAddress}}, requested_token_id: {_eq: $tokenId}, payment_completed_at: {_gt: $fromPaymentCompletedAt}, transfer_completed_at: {_is_null: true}, refunded_at: {_is_null: true}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useTransactionsProcessingWithTokenIdQuery__
 *
 * To run a query within a React component, call `useTransactionsProcessingWithTokenIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsProcessingWithTokenIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsProcessingWithTokenIdQuery({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      tokenId: // value for 'tokenId'
 *      fromPaymentCompletedAt: // value for 'fromPaymentCompletedAt'
 *   },
 * });
 */
export function useTransactionsProcessingWithTokenIdQuery(baseOptions: Apollo.QueryHookOptions<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>(TransactionsProcessingWithTokenIdDocument, options);
      }
export function useTransactionsProcessingWithTokenIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>(TransactionsProcessingWithTokenIdDocument, options);
        }
export function useTransactionsProcessingWithTokenIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>(TransactionsProcessingWithTokenIdDocument, options);
        }
export type TransactionsProcessingWithTokenIdQueryHookResult = ReturnType<typeof useTransactionsProcessingWithTokenIdQuery>;
export type TransactionsProcessingWithTokenIdLazyQueryHookResult = ReturnType<typeof useTransactionsProcessingWithTokenIdLazyQuery>;
export type TransactionsProcessingWithTokenIdSuspenseQueryHookResult = ReturnType<typeof useTransactionsProcessingWithTokenIdSuspenseQuery>;
export type TransactionsProcessingWithTokenIdQueryResult = Apollo.QueryResult<TransactionsProcessingWithTokenIdQuery, TransactionsProcessingWithTokenIdQueryVariables>;
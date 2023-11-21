import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransactionsCountByCheckoutQueryVariables = Types.Exact<{
  checkoutId: Types.Scalars['uuid']['input'];
  dynamicFilters?: Types.InputMaybe<Array<Types.Transaction_Bool_Exp> | Types.Transaction_Bool_Exp>;
}>;


export type TransactionsCountByCheckoutQuery = { __typename?: 'query_root', transaction_aggregate: { __typename?: 'transaction_aggregate', aggregate?: { __typename?: 'transaction_aggregate_fields', count: number } | null } };


export const TransactionsCountByCheckoutDocument = gql`
    query TransactionsCountByCheckout($checkoutId: uuid!, $dynamicFilters: [transaction_bool_exp!]) {
  transaction_aggregate(
    where: {checkout_id: {_eq: $checkoutId}, _and: $dynamicFilters, _or: [{payment_completed_at: {_is_null: false}}, {payment_failure_code: {_is_null: false}}, {refunded_at: {_is_null: false}}, {transfer_completed_at: {_is_null: false}}]}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useTransactionsCountByCheckoutQuery__
 *
 * To run a query within a React component, call `useTransactionsCountByCheckoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsCountByCheckoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsCountByCheckoutQuery({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      dynamicFilters: // value for 'dynamicFilters'
 *   },
 * });
 */
export function useTransactionsCountByCheckoutQuery(baseOptions: Apollo.QueryHookOptions<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>(TransactionsCountByCheckoutDocument, options);
      }
export function useTransactionsCountByCheckoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>(TransactionsCountByCheckoutDocument, options);
        }
export function useTransactionsCountByCheckoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>(TransactionsCountByCheckoutDocument, options);
        }
export type TransactionsCountByCheckoutQueryHookResult = ReturnType<typeof useTransactionsCountByCheckoutQuery>;
export type TransactionsCountByCheckoutLazyQueryHookResult = ReturnType<typeof useTransactionsCountByCheckoutLazyQuery>;
export type TransactionsCountByCheckoutSuspenseQueryHookResult = ReturnType<typeof useTransactionsCountByCheckoutSuspenseQuery>;
export type TransactionsCountByCheckoutQueryResult = Apollo.QueryResult<TransactionsCountByCheckoutQuery, TransactionsCountByCheckoutQueryVariables>;
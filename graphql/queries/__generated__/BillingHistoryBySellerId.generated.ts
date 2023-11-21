import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BillingHistoryFragmentDoc } from '../../fragments/__generated__/BillingHistory.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BillingHistoryBySellerIdQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type BillingHistoryBySellerIdQuery = { __typename?: 'query_root', billing_history: Array<{ __typename?: 'billing_history', id: any, seller_id: string, type: string, description: string, stripe_payment_id: string, price_charged_usd_cents: number, status: string, payment_completed_at: any }> };


export const BillingHistoryBySellerIdDocument = gql`
    query BillingHistoryBySellerId($sellerId: String!) {
  billing_history(
    where: {seller_id: {_eq: $sellerId}}
    order_by: {payment_completed_at: desc}
  ) {
    ...BillingHistory
  }
}
    ${BillingHistoryFragmentDoc}`;

/**
 * __useBillingHistoryBySellerIdQuery__
 *
 * To run a query within a React component, call `useBillingHistoryBySellerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillingHistoryBySellerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillingHistoryBySellerIdQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useBillingHistoryBySellerIdQuery(baseOptions: Apollo.QueryHookOptions<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>(BillingHistoryBySellerIdDocument, options);
      }
export function useBillingHistoryBySellerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>(BillingHistoryBySellerIdDocument, options);
        }
export function useBillingHistoryBySellerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>(BillingHistoryBySellerIdDocument, options);
        }
export type BillingHistoryBySellerIdQueryHookResult = ReturnType<typeof useBillingHistoryBySellerIdQuery>;
export type BillingHistoryBySellerIdLazyQueryHookResult = ReturnType<typeof useBillingHistoryBySellerIdLazyQuery>;
export type BillingHistoryBySellerIdSuspenseQueryHookResult = ReturnType<typeof useBillingHistoryBySellerIdSuspenseQuery>;
export type BillingHistoryBySellerIdQueryResult = Apollo.QueryResult<BillingHistoryBySellerIdQuery, BillingHistoryBySellerIdQueryVariables>;
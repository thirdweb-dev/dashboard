import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerBillingPlanFragmentDoc } from '../../fragments/__generated__/SellerBillingPlan.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SellerBillingPlanBySellerIdQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type SellerBillingPlanBySellerIdQuery = { __typename?: 'query_root', seller_billing_plan_by_pk?: { __typename?: 'seller_billing_plan', seller_id: string, type: string, plan_price_usd_cents: number, created_at: any, last_billed_at?: any | null, expires_at?: any | null, cancelled_at?: any | null } | null };


export const SellerBillingPlanBySellerIdDocument = gql`
    query SellerBillingPlanBySellerId($sellerId: String!) {
  seller_billing_plan_by_pk(seller_id: $sellerId) {
    ...SellerBillingPlan
  }
}
    ${SellerBillingPlanFragmentDoc}`;

/**
 * __useSellerBillingPlanBySellerIdQuery__
 *
 * To run a query within a React component, call `useSellerBillingPlanBySellerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerBillingPlanBySellerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerBillingPlanBySellerIdQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useSellerBillingPlanBySellerIdQuery(baseOptions: Apollo.QueryHookOptions<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>(SellerBillingPlanBySellerIdDocument, options);
      }
export function useSellerBillingPlanBySellerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>(SellerBillingPlanBySellerIdDocument, options);
        }
export function useSellerBillingPlanBySellerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>(SellerBillingPlanBySellerIdDocument, options);
        }
export type SellerBillingPlanBySellerIdQueryHookResult = ReturnType<typeof useSellerBillingPlanBySellerIdQuery>;
export type SellerBillingPlanBySellerIdLazyQueryHookResult = ReturnType<typeof useSellerBillingPlanBySellerIdLazyQuery>;
export type SellerBillingPlanBySellerIdSuspenseQueryHookResult = ReturnType<typeof useSellerBillingPlanBySellerIdSuspenseQuery>;
export type SellerBillingPlanBySellerIdQueryResult = Apollo.QueryResult<SellerBillingPlanBySellerIdQuery, SellerBillingPlanBySellerIdQueryVariables>;
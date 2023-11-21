import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { DetailedAnalyticsFragmentDoc } from '../../fragments/__generated__/DetailedAnalytics.generated';
import { AnalyticOverviewFragmentDoc } from '../../fragments/__generated__/AnalyticOverview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DetailedAnalyticsQueryVariables = Types.Exact<{
  checkoutId: Types.Scalars['uuid']['input'];
  period?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DetailedAnalyticsQuery = { __typename?: 'query_root', get_detailed_analytics: Array<{ __typename?: 'detailed_analytics', checkout_id: any, sales: any, page_visits: any, transaction_created_at: any, network_fee_usd_cents: any, paper_fee_usd_cents: any, revenue_usd_cents: any }>, analytics_overview_2: Array<{ __typename?: 'analytics_overview_2', checkout_id?: any | null, checkout_created_at?: any | null, checkout_deleted_at?: any | null, collection_description?: string | null, collection_title?: string | null, image_url?: string | null, network_fees_cents?: any | null, number_sold?: any | null, owner_id?: string | null, paper_fees_cents?: any | null, payment_method?: string | null, revenue_cents?: any | null, wallet_type?: string | null, fiat_currency?: string | null, num_transactions_made?: any | null }> };


export const DetailedAnalyticsDocument = gql`
    query DetailedAnalytics($checkoutId: uuid!, $period: String = "day") {
  get_detailed_analytics(
    args: {period: $period, checkout_id_to_fetch: $checkoutId}
    order_by: {transaction_created_at: asc}
  ) {
    ...DetailedAnalytics
  }
  analytics_overview_2(where: {checkout_id: {_eq: $checkoutId}}) {
    ...AnalyticOverview
  }
}
    ${DetailedAnalyticsFragmentDoc}
${AnalyticOverviewFragmentDoc}`;

/**
 * __useDetailedAnalyticsQuery__
 *
 * To run a query within a React component, call `useDetailedAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailedAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailedAnalyticsQuery({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      period: // value for 'period'
 *   },
 * });
 */
export function useDetailedAnalyticsQuery(baseOptions: Apollo.QueryHookOptions<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>(DetailedAnalyticsDocument, options);
      }
export function useDetailedAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>(DetailedAnalyticsDocument, options);
        }
export function useDetailedAnalyticsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>(DetailedAnalyticsDocument, options);
        }
export type DetailedAnalyticsQueryHookResult = ReturnType<typeof useDetailedAnalyticsQuery>;
export type DetailedAnalyticsLazyQueryHookResult = ReturnType<typeof useDetailedAnalyticsLazyQuery>;
export type DetailedAnalyticsSuspenseQueryHookResult = ReturnType<typeof useDetailedAnalyticsSuspenseQuery>;
export type DetailedAnalyticsQueryResult = Apollo.QueryResult<DetailedAnalyticsQuery, DetailedAnalyticsQueryVariables>;
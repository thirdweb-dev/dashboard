import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AnalyticOverviewFragmentDoc } from '../../fragments/__generated__/AnalyticOverview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AnalyticOverviewQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
}>;


export type AnalyticOverviewQuery = { __typename?: 'query_root', analytics_overview_2: Array<{ __typename?: 'analytics_overview_2', checkout_id?: any | null, checkout_created_at?: any | null, checkout_deleted_at?: any | null, collection_description?: string | null, collection_title?: string | null, image_url?: string | null, network_fees_cents?: any | null, number_sold?: any | null, owner_id?: string | null, paper_fees_cents?: any | null, payment_method?: string | null, revenue_cents?: any | null, wallet_type?: string | null, fiat_currency?: string | null, num_transactions_made?: any | null }> };


export const AnalyticOverviewDocument = gql`
    query AnalyticOverview($ownerId: String!) {
  analytics_overview_2(
    where: {owner_id: {_eq: $ownerId}}
    order_by: {checkout_created_at: desc}
  ) {
    ...AnalyticOverview
  }
}
    ${AnalyticOverviewFragmentDoc}`;

/**
 * __useAnalyticOverviewQuery__
 *
 * To run a query within a React component, call `useAnalyticOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticOverviewQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useAnalyticOverviewQuery(baseOptions: Apollo.QueryHookOptions<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(AnalyticOverviewDocument, options);
      }
export function useAnalyticOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(AnalyticOverviewDocument, options);
        }
export function useAnalyticOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>(AnalyticOverviewDocument, options);
        }
export type AnalyticOverviewQueryHookResult = ReturnType<typeof useAnalyticOverviewQuery>;
export type AnalyticOverviewLazyQueryHookResult = ReturnType<typeof useAnalyticOverviewLazyQuery>;
export type AnalyticOverviewSuspenseQueryHookResult = ReturnType<typeof useAnalyticOverviewSuspenseQuery>;
export type AnalyticOverviewQueryResult = Apollo.QueryResult<AnalyticOverviewQuery, AnalyticOverviewQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AnalyticOverviewFragmentDoc } from '../../fragments/__generated__/AnalyticOverview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AnalyticOverviewPerPageByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
  limit: Types.Scalars['Int']['input'];
  offset: Types.Scalars['Int']['input'];
  hideDeletedCheckouts?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type AnalyticOverviewPerPageByOwnerIdQuery = { __typename?: 'query_root', analytics_overview_2: Array<{ __typename?: 'analytics_overview_2', checkout_id?: any | null, checkout_created_at?: any | null, checkout_deleted_at?: any | null, collection_description?: string | null, collection_title?: string | null, image_url?: string | null, network_fees_cents?: any | null, number_sold?: any | null, owner_id?: string | null, paper_fees_cents?: any | null, payment_method?: string | null, revenue_cents?: any | null, wallet_type?: string | null, fiat_currency?: string | null, num_transactions_made?: any | null }> };


export const AnalyticOverviewPerPageByOwnerIdDocument = gql`
    query AnalyticOverviewPerPageByOwnerId($ownerId: String!, $limit: Int!, $offset: Int!, $hideDeletedCheckouts: Boolean) {
  analytics_overview_2(
    where: {owner_id: {_eq: $ownerId}, _and: [{checkout_deleted_at: {_is_null: $hideDeletedCheckouts}}]}
    order_by: {checkout_created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    ...AnalyticOverview
  }
}
    ${AnalyticOverviewFragmentDoc}`;

/**
 * __useAnalyticOverviewPerPageByOwnerIdQuery__
 *
 * To run a query within a React component, call `useAnalyticOverviewPerPageByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticOverviewPerPageByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticOverviewPerPageByOwnerIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      hideDeletedCheckouts: // value for 'hideDeletedCheckouts'
 *   },
 * });
 */
export function useAnalyticOverviewPerPageByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>(AnalyticOverviewPerPageByOwnerIdDocument, options);
      }
export function useAnalyticOverviewPerPageByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>(AnalyticOverviewPerPageByOwnerIdDocument, options);
        }
export function useAnalyticOverviewPerPageByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>(AnalyticOverviewPerPageByOwnerIdDocument, options);
        }
export type AnalyticOverviewPerPageByOwnerIdQueryHookResult = ReturnType<typeof useAnalyticOverviewPerPageByOwnerIdQuery>;
export type AnalyticOverviewPerPageByOwnerIdLazyQueryHookResult = ReturnType<typeof useAnalyticOverviewPerPageByOwnerIdLazyQuery>;
export type AnalyticOverviewPerPageByOwnerIdSuspenseQueryHookResult = ReturnType<typeof useAnalyticOverviewPerPageByOwnerIdSuspenseQuery>;
export type AnalyticOverviewPerPageByOwnerIdQueryResult = Apollo.QueryResult<AnalyticOverviewPerPageByOwnerIdQuery, AnalyticOverviewPerPageByOwnerIdQueryVariables>;
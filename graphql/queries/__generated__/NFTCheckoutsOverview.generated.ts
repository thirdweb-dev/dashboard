import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { NftCheckoutsOverviewFragmentDoc } from '../../fragments/__generated__/NftCheckoutsOverview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NftCheckoutsOverviewQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
}>;


export type NftCheckoutsOverviewQuery = { __typename?: 'query_root', nft_checkouts_overview: Array<{ __typename?: 'nft_checkouts_overview', quantity?: number | null, locked_price_usd_cents?: number | null }> };


export const NftCheckoutsOverviewDocument = gql`
    query NFTCheckoutsOverview($ownerId: String!) {
  nft_checkouts_overview(where: {owner_id: {_eq: $ownerId}}) {
    ...NFTCheckoutsOverview
  }
}
    ${NftCheckoutsOverviewFragmentDoc}`;

/**
 * __useNftCheckoutsOverviewQuery__
 *
 * To run a query within a React component, call `useNftCheckoutsOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftCheckoutsOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftCheckoutsOverviewQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useNftCheckoutsOverviewQuery(baseOptions: Apollo.QueryHookOptions<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>(NftCheckoutsOverviewDocument, options);
      }
export function useNftCheckoutsOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>(NftCheckoutsOverviewDocument, options);
        }
export function useNftCheckoutsOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>(NftCheckoutsOverviewDocument, options);
        }
export type NftCheckoutsOverviewQueryHookResult = ReturnType<typeof useNftCheckoutsOverviewQuery>;
export type NftCheckoutsOverviewLazyQueryHookResult = ReturnType<typeof useNftCheckoutsOverviewLazyQuery>;
export type NftCheckoutsOverviewSuspenseQueryHookResult = ReturnType<typeof useNftCheckoutsOverviewSuspenseQuery>;
export type NftCheckoutsOverviewQueryResult = Apollo.QueryResult<NftCheckoutsOverviewQuery, NftCheckoutsOverviewQueryVariables>;
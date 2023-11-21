import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthPlatformMappingFragmentDoc } from '../../fragments/__generated__/OauthPlatformMapping.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthPlatformMappingByOAuthIdQueryVariables = Types.Exact<{
  oauthId: Types.Scalars['uuid']['input'];
}>;


export type OAuthPlatformMappingByOAuthIdQuery = { __typename?: 'query_root', oauth_platform_mapping: Array<{ __typename?: 'oauth_platform_mapping', created_at: any, revoked_at: any, id: any, owner_id: string, platform_user_id: string, oauth_id: any, oauth: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } }> };


export const OAuthPlatformMappingByOAuthIdDocument = gql`
    query OAuthPlatformMappingByOAuthId($oauthId: uuid!) {
  oauth_platform_mapping(
    where: {oauth_id: {_eq: $oauthId}, revoked_at: {_gt: "now()"}}
  ) {
    ...OAuthPlatformMapping
  }
}
    ${OAuthPlatformMappingFragmentDoc}`;

/**
 * __useOAuthPlatformMappingByOAuthIdQuery__
 *
 * To run a query within a React component, call `useOAuthPlatformMappingByOAuthIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthPlatformMappingByOAuthIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthPlatformMappingByOAuthIdQuery({
 *   variables: {
 *      oauthId: // value for 'oauthId'
 *   },
 * });
 */
export function useOAuthPlatformMappingByOAuthIdQuery(baseOptions: Apollo.QueryHookOptions<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>(OAuthPlatformMappingByOAuthIdDocument, options);
      }
export function useOAuthPlatformMappingByOAuthIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>(OAuthPlatformMappingByOAuthIdDocument, options);
        }
export function useOAuthPlatformMappingByOAuthIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>(OAuthPlatformMappingByOAuthIdDocument, options);
        }
export type OAuthPlatformMappingByOAuthIdQueryHookResult = ReturnType<typeof useOAuthPlatformMappingByOAuthIdQuery>;
export type OAuthPlatformMappingByOAuthIdLazyQueryHookResult = ReturnType<typeof useOAuthPlatformMappingByOAuthIdLazyQuery>;
export type OAuthPlatformMappingByOAuthIdSuspenseQueryHookResult = ReturnType<typeof useOAuthPlatformMappingByOAuthIdSuspenseQuery>;
export type OAuthPlatformMappingByOAuthIdQueryResult = Apollo.QueryResult<OAuthPlatformMappingByOAuthIdQuery, OAuthPlatformMappingByOAuthIdQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthPlatformMappingFragmentDoc } from '../../fragments/__generated__/OauthPlatformMapping.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
  platformUserId: Types.Scalars['String']['input'];
}>;


export type OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery = { __typename?: 'query_root', oauth_platform_mapping: Array<{ __typename?: 'oauth_platform_mapping', created_at: any, revoked_at: any, id: any, owner_id: string, platform_user_id: string, oauth_id: any, oauth: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } }> };


export const OAuthPlatformMappingByOwnerIdAndPlatformUserIdDocument = gql`
    query OAuthPlatformMappingByOwnerIdAndPlatformUserId($ownerId: String!, $platformUserId: String!) {
  oauth_platform_mapping(
    where: {owner_id: {_eq: $ownerId}, platform_user_id: {_eq: $platformUserId}, revoked_at: {_gt: "now()"}}
  ) {
    ...OAuthPlatformMapping
  }
}
    ${OAuthPlatformMappingFragmentDoc}`;

/**
 * __useOAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery__
 *
 * To run a query within a React component, call `useOAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      platformUserId: // value for 'platformUserId'
 *   },
 * });
 */
export function useOAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery(baseOptions: Apollo.QueryHookOptions<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>(OAuthPlatformMappingByOwnerIdAndPlatformUserIdDocument, options);
      }
export function useOAuthPlatformMappingByOwnerIdAndPlatformUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>(OAuthPlatformMappingByOwnerIdAndPlatformUserIdDocument, options);
        }
export function useOAuthPlatformMappingByOwnerIdAndPlatformUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>(OAuthPlatformMappingByOwnerIdAndPlatformUserIdDocument, options);
        }
export type OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryHookResult = ReturnType<typeof useOAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery>;
export type OAuthPlatformMappingByOwnerIdAndPlatformUserIdLazyQueryHookResult = ReturnType<typeof useOAuthPlatformMappingByOwnerIdAndPlatformUserIdLazyQuery>;
export type OAuthPlatformMappingByOwnerIdAndPlatformUserIdSuspenseQueryHookResult = ReturnType<typeof useOAuthPlatformMappingByOwnerIdAndPlatformUserIdSuspenseQuery>;
export type OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryResult = Apollo.QueryResult<OAuthPlatformMappingByOwnerIdAndPlatformUserIdQuery, OAuthPlatformMappingByOwnerIdAndPlatformUserIdQueryVariables>;
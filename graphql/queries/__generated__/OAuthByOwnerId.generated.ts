import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthFragmentDoc } from '../../fragments/__generated__/OAuth.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
  type: Types.Scalars['String']['input'];
}>;


export type OAuthByOwnerIdQuery = { __typename?: 'query_root', oauth: Array<{ __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null }> };


export const OAuthByOwnerIdDocument = gql`
    query OAuthByOwnerId($ownerId: String!, $type: String!) {
  oauth(
    where: {owner_id: {_eq: $ownerId}, type: {_eq: $type}, revoked_at: {_gt: "now()"}}
  ) {
    ...OAuth
  }
}
    ${OAuthFragmentDoc}`;

/**
 * __useOAuthByOwnerIdQuery__
 *
 * To run a query within a React component, call `useOAuthByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthByOwnerIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useOAuthByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>(OAuthByOwnerIdDocument, options);
      }
export function useOAuthByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>(OAuthByOwnerIdDocument, options);
        }
export function useOAuthByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>(OAuthByOwnerIdDocument, options);
        }
export type OAuthByOwnerIdQueryHookResult = ReturnType<typeof useOAuthByOwnerIdQuery>;
export type OAuthByOwnerIdLazyQueryHookResult = ReturnType<typeof useOAuthByOwnerIdLazyQuery>;
export type OAuthByOwnerIdSuspenseQueryHookResult = ReturnType<typeof useOAuthByOwnerIdSuspenseQuery>;
export type OAuthByOwnerIdQueryResult = Apollo.QueryResult<OAuthByOwnerIdQuery, OAuthByOwnerIdQueryVariables>;
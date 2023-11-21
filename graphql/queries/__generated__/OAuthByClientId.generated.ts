import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthFragmentDoc } from '../../fragments/__generated__/OAuth.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthByClientIdQueryVariables = Types.Exact<{
  clientId: Types.Scalars['uuid']['input'];
}>;


export type OAuthByClientIdQuery = { __typename?: 'query_root', oauth: Array<{ __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null }> };


export const OAuthByClientIdDocument = gql`
    query OAuthByClientId($clientId: uuid!) {
  oauth(where: {client_id: {_eq: $clientId}, revoked_at: {_gt: "now()"}}) {
    ...OAuth
  }
}
    ${OAuthFragmentDoc}`;

/**
 * __useOAuthByClientIdQuery__
 *
 * To run a query within a React component, call `useOAuthByClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthByClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthByClientIdQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useOAuthByClientIdQuery(baseOptions: Apollo.QueryHookOptions<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>(OAuthByClientIdDocument, options);
      }
export function useOAuthByClientIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>(OAuthByClientIdDocument, options);
        }
export function useOAuthByClientIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>(OAuthByClientIdDocument, options);
        }
export type OAuthByClientIdQueryHookResult = ReturnType<typeof useOAuthByClientIdQuery>;
export type OAuthByClientIdLazyQueryHookResult = ReturnType<typeof useOAuthByClientIdLazyQuery>;
export type OAuthByClientIdSuspenseQueryHookResult = ReturnType<typeof useOAuthByClientIdSuspenseQuery>;
export type OAuthByClientIdQueryResult = Apollo.QueryResult<OAuthByClientIdQuery, OAuthByClientIdQueryVariables>;
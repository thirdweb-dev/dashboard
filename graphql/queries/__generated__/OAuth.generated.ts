import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthFragmentDoc } from '../../fragments/__generated__/OAuth.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type OAuthQuery = { __typename?: 'query_root', oauth_by_pk?: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } | null };


export const OAuthDocument = gql`
    query OAuth($id: uuid!) {
  oauth_by_pk(id: $id) {
    ...OAuth
  }
}
    ${OAuthFragmentDoc}`;

/**
 * __useOAuthQuery__
 *
 * To run a query within a React component, call `useOAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOAuthQuery(baseOptions: Apollo.QueryHookOptions<OAuthQuery, OAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthQuery, OAuthQueryVariables>(OAuthDocument, options);
      }
export function useOAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthQuery, OAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthQuery, OAuthQueryVariables>(OAuthDocument, options);
        }
export function useOAuthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthQuery, OAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthQuery, OAuthQueryVariables>(OAuthDocument, options);
        }
export type OAuthQueryHookResult = ReturnType<typeof useOAuthQuery>;
export type OAuthLazyQueryHookResult = ReturnType<typeof useOAuthLazyQuery>;
export type OAuthSuspenseQueryHookResult = ReturnType<typeof useOAuthSuspenseQuery>;
export type OAuthQueryResult = Apollo.QueryResult<OAuthQuery, OAuthQueryVariables>;
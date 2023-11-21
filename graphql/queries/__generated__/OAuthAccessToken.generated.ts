import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthAccessTokenQueryVariables = Types.Exact<{
  clientId: Types.Scalars['uuid']['input'];
  email: Types.Scalars['String']['input'];
}>;


export type OAuthAccessTokenQuery = { __typename?: 'query_root', oauth_access_token: Array<{ __typename?: 'oauth_access_token', access_token: string }> };


export const OAuthAccessTokenDocument = gql`
    query OAuthAccessToken($clientId: uuid!, $email: String!) {
  oauth_access_token(
    where: {client_id: {_eq: $clientId}, email: {_eq: $email}, revoked_at: {_gt: "now()"}}
  ) {
    access_token
  }
}
    `;

/**
 * __useOAuthAccessTokenQuery__
 *
 * To run a query within a React component, call `useOAuthAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthAccessTokenQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useOAuthAccessTokenQuery(baseOptions: Apollo.QueryHookOptions<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>(OAuthAccessTokenDocument, options);
      }
export function useOAuthAccessTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>(OAuthAccessTokenDocument, options);
        }
export function useOAuthAccessTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>(OAuthAccessTokenDocument, options);
        }
export type OAuthAccessTokenQueryHookResult = ReturnType<typeof useOAuthAccessTokenQuery>;
export type OAuthAccessTokenLazyQueryHookResult = ReturnType<typeof useOAuthAccessTokenLazyQuery>;
export type OAuthAccessTokenSuspenseQueryHookResult = ReturnType<typeof useOAuthAccessTokenSuspenseQuery>;
export type OAuthAccessTokenQueryResult = Apollo.QueryResult<OAuthAccessTokenQuery, OAuthAccessTokenQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OAuthAccessTokenCountByClientIdAndEmailQueryVariables = Types.Exact<{
  clientId: Types.Scalars['uuid']['input'];
  email: Types.Scalars['String']['input'];
}>;


export type OAuthAccessTokenCountByClientIdAndEmailQuery = { __typename?: 'query_root', oauth_access_token_aggregate: { __typename?: 'oauth_access_token_aggregate', aggregate?: { __typename?: 'oauth_access_token_aggregate_fields', count: number } | null } };


export const OAuthAccessTokenCountByClientIdAndEmailDocument = gql`
    query OAuthAccessTokenCountByClientIdAndEmail($clientId: uuid!, $email: String!) {
  oauth_access_token_aggregate(
    where: {client_id: {_eq: $clientId}, email: {_eq: $email}, revoked_at: {_gt: "now()"}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useOAuthAccessTokenCountByClientIdAndEmailQuery__
 *
 * To run a query within a React component, call `useOAuthAccessTokenCountByClientIdAndEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useOAuthAccessTokenCountByClientIdAndEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOAuthAccessTokenCountByClientIdAndEmailQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useOAuthAccessTokenCountByClientIdAndEmailQuery(baseOptions: Apollo.QueryHookOptions<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>(OAuthAccessTokenCountByClientIdAndEmailDocument, options);
      }
export function useOAuthAccessTokenCountByClientIdAndEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>(OAuthAccessTokenCountByClientIdAndEmailDocument, options);
        }
export function useOAuthAccessTokenCountByClientIdAndEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>(OAuthAccessTokenCountByClientIdAndEmailDocument, options);
        }
export type OAuthAccessTokenCountByClientIdAndEmailQueryHookResult = ReturnType<typeof useOAuthAccessTokenCountByClientIdAndEmailQuery>;
export type OAuthAccessTokenCountByClientIdAndEmailLazyQueryHookResult = ReturnType<typeof useOAuthAccessTokenCountByClientIdAndEmailLazyQuery>;
export type OAuthAccessTokenCountByClientIdAndEmailSuspenseQueryHookResult = ReturnType<typeof useOAuthAccessTokenCountByClientIdAndEmailSuspenseQuery>;
export type OAuthAccessTokenCountByClientIdAndEmailQueryResult = Apollo.QueryResult<OAuthAccessTokenCountByClientIdAndEmailQuery, OAuthAccessTokenCountByClientIdAndEmailQueryVariables>;
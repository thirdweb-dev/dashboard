import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { EwsAuthedUserFragmentDoc } from '../../fragments/__generated__/EwsAuthedUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EwsAuthedUserByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type EwsAuthedUserByEmailQuery = { __typename?: 'query_root', ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> };


export const EwsAuthedUserByEmailDocument = gql`
    query EwsAuthedUserByEmail($email: String!) {
  ews_authed_user(where: {email: {_eq: $email}}) {
    ...EwsAuthedUser
  }
}
    ${EwsAuthedUserFragmentDoc}`;

/**
 * __useEwsAuthedUserByEmailQuery__
 *
 * To run a query within a React component, call `useEwsAuthedUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useEwsAuthedUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEwsAuthedUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEwsAuthedUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>(EwsAuthedUserByEmailDocument, options);
      }
export function useEwsAuthedUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>(EwsAuthedUserByEmailDocument, options);
        }
export function useEwsAuthedUserByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>(EwsAuthedUserByEmailDocument, options);
        }
export type EwsAuthedUserByEmailQueryHookResult = ReturnType<typeof useEwsAuthedUserByEmailQuery>;
export type EwsAuthedUserByEmailLazyQueryHookResult = ReturnType<typeof useEwsAuthedUserByEmailLazyQuery>;
export type EwsAuthedUserByEmailSuspenseQueryHookResult = ReturnType<typeof useEwsAuthedUserByEmailSuspenseQuery>;
export type EwsAuthedUserByEmailQueryResult = Apollo.QueryResult<EwsAuthedUserByEmailQuery, EwsAuthedUserByEmailQueryVariables>;
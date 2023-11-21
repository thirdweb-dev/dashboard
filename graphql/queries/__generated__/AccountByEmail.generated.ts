import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountFragmentDoc } from '../../fragments/__generated__/Account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccountByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type AccountByEmailQuery = { __typename?: 'query_root', account: Array<{ __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null }> };


export const AccountByEmailDocument = gql`
    query AccountByEmail($email: String!) {
  account(where: {email: {_eq: $email}}) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;

/**
 * __useAccountByEmailQuery__
 *
 * To run a query within a React component, call `useAccountByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAccountByEmailQuery(baseOptions: Apollo.QueryHookOptions<AccountByEmailQuery, AccountByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountByEmailQuery, AccountByEmailQueryVariables>(AccountByEmailDocument, options);
      }
export function useAccountByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountByEmailQuery, AccountByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountByEmailQuery, AccountByEmailQueryVariables>(AccountByEmailDocument, options);
        }
export function useAccountByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountByEmailQuery, AccountByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountByEmailQuery, AccountByEmailQueryVariables>(AccountByEmailDocument, options);
        }
export type AccountByEmailQueryHookResult = ReturnType<typeof useAccountByEmailQuery>;
export type AccountByEmailLazyQueryHookResult = ReturnType<typeof useAccountByEmailLazyQuery>;
export type AccountByEmailSuspenseQueryHookResult = ReturnType<typeof useAccountByEmailSuspenseQuery>;
export type AccountByEmailQueryResult = Apollo.QueryResult<AccountByEmailQuery, AccountByEmailQueryVariables>;
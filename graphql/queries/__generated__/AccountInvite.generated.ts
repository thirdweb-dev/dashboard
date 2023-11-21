import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountInviteFragmentDoc } from '../../fragments/__generated__/AccountInvite.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccountInviteQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type AccountInviteQuery = { __typename?: 'query_root', account_invite_by_pk?: { __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any } | null };


export const AccountInviteDocument = gql`
    query AccountInvite($id: uuid!) {
  account_invite_by_pk(id: $id) {
    ...AccountInvite
  }
}
    ${AccountInviteFragmentDoc}`;

/**
 * __useAccountInviteQuery__
 *
 * To run a query within a React component, call `useAccountInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountInviteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccountInviteQuery(baseOptions: Apollo.QueryHookOptions<AccountInviteQuery, AccountInviteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountInviteQuery, AccountInviteQueryVariables>(AccountInviteDocument, options);
      }
export function useAccountInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountInviteQuery, AccountInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountInviteQuery, AccountInviteQueryVariables>(AccountInviteDocument, options);
        }
export function useAccountInviteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountInviteQuery, AccountInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountInviteQuery, AccountInviteQueryVariables>(AccountInviteDocument, options);
        }
export type AccountInviteQueryHookResult = ReturnType<typeof useAccountInviteQuery>;
export type AccountInviteLazyQueryHookResult = ReturnType<typeof useAccountInviteLazyQuery>;
export type AccountInviteSuspenseQueryHookResult = ReturnType<typeof useAccountInviteSuspenseQuery>;
export type AccountInviteQueryResult = Apollo.QueryResult<AccountInviteQuery, AccountInviteQueryVariables>;
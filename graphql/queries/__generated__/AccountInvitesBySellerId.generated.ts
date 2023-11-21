import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountInviteFragmentDoc } from '../../fragments/__generated__/AccountInvite.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccountInvitesBySellerIdQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type AccountInvitesBySellerIdQuery = { __typename?: 'query_root', account_invite: Array<{ __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any }> };


export const AccountInvitesBySellerIdDocument = gql`
    query AccountInvitesBySellerId($sellerId: String!) {
  account_invite(where: {seller_id: {_eq: $sellerId}}) {
    ...AccountInvite
  }
}
    ${AccountInviteFragmentDoc}`;

/**
 * __useAccountInvitesBySellerIdQuery__
 *
 * To run a query within a React component, call `useAccountInvitesBySellerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountInvitesBySellerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountInvitesBySellerIdQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useAccountInvitesBySellerIdQuery(baseOptions: Apollo.QueryHookOptions<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>(AccountInvitesBySellerIdDocument, options);
      }
export function useAccountInvitesBySellerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>(AccountInvitesBySellerIdDocument, options);
        }
export function useAccountInvitesBySellerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>(AccountInvitesBySellerIdDocument, options);
        }
export type AccountInvitesBySellerIdQueryHookResult = ReturnType<typeof useAccountInvitesBySellerIdQuery>;
export type AccountInvitesBySellerIdLazyQueryHookResult = ReturnType<typeof useAccountInvitesBySellerIdLazyQuery>;
export type AccountInvitesBySellerIdSuspenseQueryHookResult = ReturnType<typeof useAccountInvitesBySellerIdSuspenseQuery>;
export type AccountInvitesBySellerIdQueryResult = Apollo.QueryResult<AccountInvitesBySellerIdQuery, AccountInvitesBySellerIdQueryVariables>;
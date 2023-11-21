import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountInviteFragmentDoc } from '../../fragments/__generated__/AccountInvite.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllAccountInvitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllAccountInvitesQuery = { __typename?: 'query_root', account_invite: Array<{ __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any }> };


export const GetAllAccountInvitesDocument = gql`
    query GetAllAccountInvites {
  account_invite {
    ...AccountInvite
  }
}
    ${AccountInviteFragmentDoc}`;

/**
 * __useGetAllAccountInvitesQuery__
 *
 * To run a query within a React component, call `useGetAllAccountInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAccountInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAccountInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAccountInvitesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>(GetAllAccountInvitesDocument, options);
      }
export function useGetAllAccountInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>(GetAllAccountInvitesDocument, options);
        }
export function useGetAllAccountInvitesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>(GetAllAccountInvitesDocument, options);
        }
export type GetAllAccountInvitesQueryHookResult = ReturnType<typeof useGetAllAccountInvitesQuery>;
export type GetAllAccountInvitesLazyQueryHookResult = ReturnType<typeof useGetAllAccountInvitesLazyQuery>;
export type GetAllAccountInvitesSuspenseQueryHookResult = ReturnType<typeof useGetAllAccountInvitesSuspenseQuery>;
export type GetAllAccountInvitesQueryResult = Apollo.QueryResult<GetAllAccountInvitesQuery, GetAllAccountInvitesQueryVariables>;
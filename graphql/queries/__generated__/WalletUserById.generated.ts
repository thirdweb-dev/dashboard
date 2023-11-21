import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WalletUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type WalletUserByIdQuery = { __typename?: 'query_root', wallet_user_by_pk?: { __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> } | null };


export const WalletUserByIdDocument = gql`
    query WalletUserById($id: uuid!) {
  wallet_user_by_pk(id: $id) {
    ...WalletUser
  }
}
    ${WalletUserFragmentDoc}`;

/**
 * __useWalletUserByIdQuery__
 *
 * To run a query within a React component, call `useWalletUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWalletUserByIdQuery(baseOptions: Apollo.QueryHookOptions<WalletUserByIdQuery, WalletUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletUserByIdQuery, WalletUserByIdQueryVariables>(WalletUserByIdDocument, options);
      }
export function useWalletUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletUserByIdQuery, WalletUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletUserByIdQuery, WalletUserByIdQueryVariables>(WalletUserByIdDocument, options);
        }
export function useWalletUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WalletUserByIdQuery, WalletUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WalletUserByIdQuery, WalletUserByIdQueryVariables>(WalletUserByIdDocument, options);
        }
export type WalletUserByIdQueryHookResult = ReturnType<typeof useWalletUserByIdQuery>;
export type WalletUserByIdLazyQueryHookResult = ReturnType<typeof useWalletUserByIdLazyQuery>;
export type WalletUserByIdSuspenseQueryHookResult = ReturnType<typeof useWalletUserByIdSuspenseQuery>;
export type WalletUserByIdQueryResult = Apollo.QueryResult<WalletUserByIdQuery, WalletUserByIdQueryVariables>;
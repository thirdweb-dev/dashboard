import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WalletUserByClientIdQueryVariables = Types.Exact<{
  clientId: Types.Scalars['uuid']['input'];
  lastAccessedAt: Types.Scalars['timestamptz']['input'];
}>;


export type WalletUserByClientIdQuery = { __typename?: 'query_root', wallet_user: Array<{ __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> }> };


export const WalletUserByClientIdDocument = gql`
    query WalletUserByClientId($clientId: uuid!, $lastAccessedAt: timestamptz!) {
  wallet_user(
    where: {client_id: {_eq: $clientId}, last_accessed_at: {_gte: $lastAccessedAt}}
    order_by: {last_accessed_at: desc}
  ) {
    ...WalletUser
  }
}
    ${WalletUserFragmentDoc}`;

/**
 * __useWalletUserByClientIdQuery__
 *
 * To run a query within a React component, call `useWalletUserByClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletUserByClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletUserByClientIdQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      lastAccessedAt: // value for 'lastAccessedAt'
 *   },
 * });
 */
export function useWalletUserByClientIdQuery(baseOptions: Apollo.QueryHookOptions<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>(WalletUserByClientIdDocument, options);
      }
export function useWalletUserByClientIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>(WalletUserByClientIdDocument, options);
        }
export function useWalletUserByClientIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>(WalletUserByClientIdDocument, options);
        }
export type WalletUserByClientIdQueryHookResult = ReturnType<typeof useWalletUserByClientIdQuery>;
export type WalletUserByClientIdLazyQueryHookResult = ReturnType<typeof useWalletUserByClientIdLazyQuery>;
export type WalletUserByClientIdSuspenseQueryHookResult = ReturnType<typeof useWalletUserByClientIdSuspenseQuery>;
export type WalletUserByClientIdQueryResult = Apollo.QueryResult<WalletUserByClientIdQuery, WalletUserByClientIdQueryVariables>;
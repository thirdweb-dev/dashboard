import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WallerUserByAuthUserIdAndClientIdQueryVariables = Types.Exact<{
  authUserId: Types.Scalars['String']['input'];
  clientId: Types.Scalars['uuid']['input'];
}>;


export type WallerUserByAuthUserIdAndClientIdQuery = { __typename?: 'query_root', wallet_user: Array<{ __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> }> };


export const WallerUserByAuthUserIdAndClientIdDocument = gql`
    query WallerUserByAuthUserIdAndClientId($authUserId: String!, $clientId: uuid!) {
  wallet_user(
    where: {authed_user_id: {_eq: $authUserId}, client_id: {_eq: $clientId}}
  ) {
    ...WalletUser
  }
}
    ${WalletUserFragmentDoc}`;

/**
 * __useWallerUserByAuthUserIdAndClientIdQuery__
 *
 * To run a query within a React component, call `useWallerUserByAuthUserIdAndClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWallerUserByAuthUserIdAndClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWallerUserByAuthUserIdAndClientIdQuery({
 *   variables: {
 *      authUserId: // value for 'authUserId'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useWallerUserByAuthUserIdAndClientIdQuery(baseOptions: Apollo.QueryHookOptions<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>(WallerUserByAuthUserIdAndClientIdDocument, options);
      }
export function useWallerUserByAuthUserIdAndClientIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>(WallerUserByAuthUserIdAndClientIdDocument, options);
        }
export function useWallerUserByAuthUserIdAndClientIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>(WallerUserByAuthUserIdAndClientIdDocument, options);
        }
export type WallerUserByAuthUserIdAndClientIdQueryHookResult = ReturnType<typeof useWallerUserByAuthUserIdAndClientIdQuery>;
export type WallerUserByAuthUserIdAndClientIdLazyQueryHookResult = ReturnType<typeof useWallerUserByAuthUserIdAndClientIdLazyQuery>;
export type WallerUserByAuthUserIdAndClientIdSuspenseQueryHookResult = ReturnType<typeof useWallerUserByAuthUserIdAndClientIdSuspenseQuery>;
export type WallerUserByAuthUserIdAndClientIdQueryResult = Apollo.QueryResult<WallerUserByAuthUserIdAndClientIdQuery, WallerUserByAuthUserIdAndClientIdQueryVariables>;
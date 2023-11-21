import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WalletUserByAddressQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type WalletUserByAddressQuery = { __typename?: 'query_root', wallet_user: Array<{ __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> }> };


export const WalletUserByAddressDocument = gql`
    query WalletUserByAddress($address: String!) {
  wallet_user(where: {embedded_wallet: {address: {_ilike: $address}}}) {
    ...WalletUser
  }
}
    ${WalletUserFragmentDoc}`;

/**
 * __useWalletUserByAddressQuery__
 *
 * To run a query within a React component, call `useWalletUserByAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletUserByAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletUserByAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useWalletUserByAddressQuery(baseOptions: Apollo.QueryHookOptions<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>(WalletUserByAddressDocument, options);
      }
export function useWalletUserByAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>(WalletUserByAddressDocument, options);
        }
export function useWalletUserByAddressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>(WalletUserByAddressDocument, options);
        }
export type WalletUserByAddressQueryHookResult = ReturnType<typeof useWalletUserByAddressQuery>;
export type WalletUserByAddressLazyQueryHookResult = ReturnType<typeof useWalletUserByAddressLazyQuery>;
export type WalletUserByAddressSuspenseQueryHookResult = ReturnType<typeof useWalletUserByAddressSuspenseQuery>;
export type WalletUserByAddressQueryResult = Apollo.QueryResult<WalletUserByAddressQuery, WalletUserByAddressQueryVariables>;
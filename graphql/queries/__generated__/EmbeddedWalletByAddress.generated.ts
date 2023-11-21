import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { EmbeddedWalletFragmentDoc } from '../../fragments/__generated__/EmbeddedWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EmbeddedWalletByAddressQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type EmbeddedWalletByAddressQuery = { __typename?: 'query_root', embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }> };


export const EmbeddedWalletByAddressDocument = gql`
    query EmbeddedWalletByAddress($address: String!) {
  embedded_wallet(where: {address: {_eq: $address}}) {
    ...EmbeddedWallet
  }
}
    ${EmbeddedWalletFragmentDoc}`;

/**
 * __useEmbeddedWalletByAddressQuery__
 *
 * To run a query within a React component, call `useEmbeddedWalletByAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmbeddedWalletByAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmbeddedWalletByAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useEmbeddedWalletByAddressQuery(baseOptions: Apollo.QueryHookOptions<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>(EmbeddedWalletByAddressDocument, options);
      }
export function useEmbeddedWalletByAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>(EmbeddedWalletByAddressDocument, options);
        }
export function useEmbeddedWalletByAddressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>(EmbeddedWalletByAddressDocument, options);
        }
export type EmbeddedWalletByAddressQueryHookResult = ReturnType<typeof useEmbeddedWalletByAddressQuery>;
export type EmbeddedWalletByAddressLazyQueryHookResult = ReturnType<typeof useEmbeddedWalletByAddressLazyQuery>;
export type EmbeddedWalletByAddressSuspenseQueryHookResult = ReturnType<typeof useEmbeddedWalletByAddressSuspenseQuery>;
export type EmbeddedWalletByAddressQueryResult = Apollo.QueryResult<EmbeddedWalletByAddressQuery, EmbeddedWalletByAddressQueryVariables>;
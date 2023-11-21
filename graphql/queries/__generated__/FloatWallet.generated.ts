import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FloatWalletFragmentDoc } from '../../fragments/__generated__/FloatWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FloatWalletQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
}>;


export type FloatWalletQuery = { __typename?: 'query_root', float_wallet_by_pk?: { __typename?: 'float_wallet', address: string, nickname: string, env_var_key?: string | null, description?: string | null } | null };


export const FloatWalletDocument = gql`
    query FloatWallet($address: String!) {
  float_wallet_by_pk(address: $address) {
    ...FloatWallet
  }
}
    ${FloatWalletFragmentDoc}`;

/**
 * __useFloatWalletQuery__
 *
 * To run a query within a React component, call `useFloatWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useFloatWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFloatWalletQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useFloatWalletQuery(baseOptions: Apollo.QueryHookOptions<FloatWalletQuery, FloatWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FloatWalletQuery, FloatWalletQueryVariables>(FloatWalletDocument, options);
      }
export function useFloatWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FloatWalletQuery, FloatWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FloatWalletQuery, FloatWalletQueryVariables>(FloatWalletDocument, options);
        }
export function useFloatWalletSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FloatWalletQuery, FloatWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FloatWalletQuery, FloatWalletQueryVariables>(FloatWalletDocument, options);
        }
export type FloatWalletQueryHookResult = ReturnType<typeof useFloatWalletQuery>;
export type FloatWalletLazyQueryHookResult = ReturnType<typeof useFloatWalletLazyQuery>;
export type FloatWalletSuspenseQueryHookResult = ReturnType<typeof useFloatWalletSuspenseQuery>;
export type FloatWalletQueryResult = Apollo.QueryResult<FloatWalletQuery, FloatWalletQueryVariables>;
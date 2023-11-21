import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FloatWalletFragmentDoc } from '../../fragments/__generated__/FloatWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FloatWalletByEnvVarQueryVariables = Types.Exact<{
  envVarKey: Types.Scalars['String']['input'];
}>;


export type FloatWalletByEnvVarQuery = { __typename?: 'query_root', float_wallet: Array<{ __typename?: 'float_wallet', address: string, nickname: string, env_var_key?: string | null, description?: string | null }> };


export const FloatWalletByEnvVarDocument = gql`
    query FloatWalletByEnvVar($envVarKey: String!) {
  float_wallet(where: {env_var_key: {_eq: $envVarKey}}) {
    ...FloatWallet
  }
}
    ${FloatWalletFragmentDoc}`;

/**
 * __useFloatWalletByEnvVarQuery__
 *
 * To run a query within a React component, call `useFloatWalletByEnvVarQuery` and pass it any options that fit your needs.
 * When your component renders, `useFloatWalletByEnvVarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFloatWalletByEnvVarQuery({
 *   variables: {
 *      envVarKey: // value for 'envVarKey'
 *   },
 * });
 */
export function useFloatWalletByEnvVarQuery(baseOptions: Apollo.QueryHookOptions<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>(FloatWalletByEnvVarDocument, options);
      }
export function useFloatWalletByEnvVarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>(FloatWalletByEnvVarDocument, options);
        }
export function useFloatWalletByEnvVarSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>(FloatWalletByEnvVarDocument, options);
        }
export type FloatWalletByEnvVarQueryHookResult = ReturnType<typeof useFloatWalletByEnvVarQuery>;
export type FloatWalletByEnvVarLazyQueryHookResult = ReturnType<typeof useFloatWalletByEnvVarLazyQuery>;
export type FloatWalletByEnvVarSuspenseQueryHookResult = ReturnType<typeof useFloatWalletByEnvVarSuspenseQuery>;
export type FloatWalletByEnvVarQueryResult = Apollo.QueryResult<FloatWalletByEnvVarQuery, FloatWalletByEnvVarQueryVariables>;
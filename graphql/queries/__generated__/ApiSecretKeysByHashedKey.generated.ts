import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApiSecretKeyByHashedKeyQueryVariables = Types.Exact<{
  hashed_key: Types.Scalars['String']['input'];
}>;


export type ApiSecretKeyByHashedKeyQuery = { __typename?: 'query_root', api_secret_key: Array<{ __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string }> };


export const ApiSecretKeyByHashedKeyDocument = gql`
    query ApiSecretKeyByHashedKey($hashed_key: String!) {
  api_secret_key(
    where: {hashed_key: {_eq: $hashed_key}, revoked_at: {_is_null: true}}
  ) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;

/**
 * __useApiSecretKeyByHashedKeyQuery__
 *
 * To run a query within a React component, call `useApiSecretKeyByHashedKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiSecretKeyByHashedKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiSecretKeyByHashedKeyQuery({
 *   variables: {
 *      hashed_key: // value for 'hashed_key'
 *   },
 * });
 */
export function useApiSecretKeyByHashedKeyQuery(baseOptions: Apollo.QueryHookOptions<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>(ApiSecretKeyByHashedKeyDocument, options);
      }
export function useApiSecretKeyByHashedKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>(ApiSecretKeyByHashedKeyDocument, options);
        }
export function useApiSecretKeyByHashedKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>(ApiSecretKeyByHashedKeyDocument, options);
        }
export type ApiSecretKeyByHashedKeyQueryHookResult = ReturnType<typeof useApiSecretKeyByHashedKeyQuery>;
export type ApiSecretKeyByHashedKeyLazyQueryHookResult = ReturnType<typeof useApiSecretKeyByHashedKeyLazyQuery>;
export type ApiSecretKeyByHashedKeySuspenseQueryHookResult = ReturnType<typeof useApiSecretKeyByHashedKeySuspenseQuery>;
export type ApiSecretKeyByHashedKeyQueryResult = Apollo.QueryResult<ApiSecretKeyByHashedKeyQuery, ApiSecretKeyByHashedKeyQueryVariables>;
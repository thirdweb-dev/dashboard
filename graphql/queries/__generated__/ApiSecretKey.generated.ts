import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApiSecretKeyQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ApiSecretKeyQuery = { __typename?: 'query_root', api_secret_key: Array<{ __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string }> };


export const ApiSecretKeyDocument = gql`
    query ApiSecretKey($limit: Int = 10) {
  api_secret_key(where: {revoked_at: {_is_null: true}}, limit: $limit) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;

/**
 * __useApiSecretKeyQuery__
 *
 * To run a query within a React component, call `useApiSecretKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiSecretKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiSecretKeyQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useApiSecretKeyQuery(baseOptions?: Apollo.QueryHookOptions<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>(ApiSecretKeyDocument, options);
      }
export function useApiSecretKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>(ApiSecretKeyDocument, options);
        }
export function useApiSecretKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>(ApiSecretKeyDocument, options);
        }
export type ApiSecretKeyQueryHookResult = ReturnType<typeof useApiSecretKeyQuery>;
export type ApiSecretKeyLazyQueryHookResult = ReturnType<typeof useApiSecretKeyLazyQuery>;
export type ApiSecretKeySuspenseQueryHookResult = ReturnType<typeof useApiSecretKeySuspenseQuery>;
export type ApiSecretKeyQueryResult = Apollo.QueryResult<ApiSecretKeyQuery, ApiSecretKeyQueryVariables>;
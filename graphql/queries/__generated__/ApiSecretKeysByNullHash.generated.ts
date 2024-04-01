import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApiSecretKeyByHashedNullQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ApiSecretKeyByHashedNullQuery = { __typename?: 'query_root', api_secret_key: Array<{ __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string }> };


export const ApiSecretKeyByHashedNullDocument = gql`
    query ApiSecretKeyByHashedNull($limit: Int = 10) {
  api_secret_key(where: {hashed_key: {_is_null: true}}, limit: $limit) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;

/**
 * __useApiSecretKeyByHashedNullQuery__
 *
 * To run a query within a React component, call `useApiSecretKeyByHashedNullQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiSecretKeyByHashedNullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiSecretKeyByHashedNullQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useApiSecretKeyByHashedNullQuery(baseOptions?: Apollo.QueryHookOptions<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>(ApiSecretKeyByHashedNullDocument, options);
      }
export function useApiSecretKeyByHashedNullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>(ApiSecretKeyByHashedNullDocument, options);
        }
export function useApiSecretKeyByHashedNullSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>(ApiSecretKeyByHashedNullDocument, options);
        }
export type ApiSecretKeyByHashedNullQueryHookResult = ReturnType<typeof useApiSecretKeyByHashedNullQuery>;
export type ApiSecretKeyByHashedNullLazyQueryHookResult = ReturnType<typeof useApiSecretKeyByHashedNullLazyQuery>;
export type ApiSecretKeyByHashedNullSuspenseQueryHookResult = ReturnType<typeof useApiSecretKeyByHashedNullSuspenseQuery>;
export type ApiSecretKeyByHashedNullQueryResult = Apollo.QueryResult<ApiSecretKeyByHashedNullQuery, ApiSecretKeyByHashedNullQueryVariables>;
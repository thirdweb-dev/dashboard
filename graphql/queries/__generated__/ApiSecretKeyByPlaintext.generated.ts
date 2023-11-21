import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApiSecretKeysByPlaintextQueryVariables = Types.Exact<{
  plaintext: Types.Scalars['String']['input'];
}>;


export type ApiSecretKeysByPlaintextQuery = { __typename?: 'query_root', api_secret_key: Array<{ __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string }> };


export const ApiSecretKeysByPlaintextDocument = gql`
    query ApiSecretKeysByPlaintext($plaintext: String!) {
  api_secret_key(
    where: {plaintext: {_eq: $plaintext}, revoked_at: {_is_null: true}}
  ) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;

/**
 * __useApiSecretKeysByPlaintextQuery__
 *
 * To run a query within a React component, call `useApiSecretKeysByPlaintextQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiSecretKeysByPlaintextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiSecretKeysByPlaintextQuery({
 *   variables: {
 *      plaintext: // value for 'plaintext'
 *   },
 * });
 */
export function useApiSecretKeysByPlaintextQuery(baseOptions: Apollo.QueryHookOptions<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>(ApiSecretKeysByPlaintextDocument, options);
      }
export function useApiSecretKeysByPlaintextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>(ApiSecretKeysByPlaintextDocument, options);
        }
export function useApiSecretKeysByPlaintextSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>(ApiSecretKeysByPlaintextDocument, options);
        }
export type ApiSecretKeysByPlaintextQueryHookResult = ReturnType<typeof useApiSecretKeysByPlaintextQuery>;
export type ApiSecretKeysByPlaintextLazyQueryHookResult = ReturnType<typeof useApiSecretKeysByPlaintextLazyQuery>;
export type ApiSecretKeysByPlaintextSuspenseQueryHookResult = ReturnType<typeof useApiSecretKeysByPlaintextSuspenseQuery>;
export type ApiSecretKeysByPlaintextQueryResult = Apollo.QueryResult<ApiSecretKeysByPlaintextQuery, ApiSecretKeysByPlaintextQueryVariables>;
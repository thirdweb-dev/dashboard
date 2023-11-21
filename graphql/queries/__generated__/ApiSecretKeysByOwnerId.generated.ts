import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApiSecretKeysByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
}>;


export type ApiSecretKeysByOwnerIdQuery = { __typename?: 'query_root', api_secret_key: Array<{ __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string }> };


export const ApiSecretKeysByOwnerIdDocument = gql`
    query ApiSecretKeysByOwnerId($ownerId: String!) {
  api_secret_key(where: {owner_id: {_eq: $ownerId}, revoked_at: {_is_null: true}}) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;

/**
 * __useApiSecretKeysByOwnerIdQuery__
 *
 * To run a query within a React component, call `useApiSecretKeysByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiSecretKeysByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiSecretKeysByOwnerIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useApiSecretKeysByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>(ApiSecretKeysByOwnerIdDocument, options);
      }
export function useApiSecretKeysByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>(ApiSecretKeysByOwnerIdDocument, options);
        }
export function useApiSecretKeysByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>(ApiSecretKeysByOwnerIdDocument, options);
        }
export type ApiSecretKeysByOwnerIdQueryHookResult = ReturnType<typeof useApiSecretKeysByOwnerIdQuery>;
export type ApiSecretKeysByOwnerIdLazyQueryHookResult = ReturnType<typeof useApiSecretKeysByOwnerIdLazyQuery>;
export type ApiSecretKeysByOwnerIdSuspenseQueryHookResult = ReturnType<typeof useApiSecretKeysByOwnerIdSuspenseQuery>;
export type ApiSecretKeysByOwnerIdQueryResult = Apollo.QueryResult<ApiSecretKeysByOwnerIdQuery, ApiSecretKeysByOwnerIdQueryVariables>;
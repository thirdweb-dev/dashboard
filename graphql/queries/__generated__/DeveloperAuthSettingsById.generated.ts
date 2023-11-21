import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { DeveloperAuthSettingFragmentDoc } from '../../fragments/__generated__/DeveloperAuthSetting.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeveloperAuthSettingByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type DeveloperAuthSettingByIdQuery = { __typename?: 'query_root', developer_auth_setting: Array<{ __typename?: 'developer_auth_setting', id: any, auth_provider: string, developer_client_id: any, created_at: any, deleted_at: any, settings: any }> };


export const DeveloperAuthSettingByIdDocument = gql`
    query DeveloperAuthSettingById($id: uuid!) {
  developer_auth_setting(where: {id: {_eq: $id}, deleted_at: {_gt: "now()"}}) {
    ...DeveloperAuthSetting
  }
}
    ${DeveloperAuthSettingFragmentDoc}`;

/**
 * __useDeveloperAuthSettingByIdQuery__
 *
 * To run a query within a React component, call `useDeveloperAuthSettingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeveloperAuthSettingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeveloperAuthSettingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeveloperAuthSettingByIdQuery(baseOptions: Apollo.QueryHookOptions<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>(DeveloperAuthSettingByIdDocument, options);
      }
export function useDeveloperAuthSettingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>(DeveloperAuthSettingByIdDocument, options);
        }
export function useDeveloperAuthSettingByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>(DeveloperAuthSettingByIdDocument, options);
        }
export type DeveloperAuthSettingByIdQueryHookResult = ReturnType<typeof useDeveloperAuthSettingByIdQuery>;
export type DeveloperAuthSettingByIdLazyQueryHookResult = ReturnType<typeof useDeveloperAuthSettingByIdLazyQuery>;
export type DeveloperAuthSettingByIdSuspenseQueryHookResult = ReturnType<typeof useDeveloperAuthSettingByIdSuspenseQuery>;
export type DeveloperAuthSettingByIdQueryResult = Apollo.QueryResult<DeveloperAuthSettingByIdQuery, DeveloperAuthSettingByIdQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { DeveloperAuthSettingFragmentDoc } from '../../fragments/__generated__/DeveloperAuthSetting.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDeveloperAuthSettingsQueryVariables = Types.Exact<{
  developerClientId: Types.Scalars['uuid']['input'];
}>;


export type ListDeveloperAuthSettingsQuery = { __typename?: 'query_root', developer_auth_setting: Array<{ __typename?: 'developer_auth_setting', id: any, auth_provider: string, developer_client_id: any, created_at: any, deleted_at: any, settings: any }> };


export const ListDeveloperAuthSettingsDocument = gql`
    query ListDeveloperAuthSettings($developerClientId: uuid!) {
  developer_auth_setting(where: {developer_client_id: {_eq: $developerClientId}}) {
    ...DeveloperAuthSetting
  }
}
    ${DeveloperAuthSettingFragmentDoc}`;

/**
 * __useListDeveloperAuthSettingsQuery__
 *
 * To run a query within a React component, call `useListDeveloperAuthSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDeveloperAuthSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeveloperAuthSettingsQuery({
 *   variables: {
 *      developerClientId: // value for 'developerClientId'
 *   },
 * });
 */
export function useListDeveloperAuthSettingsQuery(baseOptions: Apollo.QueryHookOptions<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>(ListDeveloperAuthSettingsDocument, options);
      }
export function useListDeveloperAuthSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>(ListDeveloperAuthSettingsDocument, options);
        }
export function useListDeveloperAuthSettingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>(ListDeveloperAuthSettingsDocument, options);
        }
export type ListDeveloperAuthSettingsQueryHookResult = ReturnType<typeof useListDeveloperAuthSettingsQuery>;
export type ListDeveloperAuthSettingsLazyQueryHookResult = ReturnType<typeof useListDeveloperAuthSettingsLazyQuery>;
export type ListDeveloperAuthSettingsSuspenseQueryHookResult = ReturnType<typeof useListDeveloperAuthSettingsSuspenseQuery>;
export type ListDeveloperAuthSettingsQueryResult = Apollo.QueryResult<ListDeveloperAuthSettingsQuery, ListDeveloperAuthSettingsQueryVariables>;
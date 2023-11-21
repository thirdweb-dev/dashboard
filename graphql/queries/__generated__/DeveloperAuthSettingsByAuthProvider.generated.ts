import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { DeveloperAuthSettingFragmentDoc } from '../../fragments/__generated__/DeveloperAuthSetting.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeveloperAuthSettingByAuthProviderQueryVariables = Types.Exact<{
  developerClientId: Types.Scalars['uuid']['input'];
  authProvider: Types.Scalars['String']['input'];
}>;


export type DeveloperAuthSettingByAuthProviderQuery = { __typename?: 'query_root', developer_auth_setting: Array<{ __typename?: 'developer_auth_setting', id: any, auth_provider: string, developer_client_id: any, created_at: any, deleted_at: any, settings: any }> };


export const DeveloperAuthSettingByAuthProviderDocument = gql`
    query DeveloperAuthSettingByAuthProvider($developerClientId: uuid!, $authProvider: String!) {
  developer_auth_setting(
    where: {developer_client_id: {_eq: $developerClientId}, auth_provider: {_eq: $authProvider}, deleted_at: {_gt: "now()"}}
  ) {
    ...DeveloperAuthSetting
  }
}
    ${DeveloperAuthSettingFragmentDoc}`;

/**
 * __useDeveloperAuthSettingByAuthProviderQuery__
 *
 * To run a query within a React component, call `useDeveloperAuthSettingByAuthProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeveloperAuthSettingByAuthProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeveloperAuthSettingByAuthProviderQuery({
 *   variables: {
 *      developerClientId: // value for 'developerClientId'
 *      authProvider: // value for 'authProvider'
 *   },
 * });
 */
export function useDeveloperAuthSettingByAuthProviderQuery(baseOptions: Apollo.QueryHookOptions<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>(DeveloperAuthSettingByAuthProviderDocument, options);
      }
export function useDeveloperAuthSettingByAuthProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>(DeveloperAuthSettingByAuthProviderDocument, options);
        }
export function useDeveloperAuthSettingByAuthProviderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>(DeveloperAuthSettingByAuthProviderDocument, options);
        }
export type DeveloperAuthSettingByAuthProviderQueryHookResult = ReturnType<typeof useDeveloperAuthSettingByAuthProviderQuery>;
export type DeveloperAuthSettingByAuthProviderLazyQueryHookResult = ReturnType<typeof useDeveloperAuthSettingByAuthProviderLazyQuery>;
export type DeveloperAuthSettingByAuthProviderSuspenseQueryHookResult = ReturnType<typeof useDeveloperAuthSettingByAuthProviderSuspenseQuery>;
export type DeveloperAuthSettingByAuthProviderQueryResult = Apollo.QueryResult<DeveloperAuthSettingByAuthProviderQuery, DeveloperAuthSettingByAuthProviderQueryVariables>;
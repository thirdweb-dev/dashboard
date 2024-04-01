import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { DeveloperAuthSettingFragmentDoc } from '../../fragments/__generated__/DeveloperAuthSetting.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertDeveloperAuthSettingMutationVariables = Types.Exact<{
  object: Types.Developer_Auth_Setting_Insert_Input;
}>;


export type InsertDeveloperAuthSettingMutation = { __typename?: 'mutation_root', insert_developer_auth_setting_one?: { __typename?: 'developer_auth_setting', id: any, auth_provider: string, developer_client_id: any, created_at: any, deleted_at: any, settings: any } | null };


export const InsertDeveloperAuthSettingDocument = gql`
    mutation InsertDeveloperAuthSetting($object: developer_auth_setting_insert_input!) {
  insert_developer_auth_setting_one(object: $object) {
    ...DeveloperAuthSetting
  }
}
    ${DeveloperAuthSettingFragmentDoc}`;
export type InsertDeveloperAuthSettingMutationFn = Apollo.MutationFunction<InsertDeveloperAuthSettingMutation, InsertDeveloperAuthSettingMutationVariables>;

/**
 * __useInsertDeveloperAuthSettingMutation__
 *
 * To run a mutation, you first call `useInsertDeveloperAuthSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertDeveloperAuthSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertDeveloperAuthSettingMutation, { data, loading, error }] = useInsertDeveloperAuthSettingMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertDeveloperAuthSettingMutation(baseOptions?: Apollo.MutationHookOptions<InsertDeveloperAuthSettingMutation, InsertDeveloperAuthSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertDeveloperAuthSettingMutation, InsertDeveloperAuthSettingMutationVariables>(InsertDeveloperAuthSettingDocument, options);
      }
export type InsertDeveloperAuthSettingMutationHookResult = ReturnType<typeof useInsertDeveloperAuthSettingMutation>;
export type InsertDeveloperAuthSettingMutationResult = Apollo.MutationResult<InsertDeveloperAuthSettingMutation>;
export type InsertDeveloperAuthSettingMutationOptions = Apollo.BaseMutationOptions<InsertDeveloperAuthSettingMutation, InsertDeveloperAuthSettingMutationVariables>;
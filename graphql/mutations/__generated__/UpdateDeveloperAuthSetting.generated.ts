import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { DeveloperAuthSettingFragmentDoc } from '../../fragments/__generated__/DeveloperAuthSetting.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateDeveloperAuthSettingMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  object: Types.Developer_Auth_Setting_Set_Input;
}>;


export type UpdateDeveloperAuthSettingMutation = { __typename?: 'mutation_root', update_developer_auth_setting_by_pk?: { __typename?: 'developer_auth_setting', id: any, auth_provider: string, developer_client_id: any, created_at: any, deleted_at: any, settings: any } | null };


export const UpdateDeveloperAuthSettingDocument = gql`
    mutation UpdateDeveloperAuthSetting($id: uuid!, $object: developer_auth_setting_set_input!) {
  update_developer_auth_setting_by_pk(pk_columns: {id: $id}, _set: $object) {
    ...DeveloperAuthSetting
  }
}
    ${DeveloperAuthSettingFragmentDoc}`;
export type UpdateDeveloperAuthSettingMutationFn = Apollo.MutationFunction<UpdateDeveloperAuthSettingMutation, UpdateDeveloperAuthSettingMutationVariables>;

/**
 * __useUpdateDeveloperAuthSettingMutation__
 *
 * To run a mutation, you first call `useUpdateDeveloperAuthSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeveloperAuthSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeveloperAuthSettingMutation, { data, loading, error }] = useUpdateDeveloperAuthSettingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      object: // value for 'object'
 *   },
 * });
 */
export function useUpdateDeveloperAuthSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeveloperAuthSettingMutation, UpdateDeveloperAuthSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeveloperAuthSettingMutation, UpdateDeveloperAuthSettingMutationVariables>(UpdateDeveloperAuthSettingDocument, options);
      }
export type UpdateDeveloperAuthSettingMutationHookResult = ReturnType<typeof useUpdateDeveloperAuthSettingMutation>;
export type UpdateDeveloperAuthSettingMutationResult = Apollo.MutationResult<UpdateDeveloperAuthSettingMutation>;
export type UpdateDeveloperAuthSettingMutationOptions = Apollo.BaseMutationOptions<UpdateDeveloperAuthSettingMutation, UpdateDeveloperAuthSettingMutationVariables>;
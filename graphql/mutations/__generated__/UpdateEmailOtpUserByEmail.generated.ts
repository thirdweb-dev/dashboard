import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { EwsAuthedUserFragmentDoc } from '../../fragments/__generated__/EwsAuthedUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateEwsAuthedUserByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  ewsAuthedUserValue: Types.Ews_Authed_User_Set_Input;
}>;


export type UpdateEwsAuthedUserByEmailMutation = { __typename?: 'mutation_root', update_ews_authed_user?: { __typename?: 'ews_authed_user_mutation_response', returning: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> } | null };


export const UpdateEwsAuthedUserByEmailDocument = gql`
    mutation UpdateEwsAuthedUserByEmail($email: String!, $ewsAuthedUserValue: ews_authed_user_set_input!) {
  update_ews_authed_user(where: {email: {_eq: $email}}, _set: $ewsAuthedUserValue) {
    returning {
      ...EwsAuthedUser
    }
  }
}
    ${EwsAuthedUserFragmentDoc}`;
export type UpdateEwsAuthedUserByEmailMutationFn = Apollo.MutationFunction<UpdateEwsAuthedUserByEmailMutation, UpdateEwsAuthedUserByEmailMutationVariables>;

/**
 * __useUpdateEwsAuthedUserByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateEwsAuthedUserByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEwsAuthedUserByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEwsAuthedUserByEmailMutation, { data, loading, error }] = useUpdateEwsAuthedUserByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      ewsAuthedUserValue: // value for 'ewsAuthedUserValue'
 *   },
 * });
 */
export function useUpdateEwsAuthedUserByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEwsAuthedUserByEmailMutation, UpdateEwsAuthedUserByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEwsAuthedUserByEmailMutation, UpdateEwsAuthedUserByEmailMutationVariables>(UpdateEwsAuthedUserByEmailDocument, options);
      }
export type UpdateEwsAuthedUserByEmailMutationHookResult = ReturnType<typeof useUpdateEwsAuthedUserByEmailMutation>;
export type UpdateEwsAuthedUserByEmailMutationResult = Apollo.MutationResult<UpdateEwsAuthedUserByEmailMutation>;
export type UpdateEwsAuthedUserByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateEwsAuthedUserByEmailMutation, UpdateEwsAuthedUserByEmailMutationVariables>;
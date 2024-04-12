import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountInviteFragmentDoc } from '../../fragments/__generated__/AccountInvite.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAccountInvitesByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  accountInviteValue: Types.Account_Invite_Set_Input;
}>;


export type UpdateAccountInvitesByEmailMutation = { __typename?: 'mutation_root', update_account_invite?: { __typename?: 'account_invite_mutation_response', returning: Array<{ __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any }> } | null };


export const UpdateAccountInvitesByEmailDocument = gql`
    mutation UpdateAccountInvitesByEmail($email: String!, $accountInviteValue: account_invite_set_input!) {
  update_account_invite(where: {email: {_eq: $email}}, _set: $accountInviteValue) {
    returning {
      ...AccountInvite
    }
  }
}
    ${AccountInviteFragmentDoc}`;
export type UpdateAccountInvitesByEmailMutationFn = Apollo.MutationFunction<UpdateAccountInvitesByEmailMutation, UpdateAccountInvitesByEmailMutationVariables>;

/**
 * __useUpdateAccountInvitesByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateAccountInvitesByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountInvitesByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountInvitesByEmailMutation, { data, loading, error }] = useUpdateAccountInvitesByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      accountInviteValue: // value for 'accountInviteValue'
 *   },
 * });
 */
export function useUpdateAccountInvitesByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountInvitesByEmailMutation, UpdateAccountInvitesByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountInvitesByEmailMutation, UpdateAccountInvitesByEmailMutationVariables>(UpdateAccountInvitesByEmailDocument, options);
      }
export type UpdateAccountInvitesByEmailMutationHookResult = ReturnType<typeof useUpdateAccountInvitesByEmailMutation>;
export type UpdateAccountInvitesByEmailMutationResult = Apollo.MutationResult<UpdateAccountInvitesByEmailMutation>;
export type UpdateAccountInvitesByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateAccountInvitesByEmailMutation, UpdateAccountInvitesByEmailMutationVariables>;
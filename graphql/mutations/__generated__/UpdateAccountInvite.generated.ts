import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountInviteFragmentDoc } from '../../fragments/__generated__/AccountInvite.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAccountInviteMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  accountInviteValue: Types.Account_Invite_Set_Input;
}>;


export type UpdateAccountInviteMutation = { __typename?: 'mutation_root', update_account_invite_by_pk?: { __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any } | null };


export const UpdateAccountInviteDocument = gql`
    mutation UpdateAccountInvite($id: uuid!, $accountInviteValue: account_invite_set_input!) {
  update_account_invite_by_pk(pk_columns: {id: $id}, _set: $accountInviteValue) {
    ...AccountInvite
  }
}
    ${AccountInviteFragmentDoc}`;
export type UpdateAccountInviteMutationFn = Apollo.MutationFunction<UpdateAccountInviteMutation, UpdateAccountInviteMutationVariables>;

/**
 * __useUpdateAccountInviteMutation__
 *
 * To run a mutation, you first call `useUpdateAccountInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountInviteMutation, { data, loading, error }] = useUpdateAccountInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      accountInviteValue: // value for 'accountInviteValue'
 *   },
 * });
 */
export function useUpdateAccountInviteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountInviteMutation, UpdateAccountInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountInviteMutation, UpdateAccountInviteMutationVariables>(UpdateAccountInviteDocument, options);
      }
export type UpdateAccountInviteMutationHookResult = ReturnType<typeof useUpdateAccountInviteMutation>;
export type UpdateAccountInviteMutationResult = Apollo.MutationResult<UpdateAccountInviteMutation>;
export type UpdateAccountInviteMutationOptions = Apollo.BaseMutationOptions<UpdateAccountInviteMutation, UpdateAccountInviteMutationVariables>;
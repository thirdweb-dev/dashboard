import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountInviteFragmentDoc } from '../../fragments/__generated__/AccountInvite.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertAccountInviteMutationVariables = Types.Exact<{
  accountInvite: Types.Account_Invite_Insert_Input;
}>;


export type InsertAccountInviteMutation = { __typename?: 'mutation_root', insert_account_invite_one?: { __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any } | null };


export const InsertAccountInviteDocument = gql`
    mutation InsertAccountInvite($accountInvite: account_invite_insert_input!) {
  insert_account_invite_one(object: $accountInvite) {
    ...AccountInvite
  }
}
    ${AccountInviteFragmentDoc}`;
export type InsertAccountInviteMutationFn = Apollo.MutationFunction<InsertAccountInviteMutation, InsertAccountInviteMutationVariables>;

/**
 * __useInsertAccountInviteMutation__
 *
 * To run a mutation, you first call `useInsertAccountInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertAccountInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertAccountInviteMutation, { data, loading, error }] = useInsertAccountInviteMutation({
 *   variables: {
 *      accountInvite: // value for 'accountInvite'
 *   },
 * });
 */
export function useInsertAccountInviteMutation(baseOptions?: Apollo.MutationHookOptions<InsertAccountInviteMutation, InsertAccountInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertAccountInviteMutation, InsertAccountInviteMutationVariables>(InsertAccountInviteDocument, options);
      }
export type InsertAccountInviteMutationHookResult = ReturnType<typeof useInsertAccountInviteMutation>;
export type InsertAccountInviteMutationResult = Apollo.MutationResult<InsertAccountInviteMutation>;
export type InsertAccountInviteMutationOptions = Apollo.BaseMutationOptions<InsertAccountInviteMutation, InsertAccountInviteMutationVariables>;
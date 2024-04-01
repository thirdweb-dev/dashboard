import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountFragmentDoc } from '../../fragments/__generated__/Account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAccountByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  accountValue: Types.Account_Set_Input;
}>;


export type UpdateAccountByEmailMutation = { __typename?: 'mutation_root', update_account?: { __typename?: 'account_mutation_response', returning: Array<{ __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null }> } | null };


export const UpdateAccountByEmailDocument = gql`
    mutation UpdateAccountByEmail($email: String!, $accountValue: account_set_input!) {
  update_account(where: {email: {_eq: $email}}, _set: $accountValue) {
    returning {
      ...Account
    }
  }
}
    ${AccountFragmentDoc}`;
export type UpdateAccountByEmailMutationFn = Apollo.MutationFunction<UpdateAccountByEmailMutation, UpdateAccountByEmailMutationVariables>;

/**
 * __useUpdateAccountByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateAccountByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountByEmailMutation, { data, loading, error }] = useUpdateAccountByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      accountValue: // value for 'accountValue'
 *   },
 * });
 */
export function useUpdateAccountByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountByEmailMutation, UpdateAccountByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountByEmailMutation, UpdateAccountByEmailMutationVariables>(UpdateAccountByEmailDocument, options);
      }
export type UpdateAccountByEmailMutationHookResult = ReturnType<typeof useUpdateAccountByEmailMutation>;
export type UpdateAccountByEmailMutationResult = Apollo.MutationResult<UpdateAccountByEmailMutation>;
export type UpdateAccountByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateAccountByEmailMutation, UpdateAccountByEmailMutationVariables>;
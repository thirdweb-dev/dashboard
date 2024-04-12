import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountFragmentDoc } from '../../fragments/__generated__/Account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAccountMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  accountValue: Types.Account_Set_Input;
}>;


export type UpdateAccountMutation = { __typename?: 'mutation_root', update_account_by_pk?: { __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null } | null };


export const UpdateAccountDocument = gql`
    mutation UpdateAccount($id: uuid!, $accountValue: account_set_input!) {
  update_account_by_pk(pk_columns: {id: $id}, _set: $accountValue) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      accountValue: // value for 'accountValue'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
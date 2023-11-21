import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountFragmentDoc } from '../../fragments/__generated__/Account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteAccountMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'mutation_root', delete_account_by_pk?: { __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null } | null };


export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: uuid!) {
  delete_account_by_pk(id: $id) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
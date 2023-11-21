import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountFragmentDoc } from '../../fragments/__generated__/Account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertAccountMutationVariables = Types.Exact<{
  account: Types.Account_Insert_Input;
}>;


export type InsertAccountMutation = { __typename?: 'mutation_root', insert_account_one?: { __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null } | null };


export const InsertAccountDocument = gql`
    mutation InsertAccount($account: account_insert_input!) {
  insert_account_one(object: $account) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type InsertAccountMutationFn = Apollo.MutationFunction<InsertAccountMutation, InsertAccountMutationVariables>;

/**
 * __useInsertAccountMutation__
 *
 * To run a mutation, you first call `useInsertAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertAccountMutation, { data, loading, error }] = useInsertAccountMutation({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useInsertAccountMutation(baseOptions?: Apollo.MutationHookOptions<InsertAccountMutation, InsertAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertAccountMutation, InsertAccountMutationVariables>(InsertAccountDocument, options);
      }
export type InsertAccountMutationHookResult = ReturnType<typeof useInsertAccountMutation>;
export type InsertAccountMutationResult = Apollo.MutationResult<InsertAccountMutation>;
export type InsertAccountMutationOptions = Apollo.BaseMutationOptions<InsertAccountMutation, InsertAccountMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertWalletUserMutationVariables = Types.Exact<{
  object: Types.Wallet_User_Insert_Input;
}>;


export type InsertWalletUserMutation = { __typename?: 'mutation_root', insert_wallet_user_one?: { __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> } | null };


export const InsertWalletUserDocument = gql`
    mutation InsertWalletUser($object: wallet_user_insert_input!) {
  insert_wallet_user_one(object: $object) {
    ...WalletUser
  }
}
    ${WalletUserFragmentDoc}`;
export type InsertWalletUserMutationFn = Apollo.MutationFunction<InsertWalletUserMutation, InsertWalletUserMutationVariables>;

/**
 * __useInsertWalletUserMutation__
 *
 * To run a mutation, you first call `useInsertWalletUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWalletUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWalletUserMutation, { data, loading, error }] = useInsertWalletUserMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertWalletUserMutation(baseOptions?: Apollo.MutationHookOptions<InsertWalletUserMutation, InsertWalletUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertWalletUserMutation, InsertWalletUserMutationVariables>(InsertWalletUserDocument, options);
      }
export type InsertWalletUserMutationHookResult = ReturnType<typeof useInsertWalletUserMutation>;
export type InsertWalletUserMutationResult = Apollo.MutationResult<InsertWalletUserMutation>;
export type InsertWalletUserMutationOptions = Apollo.BaseMutationOptions<InsertWalletUserMutation, InsertWalletUserMutationVariables>;
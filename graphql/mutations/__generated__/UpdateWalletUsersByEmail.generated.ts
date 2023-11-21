import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateWalletUsersByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  walletUserValue: Types.Wallet_User_Set_Input;
}>;


export type UpdateWalletUsersByEmailMutation = { __typename?: 'mutation_root', update_wallet_user?: { __typename?: 'wallet_user_mutation_response', returning: Array<{ __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> }> } | null };


export const UpdateWalletUsersByEmailDocument = gql`
    mutation UpdateWalletUsersByEmail($email: String!, $walletUserValue: wallet_user_set_input!) {
  update_wallet_user(where: {email: {_eq: $email}}, _set: $walletUserValue) {
    returning {
      ...WalletUser
    }
  }
}
    ${WalletUserFragmentDoc}`;
export type UpdateWalletUsersByEmailMutationFn = Apollo.MutationFunction<UpdateWalletUsersByEmailMutation, UpdateWalletUsersByEmailMutationVariables>;

/**
 * __useUpdateWalletUsersByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateWalletUsersByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletUsersByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWalletUsersByEmailMutation, { data, loading, error }] = useUpdateWalletUsersByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      walletUserValue: // value for 'walletUserValue'
 *   },
 * });
 */
export function useUpdateWalletUsersByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWalletUsersByEmailMutation, UpdateWalletUsersByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWalletUsersByEmailMutation, UpdateWalletUsersByEmailMutationVariables>(UpdateWalletUsersByEmailDocument, options);
      }
export type UpdateWalletUsersByEmailMutationHookResult = ReturnType<typeof useUpdateWalletUsersByEmailMutation>;
export type UpdateWalletUsersByEmailMutationResult = Apollo.MutationResult<UpdateWalletUsersByEmailMutation>;
export type UpdateWalletUsersByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateWalletUsersByEmailMutation, UpdateWalletUsersByEmailMutationVariables>;
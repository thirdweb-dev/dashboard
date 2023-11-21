import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WalletUserFragmentDoc } from '../../fragments/__generated__/WalletUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateWalletUserMutationVariables = Types.Exact<{
  value: Types.Wallet_User_Set_Input;
  id: Types.Scalars['uuid']['input'];
}>;


export type UpdateWalletUserMutation = { __typename?: 'mutation_root', update_wallet_user_by_pk?: { __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> } | null };


export const UpdateWalletUserDocument = gql`
    mutation UpdateWalletUser($value: wallet_user_set_input!, $id: uuid!) {
  update_wallet_user_by_pk(_set: $value, pk_columns: {id: $id}) {
    ...WalletUser
  }
}
    ${WalletUserFragmentDoc}`;
export type UpdateWalletUserMutationFn = Apollo.MutationFunction<UpdateWalletUserMutation, UpdateWalletUserMutationVariables>;

/**
 * __useUpdateWalletUserMutation__
 *
 * To run a mutation, you first call `useUpdateWalletUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWalletUserMutation, { data, loading, error }] = useUpdateWalletUserMutation({
 *   variables: {
 *      value: // value for 'value'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateWalletUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWalletUserMutation, UpdateWalletUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWalletUserMutation, UpdateWalletUserMutationVariables>(UpdateWalletUserDocument, options);
      }
export type UpdateWalletUserMutationHookResult = ReturnType<typeof useUpdateWalletUserMutation>;
export type UpdateWalletUserMutationResult = Apollo.MutationResult<UpdateWalletUserMutation>;
export type UpdateWalletUserMutationOptions = Apollo.BaseMutationOptions<UpdateWalletUserMutation, UpdateWalletUserMutationVariables>;
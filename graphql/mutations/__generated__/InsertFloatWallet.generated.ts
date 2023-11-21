import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FloatWalletFragmentDoc } from '../../fragments/__generated__/FloatWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertFloatWalletMutationVariables = Types.Exact<{
  float_wallet: Types.Float_Wallet_Insert_Input;
}>;


export type InsertFloatWalletMutation = { __typename?: 'mutation_root', insert_float_wallet_one?: { __typename?: 'float_wallet', address: string, nickname: string, env_var_key?: string | null, description?: string | null } | null };


export const InsertFloatWalletDocument = gql`
    mutation InsertFloatWallet($float_wallet: float_wallet_insert_input!) {
  insert_float_wallet_one(object: $float_wallet) {
    ...FloatWallet
  }
}
    ${FloatWalletFragmentDoc}`;
export type InsertFloatWalletMutationFn = Apollo.MutationFunction<InsertFloatWalletMutation, InsertFloatWalletMutationVariables>;

/**
 * __useInsertFloatWalletMutation__
 *
 * To run a mutation, you first call `useInsertFloatWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFloatWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFloatWalletMutation, { data, loading, error }] = useInsertFloatWalletMutation({
 *   variables: {
 *      float_wallet: // value for 'float_wallet'
 *   },
 * });
 */
export function useInsertFloatWalletMutation(baseOptions?: Apollo.MutationHookOptions<InsertFloatWalletMutation, InsertFloatWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertFloatWalletMutation, InsertFloatWalletMutationVariables>(InsertFloatWalletDocument, options);
      }
export type InsertFloatWalletMutationHookResult = ReturnType<typeof useInsertFloatWalletMutation>;
export type InsertFloatWalletMutationResult = Apollo.MutationResult<InsertFloatWalletMutation>;
export type InsertFloatWalletMutationOptions = Apollo.BaseMutationOptions<InsertFloatWalletMutation, InsertFloatWalletMutationVariables>;
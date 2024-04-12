import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { EmbeddedWalletFragmentDoc } from '../../fragments/__generated__/EmbeddedWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertNewUserEmbeddedWalletMutationVariables = Types.Exact<{
  embeddedWallet: Types.Embedded_Wallet_Insert_Input;
  shares: Array<Types.Share_Insert_Input> | Types.Share_Insert_Input;
}>;


export type InsertNewUserEmbeddedWalletMutation = { __typename?: 'mutation_root', insert_embedded_wallet_one?: { __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any } | null, insert_share?: { __typename?: 'share_mutation_response', returning: Array<{ __typename?: 'share', id: any, type: string, encryption_password?: string | null }> } | null };


export const InsertNewUserEmbeddedWalletDocument = gql`
    mutation InsertNewUserEmbeddedWallet($embeddedWallet: embedded_wallet_insert_input!, $shares: [share_insert_input!]!) {
  insert_embedded_wallet_one(object: $embeddedWallet) {
    ...EmbeddedWallet
  }
  insert_share(objects: $shares) {
    returning {
      id
      type
      encryption_password
    }
  }
}
    ${EmbeddedWalletFragmentDoc}`;
export type InsertNewUserEmbeddedWalletMutationFn = Apollo.MutationFunction<InsertNewUserEmbeddedWalletMutation, InsertNewUserEmbeddedWalletMutationVariables>;

/**
 * __useInsertNewUserEmbeddedWalletMutation__
 *
 * To run a mutation, you first call `useInsertNewUserEmbeddedWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertNewUserEmbeddedWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertNewUserEmbeddedWalletMutation, { data, loading, error }] = useInsertNewUserEmbeddedWalletMutation({
 *   variables: {
 *      embeddedWallet: // value for 'embeddedWallet'
 *      shares: // value for 'shares'
 *   },
 * });
 */
export function useInsertNewUserEmbeddedWalletMutation(baseOptions?: Apollo.MutationHookOptions<InsertNewUserEmbeddedWalletMutation, InsertNewUserEmbeddedWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertNewUserEmbeddedWalletMutation, InsertNewUserEmbeddedWalletMutationVariables>(InsertNewUserEmbeddedWalletDocument, options);
      }
export type InsertNewUserEmbeddedWalletMutationHookResult = ReturnType<typeof useInsertNewUserEmbeddedWalletMutation>;
export type InsertNewUserEmbeddedWalletMutationResult = Apollo.MutationResult<InsertNewUserEmbeddedWalletMutation>;
export type InsertNewUserEmbeddedWalletMutationOptions = Apollo.BaseMutationOptions<InsertNewUserEmbeddedWalletMutation, InsertNewUserEmbeddedWalletMutationVariables>;
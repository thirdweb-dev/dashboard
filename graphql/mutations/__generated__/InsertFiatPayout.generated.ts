import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FiatPayoutFragmentDoc } from '../../fragments/__generated__/FiatPayout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertFiatPayoutMutationVariables = Types.Exact<{
  fiat_payout: Types.Fiat_Payout_Insert_Input;
}>;


export type InsertFiatPayoutMutation = { __typename?: 'mutation_root', insert_fiat_payout_one?: { __typename?: 'fiat_payout', id: any, created_at: any, seller_id: string, amount_fiat_cents: number, currency_fiat: string, contract_address: string, contract_chain: string, paid_out_at?: any | null, transaction_hash: string, contract_payer_wallet_address: string, amount_crypto: string, currency_crypto: string } | null };


export const InsertFiatPayoutDocument = gql`
    mutation InsertFiatPayout($fiat_payout: fiat_payout_insert_input!) {
  insert_fiat_payout_one(object: $fiat_payout) {
    ...FiatPayout
  }
}
    ${FiatPayoutFragmentDoc}`;
export type InsertFiatPayoutMutationFn = Apollo.MutationFunction<InsertFiatPayoutMutation, InsertFiatPayoutMutationVariables>;

/**
 * __useInsertFiatPayoutMutation__
 *
 * To run a mutation, you first call `useInsertFiatPayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFiatPayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFiatPayoutMutation, { data, loading, error }] = useInsertFiatPayoutMutation({
 *   variables: {
 *      fiat_payout: // value for 'fiat_payout'
 *   },
 * });
 */
export function useInsertFiatPayoutMutation(baseOptions?: Apollo.MutationHookOptions<InsertFiatPayoutMutation, InsertFiatPayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertFiatPayoutMutation, InsertFiatPayoutMutationVariables>(InsertFiatPayoutDocument, options);
      }
export type InsertFiatPayoutMutationHookResult = ReturnType<typeof useInsertFiatPayoutMutation>;
export type InsertFiatPayoutMutationResult = Apollo.MutationResult<InsertFiatPayoutMutation>;
export type InsertFiatPayoutMutationOptions = Apollo.BaseMutationOptions<InsertFiatPayoutMutation, InsertFiatPayoutMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FiatPayoutFragmentDoc } from '../../fragments/__generated__/FiatPayout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFiatPayoutMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  fiatPayoutValue: Types.Fiat_Payout_Set_Input;
}>;


export type UpdateFiatPayoutMutation = { __typename?: 'mutation_root', update_fiat_payout_by_pk?: { __typename?: 'fiat_payout', id: any, created_at: any, seller_id: string, amount_fiat_cents: number, currency_fiat: string, contract_address: string, contract_chain: string, paid_out_at?: any | null, transaction_hash: string, contract_payer_wallet_address: string, amount_crypto: string, currency_crypto: string } | null };


export const UpdateFiatPayoutDocument = gql`
    mutation UpdateFiatPayout($id: uuid!, $fiatPayoutValue: fiat_payout_set_input!) {
  update_fiat_payout_by_pk(pk_columns: {id: $id}, _set: $fiatPayoutValue) {
    ...FiatPayout
  }
}
    ${FiatPayoutFragmentDoc}`;
export type UpdateFiatPayoutMutationFn = Apollo.MutationFunction<UpdateFiatPayoutMutation, UpdateFiatPayoutMutationVariables>;

/**
 * __useUpdateFiatPayoutMutation__
 *
 * To run a mutation, you first call `useUpdateFiatPayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFiatPayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFiatPayoutMutation, { data, loading, error }] = useUpdateFiatPayoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      fiatPayoutValue: // value for 'fiatPayoutValue'
 *   },
 * });
 */
export function useUpdateFiatPayoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFiatPayoutMutation, UpdateFiatPayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFiatPayoutMutation, UpdateFiatPayoutMutationVariables>(UpdateFiatPayoutDocument, options);
      }
export type UpdateFiatPayoutMutationHookResult = ReturnType<typeof useUpdateFiatPayoutMutation>;
export type UpdateFiatPayoutMutationResult = Apollo.MutationResult<UpdateFiatPayoutMutation>;
export type UpdateFiatPayoutMutationOptions = Apollo.BaseMutationOptions<UpdateFiatPayoutMutation, UpdateFiatPayoutMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CheckoutFragmentDoc } from '../../fragments/__generated__/Checkout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCheckoutsByRegisteredContractIdMutationVariables = Types.Exact<{
  registered_contract_id: Types.Scalars['uuid']['input'];
  contract_chain: Types.Scalars['String']['input'];
  contract_address: Types.Scalars['String']['input'];
  contract_type: Types.Scalars['String']['input'];
  custom_abi: Types.Scalars['jsonb']['input'];
  deleted_at: Types.Scalars['timestamptz']['input'];
}>;


export type UpdateCheckoutsByRegisteredContractIdMutation = { __typename?: 'mutation_root', update_checkout_many?: Array<{ __typename?: 'checkout_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'checkout', id: any, owner_id: string, contract_address: string, contract_type: string, contract_chain: string, collection_title: string, collection_description?: string | null, image_url?: string | null, success_callback_url?: string | null, cancel_callback_url?: string | null, created_at: any, deleted_at: any, price: any, hide_native_mint: boolean, hide_pay_with_card: boolean, hide_pay_with_crypto: boolean, hide_pay_with_bank: boolean, hide_pay_with_ideal: boolean, hide_connect_paper_wallet: boolean, hide_connect_external_wallet: boolean, mint_abi_function_name?: string | null, custom_abi: any, listing_id?: string | null, pack_id?: string | null, pack_address?: string | null, bundle_address?: string | null, brand_dark_mode: boolean, brand_button_shape: string, brand_color_scheme: string, token_id?: string | null, webhook_urls: any, float_wallet_addresses: any, require_verified_email: boolean, has_public_link: boolean, limit_per_wallet_address?: number | null, limit_per_transaction: number, card_payments_vendor?: string | null, redirect_after_payment: boolean, should_send_transfer_completed_email: boolean, seller_twitter_handle?: string | null, use_paper_access_key: boolean, generated_by_registered_contract: boolean, registered_contract_id?: any | null, contract_args?: any | null, post_purchase_message_markdown?: string | null, post_purchase_button_text?: string | null, sponsored_fees: boolean, thirdweb_client_id?: string | null, seller: { __typename?: 'seller', id: string, twitter_handle?: string | null, service_fee_bps: number, support_email?: string | null, email_display_name?: string | null, company_name?: string | null, company_logo_url?: string | null, fee_bearer: string, default_float_wallets?: any | null, deposit_amount_usd_cents?: number | null, has_production_access?: boolean | null, is_trusted?: boolean | null } }> } | null> | null };


export const UpdateCheckoutsByRegisteredContractIdDocument = gql`
    mutation UpdateCheckoutsByRegisteredContractId($registered_contract_id: uuid!, $contract_chain: String!, $contract_address: String!, $contract_type: String!, $custom_abi: jsonb!, $deleted_at: timestamptz!) {
  update_checkout_many(
    updates: {where: {registered_contract_id: {_eq: $registered_contract_id}}, _set: {contract_chain: $contract_chain, contract_address: $contract_address, contract_type: $contract_type, custom_abi: $custom_abi, deleted_at: $deleted_at}}
  ) {
    returning {
      ...Checkout
    }
    affected_rows
  }
}
    ${CheckoutFragmentDoc}`;
export type UpdateCheckoutsByRegisteredContractIdMutationFn = Apollo.MutationFunction<UpdateCheckoutsByRegisteredContractIdMutation, UpdateCheckoutsByRegisteredContractIdMutationVariables>;

/**
 * __useUpdateCheckoutsByRegisteredContractIdMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutsByRegisteredContractIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutsByRegisteredContractIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutsByRegisteredContractIdMutation, { data, loading, error }] = useUpdateCheckoutsByRegisteredContractIdMutation({
 *   variables: {
 *      registered_contract_id: // value for 'registered_contract_id'
 *      contract_chain: // value for 'contract_chain'
 *      contract_address: // value for 'contract_address'
 *      contract_type: // value for 'contract_type'
 *      custom_abi: // value for 'custom_abi'
 *      deleted_at: // value for 'deleted_at'
 *   },
 * });
 */
export function useUpdateCheckoutsByRegisteredContractIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutsByRegisteredContractIdMutation, UpdateCheckoutsByRegisteredContractIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutsByRegisteredContractIdMutation, UpdateCheckoutsByRegisteredContractIdMutationVariables>(UpdateCheckoutsByRegisteredContractIdDocument, options);
      }
export type UpdateCheckoutsByRegisteredContractIdMutationHookResult = ReturnType<typeof useUpdateCheckoutsByRegisteredContractIdMutation>;
export type UpdateCheckoutsByRegisteredContractIdMutationResult = Apollo.MutationResult<UpdateCheckoutsByRegisteredContractIdMutation>;
export type UpdateCheckoutsByRegisteredContractIdMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutsByRegisteredContractIdMutation, UpdateCheckoutsByRegisteredContractIdMutationVariables>;
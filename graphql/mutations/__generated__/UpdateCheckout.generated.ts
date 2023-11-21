import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CheckoutFragmentDoc } from '../../fragments/__generated__/Checkout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCheckoutMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  checkoutValue: Types.Checkout_Set_Input;
}>;


export type UpdateCheckoutMutation = { __typename?: 'mutation_root', update_checkout_by_pk?: { __typename?: 'checkout', id: any, owner_id: string, contract_address: string, contract_type: string, contract_chain: string, collection_title: string, collection_description?: string | null, image_url?: string | null, success_callback_url?: string | null, cancel_callback_url?: string | null, created_at: any, deleted_at: any, price: any, hide_native_mint: boolean, hide_pay_with_card: boolean, hide_pay_with_crypto: boolean, hide_pay_with_bank: boolean, hide_pay_with_ideal: boolean, hide_connect_paper_wallet: boolean, hide_connect_external_wallet: boolean, mint_abi_function_name?: string | null, custom_abi: any, listing_id?: string | null, pack_id?: string | null, pack_address?: string | null, bundle_address?: string | null, brand_dark_mode: boolean, brand_button_shape: string, brand_color_scheme: string, token_id?: string | null, webhook_urls: any, float_wallet_addresses: any, require_verified_email: boolean, has_public_link: boolean, limit_per_wallet_address?: number | null, limit_per_transaction: number, card_payments_vendor?: string | null, redirect_after_payment: boolean, should_send_transfer_completed_email: boolean, seller_twitter_handle?: string | null, use_paper_access_key: boolean, generated_by_registered_contract: boolean, registered_contract_id?: any | null, contract_args?: any | null, post_purchase_message_markdown?: string | null, post_purchase_button_text?: string | null, sponsored_fees: boolean, thirdweb_client_id?: string | null, seller: { __typename?: 'seller', id: string, twitter_handle?: string | null, service_fee_bps: number, support_email?: string | null, email_display_name?: string | null, company_name?: string | null, company_logo_url?: string | null, fee_bearer: string, default_float_wallets?: any | null, deposit_amount_usd_cents?: number | null, has_production_access?: boolean | null, is_trusted?: boolean | null } } | null };


export const UpdateCheckoutDocument = gql`
    mutation UpdateCheckout($id: uuid!, $checkoutValue: checkout_set_input!) {
  update_checkout_by_pk(pk_columns: {id: $id}, _set: $checkoutValue) {
    ...Checkout
  }
}
    ${CheckoutFragmentDoc}`;
export type UpdateCheckoutMutationFn = Apollo.MutationFunction<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>;

/**
 * __useUpdateCheckoutMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutMutation, { data, loading, error }] = useUpdateCheckoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      checkoutValue: // value for 'checkoutValue'
 *   },
 * });
 */
export function useUpdateCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>(UpdateCheckoutDocument, options);
      }
export type UpdateCheckoutMutationHookResult = ReturnType<typeof useUpdateCheckoutMutation>;
export type UpdateCheckoutMutationResult = Apollo.MutationResult<UpdateCheckoutMutation>;
export type UpdateCheckoutMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutMutation, UpdateCheckoutMutationVariables>;
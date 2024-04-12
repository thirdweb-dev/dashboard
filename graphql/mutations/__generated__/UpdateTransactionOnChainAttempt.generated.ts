import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { TransactionOnChainAttemptFragmentDoc } from '../../fragments/__generated__/TransactionOnChainAttempt.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTransactionOnChainAttemptMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  transactionOnChainAttemptValue: Types.Transaction_On_Chain_Attempt_Set_Input;
}>;


export type UpdateTransactionOnChainAttemptMutation = { __typename?: 'mutation_root', update_transaction_on_chain_attempt_by_pk?: { __typename?: 'transaction_on_chain_attempt', id: any, transaction_id: any, created_at: any, updated_at: any, status: string, failure_description: string, transaction_hash?: string | null, transaction: { __typename?: 'transaction', id: any, checkout_id: any, wallet_address?: string | null, wallet_type?: string | null, email?: string | null, created_at: any, expires_at?: any | null, deleted_at?: any | null, network_fee_usd_cents?: number | null, total_price_usd_cents?: number | null, locked_price_usd_cents?: number | null, stripe_payment_id?: string | null, checkoutcom_payment_id?: string | null, quantity: number, claimed_tokens?: any | null, payment_method: string, payment_completed_at?: any | null, transfer_completed_at?: any | null, fee_bearer: string, solana_whitelist_transaction_hash?: string | null, locked_fields: any, payment_started_at?: any | null, metadata?: any | null, expected_crypto_payment: any, contract_args?: any | null, service_fee_usd_cents?: number | null, eligibility_method: any, mint_method: any, use_paper_key: boolean, title: string, currency?: string | null, value_in_currency?: string | null, location?: string | null, transaction_hash?: string | null, refunded_at?: any | null, float_wallet_used?: string | null, payment_failure_code?: string | null, user_exported_nft_transaction_hashes: any, crypto_payment_transaction_hash?: string | null, crypto_payment_payer_address?: string | null, fiat_currency?: string | null, payment_hold_created_at?: any | null, sdk_client_secret?: string | null, airdrop_worker_job_name?: string | null, trench_transaction_id: string, transfer_failed_at?: any | null, queueId?: string | null, checkout: { __typename?: 'checkout', id: any, owner_id: string, contract_address: string, contract_type: string, contract_chain: string, collection_title: string, collection_description?: string | null, image_url?: string | null, success_callback_url?: string | null, cancel_callback_url?: string | null, created_at: any, deleted_at: any, price: any, hide_native_mint: boolean, hide_pay_with_card: boolean, hide_pay_with_crypto: boolean, hide_pay_with_bank: boolean, hide_pay_with_ideal: boolean, hide_connect_paper_wallet: boolean, hide_connect_external_wallet: boolean, mint_abi_function_name?: string | null, custom_abi: any, listing_id?: string | null, pack_id?: string | null, pack_address?: string | null, bundle_address?: string | null, brand_dark_mode: boolean, brand_button_shape: string, brand_color_scheme: string, token_id?: string | null, webhook_urls: any, float_wallet_addresses: any, require_verified_email: boolean, has_public_link: boolean, limit_per_wallet_address?: number | null, limit_per_transaction: number, card_payments_vendor?: string | null, redirect_after_payment: boolean, should_send_transfer_completed_email: boolean, seller_twitter_handle?: string | null, use_paper_access_key: boolean, generated_by_registered_contract: boolean, registered_contract_id?: any | null, contract_args?: any | null, post_purchase_message_markdown?: string | null, post_purchase_button_text?: string | null, sponsored_fees: boolean, thirdweb_client_id?: string | null, seller: { __typename?: 'seller', id: string, twitter_handle?: string | null, service_fee_bps: number, support_email?: string | null, email_display_name?: string | null, company_name?: string | null, company_logo_url?: string | null, fee_bearer: string, default_float_wallets?: any | null, deposit_amount_usd_cents?: number | null, has_production_access?: boolean | null, is_trusted?: boolean | null } } } } | null };


export const UpdateTransactionOnChainAttemptDocument = gql`
    mutation UpdateTransactionOnChainAttempt($id: uuid!, $transactionOnChainAttemptValue: transaction_on_chain_attempt_set_input!) {
  update_transaction_on_chain_attempt_by_pk(
    pk_columns: {id: $id}
    _set: $transactionOnChainAttemptValue
  ) {
    ...TransactionOnChainAttempt
  }
}
    ${TransactionOnChainAttemptFragmentDoc}`;
export type UpdateTransactionOnChainAttemptMutationFn = Apollo.MutationFunction<UpdateTransactionOnChainAttemptMutation, UpdateTransactionOnChainAttemptMutationVariables>;

/**
 * __useUpdateTransactionOnChainAttemptMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionOnChainAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionOnChainAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionOnChainAttemptMutation, { data, loading, error }] = useUpdateTransactionOnChainAttemptMutation({
 *   variables: {
 *      id: // value for 'id'
 *      transactionOnChainAttemptValue: // value for 'transactionOnChainAttemptValue'
 *   },
 * });
 */
export function useUpdateTransactionOnChainAttemptMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionOnChainAttemptMutation, UpdateTransactionOnChainAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransactionOnChainAttemptMutation, UpdateTransactionOnChainAttemptMutationVariables>(UpdateTransactionOnChainAttemptDocument, options);
      }
export type UpdateTransactionOnChainAttemptMutationHookResult = ReturnType<typeof useUpdateTransactionOnChainAttemptMutation>;
export type UpdateTransactionOnChainAttemptMutationResult = Apollo.MutationResult<UpdateTransactionOnChainAttemptMutation>;
export type UpdateTransactionOnChainAttemptMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionOnChainAttemptMutation, UpdateTransactionOnChainAttemptMutationVariables>;
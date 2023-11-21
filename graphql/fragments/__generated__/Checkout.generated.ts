import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type CheckoutFragment = { __typename?: 'checkout', id: any, owner_id: string, contract_address: string, contract_type: string, contract_chain: string, collection_title: string, collection_description?: string | null, image_url?: string | null, success_callback_url?: string | null, cancel_callback_url?: string | null, created_at: any, deleted_at: any, price: any, hide_native_mint: boolean, hide_pay_with_card: boolean, hide_pay_with_crypto: boolean, hide_pay_with_bank: boolean, hide_pay_with_ideal: boolean, hide_connect_paper_wallet: boolean, hide_connect_external_wallet: boolean, mint_abi_function_name?: string | null, custom_abi: any, listing_id?: string | null, pack_id?: string | null, pack_address?: string | null, bundle_address?: string | null, brand_dark_mode: boolean, brand_button_shape: string, brand_color_scheme: string, token_id?: string | null, webhook_urls: any, float_wallet_addresses: any, require_verified_email: boolean, has_public_link: boolean, limit_per_wallet_address?: number | null, limit_per_transaction: number, card_payments_vendor?: string | null, redirect_after_payment: boolean, should_send_transfer_completed_email: boolean, seller_twitter_handle?: string | null, use_paper_access_key: boolean, generated_by_registered_contract: boolean, registered_contract_id?: any | null, contract_args?: any | null, post_purchase_message_markdown?: string | null, post_purchase_button_text?: string | null, sponsored_fees: boolean, thirdweb_client_id?: string | null, seller: { __typename?: 'seller', id: string, twitter_handle?: string | null, service_fee_bps: number, support_email?: string | null, email_display_name?: string | null, company_name?: string | null, company_logo_url?: string | null, fee_bearer: string, default_float_wallets?: any | null, deposit_amount_usd_cents?: number | null, has_production_access?: boolean | null, is_trusted?: boolean | null } };

export const CheckoutFragmentDoc = gql`
    fragment Checkout on checkout {
  id
  owner_id
  seller {
    id
    twitter_handle
    service_fee_bps
    support_email
    email_display_name
    company_name
    company_logo_url
    fee_bearer
    default_float_wallets
    deposit_amount_usd_cents
    has_production_access
    is_trusted
  }
  contract_address
  contract_type
  contract_chain
  collection_title
  collection_description
  image_url
  success_callback_url
  cancel_callback_url
  created_at
  deleted_at
  price
  hide_native_mint
  hide_pay_with_card
  hide_pay_with_crypto
  hide_pay_with_bank
  hide_pay_with_ideal
  hide_connect_paper_wallet
  hide_connect_external_wallet
  mint_abi_function_name
  custom_abi
  listing_id
  pack_id
  pack_address
  bundle_address
  brand_dark_mode
  brand_button_shape
  brand_color_scheme
  token_id
  webhook_urls
  float_wallet_addresses
  require_verified_email
  has_public_link
  limit_per_wallet_address
  limit_per_transaction
  card_payments_vendor
  redirect_after_payment
  should_send_transfer_completed_email
  seller_twitter_handle
  use_paper_access_key
  generated_by_registered_contract
  registered_contract_id
  contract_args
  post_purchase_message_markdown
  post_purchase_button_text
  sponsored_fees
  thirdweb_client_id
}
    `;
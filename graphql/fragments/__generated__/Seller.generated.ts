import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type SellerFragment = { __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null };

export const SellerFragmentDoc = gql`
    fragment Seller on seller {
  id
  email
  twitter_handle
  service_fee_bps
  stripe_customer_id
  stripe_default_payment_method_id
  fee_bearer
  email_display_name
  support_email
  default_float_wallets
  date_business_documents_verified
  date_personal_documents_verified
  created_at
  deleted_at
  is_archived
  native_mint_payout_wallet_address
  source
  referrer
  implementation_status
  is_enterprise
  is_sole_proprietor
  company_logo_url
  company_name
  role_in_company
  estimated_launch_date
  deposit_amount_usd_cents
  auto_topup_enabled
  auto_topup_amount_usd_cents
  discord_username
  has_production_access
  thirdweb_account_id
  is_trusted
}
    `;
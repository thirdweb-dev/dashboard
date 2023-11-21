import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type FiatPayoutFragment = { __typename?: 'fiat_payout', id: any, created_at: any, seller_id: string, amount_fiat_cents: number, currency_fiat: string, contract_address: string, contract_chain: string, paid_out_at?: any | null, transaction_hash: string, contract_payer_wallet_address: string, amount_crypto: string, currency_crypto: string };

export const FiatPayoutFragmentDoc = gql`
    fragment FiatPayout on fiat_payout {
  id
  created_at
  seller_id
  amount_fiat_cents
  currency_fiat
  contract_address
  contract_chain
  paid_out_at
  transaction_hash
  contract_payer_wallet_address
  amount_crypto
  currency_crypto
}
    `;
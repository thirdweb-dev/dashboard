import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from './Contract.generated';
export type AirdropFragment = { __typename?: 'airdrop', id: any, wallet_address?: string | null, email?: string | null, status: string, transaction_id: any, contract_id?: any | null, created_at: any, updated_at: any, contract?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null };

export const AirdropFragmentDoc = gql`
    fragment Airdrop on airdrop {
  id
  wallet_address
  email
  status
  transaction_id
  contract_id
  created_at
  updated_at
  contract_id
  contract {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;
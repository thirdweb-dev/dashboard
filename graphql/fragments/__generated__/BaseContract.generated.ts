import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type BaseContractFragment = { __typename?: 'contract', id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean };

export const BaseContractFragmentDoc = gql`
    fragment BaseContract on contract {
  id
  display_name
  address
  chain
  type
  created_at
  deleted_at
  owner_id
  is_created_by_contract_deployer
  secondary_sales
  is_fiat_payout_enabled
  is_paper_managed
  is_airdrop
}
    `;
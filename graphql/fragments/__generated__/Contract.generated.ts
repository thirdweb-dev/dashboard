import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BaseContractFragmentDoc } from './BaseContract.generated';
export type ContractFragment = { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean };

export const ContractFragmentDoc = gql`
    fragment Contract on contract {
  ...BaseContract
  definition
}
    ${BaseContractFragmentDoc}`;
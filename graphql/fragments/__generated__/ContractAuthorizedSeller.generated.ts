import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type ContractAuthorizedSellerFragment = { __typename?: 'contract_authorized_seller', id: any, contract_id: any, authorized_seller_id: string, granted_at: any, revoked_at?: any | null };

export const ContractAuthorizedSellerFragmentDoc = gql`
    fragment ContractAuthorizedSeller on contract_authorized_seller {
  id
  contract_id
  authorized_seller_id
  granted_at
  revoked_at
}
    `;
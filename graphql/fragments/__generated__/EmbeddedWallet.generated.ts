import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type EmbeddedWalletFragment = { __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any };

export const EmbeddedWalletFragmentDoc = gql`
    fragment EmbeddedWallet on embedded_wallet {
  chain
  id
  address
  wallet_user_id
}
    `;
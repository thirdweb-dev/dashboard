import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type FloatWalletFragment = { __typename?: 'float_wallet', address: string, nickname: string, env_var_key?: string | null, description?: string | null };

export const FloatWalletFragmentDoc = gql`
    fragment FloatWallet on float_wallet {
  address
  nickname
  env_var_key
  description
}
    `;
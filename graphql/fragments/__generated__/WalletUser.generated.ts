import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ShareFragmentDoc } from './Share.generated';
import { EmbeddedWalletFragmentDoc } from './EmbeddedWallet.generated';
import { EwsAuthedUserFragmentDoc } from './EwsAuthedUser.generated';
export type WalletUserFragment = { __typename?: 'wallet_user', id: any, client_id: any, authed_user_id: string, date_recovery_code_sent: any, created_at: any, last_accessed_at: any, is_aws_managed: boolean, wallet_shares: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }>, embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }>, ews_authed_user: Array<{ __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any }> };

export const WalletUserFragmentDoc = gql`
    fragment WalletUser on wallet_user {
  id
  client_id
  authed_user_id
  date_recovery_code_sent
  created_at
  last_accessed_at
  is_aws_managed
  wallet_shares {
    ...Share
  }
  embedded_wallet {
    ...EmbeddedWallet
  }
  ews_authed_user {
    ...EwsAuthedUser
  }
}
    ${ShareFragmentDoc}
${EmbeddedWalletFragmentDoc}
${EwsAuthedUserFragmentDoc}`;
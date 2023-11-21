import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type ShareFragment = { __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any };

export const ShareFragmentDoc = gql`
    fragment Share on share {
  type
  id
  encryption_password
  encrypted_value
  wallet_user_id
  embedded_wallet_id
}
    `;
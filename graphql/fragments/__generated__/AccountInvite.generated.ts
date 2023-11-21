import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type AccountInviteFragment = { __typename?: 'account_invite', id: any, created_at: any, seller_id: string, email: string, role: string, is_invite_accepted: boolean, invite_expires_at: any };

export const AccountInviteFragmentDoc = gql`
    fragment AccountInvite on account_invite {
  id
  created_at
  seller_id
  email
  role
  is_invite_accepted
  invite_expires_at
}
    `;
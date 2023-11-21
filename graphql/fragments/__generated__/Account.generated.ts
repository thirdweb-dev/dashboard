import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type AccountFragment = { __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null };

export const AccountFragmentDoc = gql`
    fragment Account on account {
  id
  created_at
  seller_id
  email
  full_name
  source
  role
  convertkit_subscriber_id
}
    `;
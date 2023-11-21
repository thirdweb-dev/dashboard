import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type BuyerFragment = { __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null };

export const BuyerFragmentDoc = gql`
    fragment Buyer on buyer {
  id
  email
  stripe_customer_id
  stripe_testmode_customer_id
  stripe_verification_session_id
  created_at
  stripe_testmode_verification_session_id
  is_paper_wallet
}
    `;
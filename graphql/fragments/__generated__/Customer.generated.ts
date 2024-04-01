import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type CustomerFragment = { __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null };

export const CustomerFragmentDoc = gql`
    fragment Customer on customer {
  id
  email
  created_at
  stripe_customer_id
  stripe_verification_session_id
  stripe_verification_session_result
  stripe_verification_session_result_updated_at
  stripe_testmode_customer_id
  stripe_testmode_verification_session_id
  stripe_testmode_verification_session_result
  stripe_testmode_verification_session_result_updated_at
  checkoutcom_customer_id
  checkoutcom_testmode_customer_id
}
    `;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type BillingHistoryFragment = { __typename?: 'billing_history', id: any, seller_id: string, type: string, description: string, stripe_payment_id: string, price_charged_usd_cents: number, status: string, payment_completed_at: any };

export const BillingHistoryFragmentDoc = gql`
    fragment BillingHistory on billing_history {
  id
  seller_id
  type
  description
  stripe_payment_id
  price_charged_usd_cents
  status
  payment_completed_at
}
    `;
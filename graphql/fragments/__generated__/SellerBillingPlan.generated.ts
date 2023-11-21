import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type SellerBillingPlanFragment = { __typename?: 'seller_billing_plan', seller_id: string, type: string, plan_price_usd_cents: number, created_at: any, last_billed_at?: any | null, expires_at?: any | null, cancelled_at?: any | null };

export const SellerBillingPlanFragmentDoc = gql`
    fragment SellerBillingPlan on seller_billing_plan {
  seller_id
  type
  plan_price_usd_cents
  created_at
  last_billed_at
  expires_at
  cancelled_at
}
    `;
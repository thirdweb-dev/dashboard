import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type DetailedAnalyticsFragment = { __typename?: 'detailed_analytics', checkout_id: any, sales: any, page_visits: any, transaction_created_at: any, network_fee_usd_cents: any, paper_fee_usd_cents: any, revenue_usd_cents: any };

export const DetailedAnalyticsFragmentDoc = gql`
    fragment DetailedAnalytics on detailed_analytics {
  checkout_id
  sales
  page_visits
  transaction_created_at
  network_fee_usd_cents
  paper_fee_usd_cents
  revenue_usd_cents
}
    `;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type AnalyticOverviewFragment = { __typename?: 'analytics_overview_2', checkout_id?: any | null, checkout_created_at?: any | null, checkout_deleted_at?: any | null, collection_description?: string | null, collection_title?: string | null, image_url?: string | null, network_fees_cents?: any | null, number_sold?: any | null, owner_id?: string | null, paper_fees_cents?: any | null, payment_method?: string | null, revenue_cents?: any | null, wallet_type?: string | null, fiat_currency?: string | null, num_transactions_made?: any | null };

export const AnalyticOverviewFragmentDoc = gql`
    fragment AnalyticOverview on analytics_overview_2 {
  checkout_id
  checkout_created_at
  checkout_deleted_at
  collection_description
  collection_title
  image_url
  network_fees_cents
  number_sold
  owner_id
  paper_fees_cents
  payment_method
  revenue_cents
  wallet_type
  fiat_currency
  num_transactions_made
}
    `;
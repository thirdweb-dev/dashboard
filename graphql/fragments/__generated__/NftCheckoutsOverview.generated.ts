import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type NftCheckoutsOverviewFragment = { __typename?: 'nft_checkouts_overview', quantity?: number | null, locked_price_usd_cents?: number | null };

export const NftCheckoutsOverviewFragmentDoc = gql`
    fragment NFTCheckoutsOverview on nft_checkouts_overview {
  quantity
  locked_price_usd_cents
}
    `;
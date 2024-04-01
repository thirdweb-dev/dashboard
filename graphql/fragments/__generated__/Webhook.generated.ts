import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type WebhookFragment = { __typename?: 'webhook', id: any, seller_id: string, url: string, is_production: boolean, created_at: any, deleted_at?: any | null };

export const WebhookFragmentDoc = gql`
    fragment Webhook on webhook {
  id
  seller_id
  url
  is_production
  created_at
  deleted_at
}
    `;
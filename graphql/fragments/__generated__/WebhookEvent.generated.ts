import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type WebhookEventFragment = { __typename?: 'webhook_event', id: any, created_at: any, webhook_id: any, request_body: string, response_body: string, status: any, type: string, seller_id: string };

export const WebhookEventFragmentDoc = gql`
    fragment WebhookEvent on webhook_event {
  id
  created_at
  webhook_id
  request_body
  response_body
  status
  type
  seller_id
}
    `;
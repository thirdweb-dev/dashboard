import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type OAuthFragment = { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null };

export const OAuthFragmentDoc = gql`
    fragment OAuth on oauth {
  application_image_url
  application_name
  type
  allowlisted_domains
  client_id
  id
  owner_id
  created_at
  revoked_at
  seller {
    company_logo_url
  }
}
    `;
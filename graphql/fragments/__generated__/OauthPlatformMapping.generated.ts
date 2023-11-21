import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthFragmentDoc } from './OAuth.generated';
export type OAuthPlatformMappingFragment = { __typename?: 'oauth_platform_mapping', created_at: any, revoked_at: any, id: any, owner_id: string, platform_user_id: string, oauth_id: any, oauth: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } };

export const OAuthPlatformMappingFragmentDoc = gql`
    fragment OAuthPlatformMapping on oauth_platform_mapping {
  created_at
  revoked_at
  id
  owner_id
  platform_user_id
  oauth_id
  oauth {
    ...OAuth
  }
}
    ${OAuthFragmentDoc}`;
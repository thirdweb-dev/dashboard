import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type OauthAccessTokenFragment = { __typename?: 'oauth_access_token', id: any, email: string, created_at: any, client_id: any, access_token: string, revoked_at: any };

export const OauthAccessTokenFragmentDoc = gql`
    fragment OauthAccessToken on oauth_access_token {
  id
  email
  created_at
  client_id
  access_token
  revoked_at
}
    `;
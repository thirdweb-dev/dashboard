import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type ApiSecretKeyFragment = { __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string };

export const ApiSecretKeyFragmentDoc = gql`
    fragment ApiSecretKey on api_secret_key {
  id
  owner_id
  created_at
  revoked_at
  hashed_key
}
    `;
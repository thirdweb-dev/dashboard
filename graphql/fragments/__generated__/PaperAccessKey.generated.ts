import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type PaperAccessKeyFragment = { __typename?: 'paper_access_key', id: any, public_key: string, created_at: any, revoked_at: any, owner_id: string, checkout_id?: any | null };

export const PaperAccessKeyFragmentDoc = gql`
    fragment PaperAccessKey on paper_access_key {
  id
  public_key
  created_at
  revoked_at
  owner_id
  checkout_id
}
    `;
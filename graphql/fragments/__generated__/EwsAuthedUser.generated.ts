import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type EwsAuthedUserFragment = { __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any };

export const EwsAuthedUserFragmentDoc = gql`
    fragment EwsAuthedUser on ews_authed_user {
  authed_user_id
  email
  id
}
    `;
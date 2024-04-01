import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type DeveloperAuthSettingFragment = { __typename?: 'developer_auth_setting', id: any, auth_provider: string, developer_client_id: any, created_at: any, deleted_at: any, settings: any };

export const DeveloperAuthSettingFragmentDoc = gql`
    fragment DeveloperAuthSetting on developer_auth_setting {
  id
  auth_provider
  developer_client_id
  created_at
  deleted_at
  settings
}
    `;
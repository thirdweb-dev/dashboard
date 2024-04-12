import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthPlatformMappingFragmentDoc } from '../../fragments/__generated__/OauthPlatformMapping.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOAuthPlatformMappingMutationVariables = Types.Exact<{
  platformUserId: Types.Scalars['String']['input'];
  clientId: Types.Scalars['uuid']['input'];
  oauthPlatformMappingValues: Types.Oauth_Platform_Mapping_Set_Input;
}>;


export type UpdateOAuthPlatformMappingMutation = { __typename?: 'mutation_root', update_oauth_platform_mapping?: { __typename?: 'oauth_platform_mapping_mutation_response', returning: Array<{ __typename?: 'oauth_platform_mapping', created_at: any, revoked_at: any, id: any, owner_id: string, platform_user_id: string, oauth_id: any, oauth: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } }> } | null };


export const UpdateOAuthPlatformMappingDocument = gql`
    mutation UpdateOAuthPlatformMapping($platformUserId: String!, $clientId: uuid!, $oauthPlatformMappingValues: oauth_platform_mapping_set_input!) {
  update_oauth_platform_mapping(
    where: {platform_user_id: {_eq: $platformUserId}, oauth: {client_id: {_eq: $clientId}}}
    _set: $oauthPlatformMappingValues
  ) {
    returning {
      ...OAuthPlatformMapping
    }
  }
}
    ${OAuthPlatformMappingFragmentDoc}`;
export type UpdateOAuthPlatformMappingMutationFn = Apollo.MutationFunction<UpdateOAuthPlatformMappingMutation, UpdateOAuthPlatformMappingMutationVariables>;

/**
 * __useUpdateOAuthPlatformMappingMutation__
 *
 * To run a mutation, you first call `useUpdateOAuthPlatformMappingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOAuthPlatformMappingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOAuthPlatformMappingMutation, { data, loading, error }] = useUpdateOAuthPlatformMappingMutation({
 *   variables: {
 *      platformUserId: // value for 'platformUserId'
 *      clientId: // value for 'clientId'
 *      oauthPlatformMappingValues: // value for 'oauthPlatformMappingValues'
 *   },
 * });
 */
export function useUpdateOAuthPlatformMappingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOAuthPlatformMappingMutation, UpdateOAuthPlatformMappingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOAuthPlatformMappingMutation, UpdateOAuthPlatformMappingMutationVariables>(UpdateOAuthPlatformMappingDocument, options);
      }
export type UpdateOAuthPlatformMappingMutationHookResult = ReturnType<typeof useUpdateOAuthPlatformMappingMutation>;
export type UpdateOAuthPlatformMappingMutationResult = Apollo.MutationResult<UpdateOAuthPlatformMappingMutation>;
export type UpdateOAuthPlatformMappingMutationOptions = Apollo.BaseMutationOptions<UpdateOAuthPlatformMappingMutation, UpdateOAuthPlatformMappingMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthPlatformMappingFragmentDoc } from '../../fragments/__generated__/OauthPlatformMapping.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertOAuthPlatformMappingMutationVariables = Types.Exact<{
  oauthPlatformMappingInput: Types.Oauth_Platform_Mapping_Insert_Input;
}>;


export type InsertOAuthPlatformMappingMutation = { __typename?: 'mutation_root', insert_oauth_platform_mapping_one?: { __typename?: 'oauth_platform_mapping', created_at: any, revoked_at: any, id: any, owner_id: string, platform_user_id: string, oauth_id: any, oauth: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } } | null };


export const InsertOAuthPlatformMappingDocument = gql`
    mutation InsertOAuthPlatformMapping($oauthPlatformMappingInput: oauth_platform_mapping_insert_input!) {
  insert_oauth_platform_mapping_one(object: $oauthPlatformMappingInput) {
    ...OAuthPlatformMapping
  }
}
    ${OAuthPlatformMappingFragmentDoc}`;
export type InsertOAuthPlatformMappingMutationFn = Apollo.MutationFunction<InsertOAuthPlatformMappingMutation, InsertOAuthPlatformMappingMutationVariables>;

/**
 * __useInsertOAuthPlatformMappingMutation__
 *
 * To run a mutation, you first call `useInsertOAuthPlatformMappingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOAuthPlatformMappingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOAuthPlatformMappingMutation, { data, loading, error }] = useInsertOAuthPlatformMappingMutation({
 *   variables: {
 *      oauthPlatformMappingInput: // value for 'oauthPlatformMappingInput'
 *   },
 * });
 */
export function useInsertOAuthPlatformMappingMutation(baseOptions?: Apollo.MutationHookOptions<InsertOAuthPlatformMappingMutation, InsertOAuthPlatformMappingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertOAuthPlatformMappingMutation, InsertOAuthPlatformMappingMutationVariables>(InsertOAuthPlatformMappingDocument, options);
      }
export type InsertOAuthPlatformMappingMutationHookResult = ReturnType<typeof useInsertOAuthPlatformMappingMutation>;
export type InsertOAuthPlatformMappingMutationResult = Apollo.MutationResult<InsertOAuthPlatformMappingMutation>;
export type InsertOAuthPlatformMappingMutationOptions = Apollo.BaseMutationOptions<InsertOAuthPlatformMappingMutation, InsertOAuthPlatformMappingMutationVariables>;
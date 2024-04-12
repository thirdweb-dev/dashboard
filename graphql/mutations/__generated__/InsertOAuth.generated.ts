import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthFragmentDoc } from '../../fragments/__generated__/OAuth.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertOAuthMutationVariables = Types.Exact<{
  object: Types.Oauth_Insert_Input;
}>;


export type InsertOAuthMutation = { __typename?: 'mutation_root', insert_oauth_one?: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } | null };


export const InsertOAuthDocument = gql`
    mutation InsertOAuth($object: oauth_insert_input!) {
  insert_oauth_one(object: $object) {
    ...OAuth
  }
}
    ${OAuthFragmentDoc}`;
export type InsertOAuthMutationFn = Apollo.MutationFunction<InsertOAuthMutation, InsertOAuthMutationVariables>;

/**
 * __useInsertOAuthMutation__
 *
 * To run a mutation, you first call `useInsertOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOAuthMutation, { data, loading, error }] = useInsertOAuthMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertOAuthMutation(baseOptions?: Apollo.MutationHookOptions<InsertOAuthMutation, InsertOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertOAuthMutation, InsertOAuthMutationVariables>(InsertOAuthDocument, options);
      }
export type InsertOAuthMutationHookResult = ReturnType<typeof useInsertOAuthMutation>;
export type InsertOAuthMutationResult = Apollo.MutationResult<InsertOAuthMutation>;
export type InsertOAuthMutationOptions = Apollo.BaseMutationOptions<InsertOAuthMutation, InsertOAuthMutationVariables>;
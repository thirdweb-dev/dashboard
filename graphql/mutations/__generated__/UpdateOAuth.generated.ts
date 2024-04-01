import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OAuthFragmentDoc } from '../../fragments/__generated__/OAuth.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOAuthMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  updateValue: Types.Oauth_Set_Input;
}>;


export type UpdateOAuthMutation = { __typename?: 'mutation_root', update_oauth_by_pk?: { __typename?: 'oauth', application_image_url?: string | null, application_name: string, type: string, allowlisted_domains: any, client_id: any, id: any, owner_id: string, created_at: any, revoked_at: any, seller?: { __typename?: 'seller', company_logo_url?: string | null } | null } | null };


export const UpdateOAuthDocument = gql`
    mutation UpdateOAuth($id: uuid!, $updateValue: oauth_set_input!) {
  update_oauth_by_pk(pk_columns: {id: $id}, _set: $updateValue) {
    ...OAuth
  }
}
    ${OAuthFragmentDoc}`;
export type UpdateOAuthMutationFn = Apollo.MutationFunction<UpdateOAuthMutation, UpdateOAuthMutationVariables>;

/**
 * __useUpdateOAuthMutation__
 *
 * To run a mutation, you first call `useUpdateOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOAuthMutation, { data, loading, error }] = useUpdateOAuthMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateValue: // value for 'updateValue'
 *   },
 * });
 */
export function useUpdateOAuthMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOAuthMutation, UpdateOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOAuthMutation, UpdateOAuthMutationVariables>(UpdateOAuthDocument, options);
      }
export type UpdateOAuthMutationHookResult = ReturnType<typeof useUpdateOAuthMutation>;
export type UpdateOAuthMutationResult = Apollo.MutationResult<UpdateOAuthMutation>;
export type UpdateOAuthMutationOptions = Apollo.BaseMutationOptions<UpdateOAuthMutation, UpdateOAuthMutationVariables>;
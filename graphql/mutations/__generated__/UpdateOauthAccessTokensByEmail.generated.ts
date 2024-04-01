import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { OauthAccessTokenFragmentDoc } from '../../fragments/__generated__/OauthAccessToken.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOauthAccessTokensByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  oauthAccessToken: Types.Oauth_Access_Token_Set_Input;
}>;


export type UpdateOauthAccessTokensByEmailMutation = { __typename?: 'mutation_root', update_oauth_access_token?: { __typename?: 'oauth_access_token_mutation_response', returning: Array<{ __typename?: 'oauth_access_token', id: any, email: string, created_at: any, client_id: any, access_token: string, revoked_at: any }> } | null };


export const UpdateOauthAccessTokensByEmailDocument = gql`
    mutation UpdateOauthAccessTokensByEmail($email: String!, $oauthAccessToken: oauth_access_token_set_input!) {
  update_oauth_access_token(
    where: {email: {_eq: $email}}
    _set: $oauthAccessToken
  ) {
    returning {
      ...OauthAccessToken
    }
  }
}
    ${OauthAccessTokenFragmentDoc}`;
export type UpdateOauthAccessTokensByEmailMutationFn = Apollo.MutationFunction<UpdateOauthAccessTokensByEmailMutation, UpdateOauthAccessTokensByEmailMutationVariables>;

/**
 * __useUpdateOauthAccessTokensByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateOauthAccessTokensByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOauthAccessTokensByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOauthAccessTokensByEmailMutation, { data, loading, error }] = useUpdateOauthAccessTokensByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      oauthAccessToken: // value for 'oauthAccessToken'
 *   },
 * });
 */
export function useUpdateOauthAccessTokensByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOauthAccessTokensByEmailMutation, UpdateOauthAccessTokensByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOauthAccessTokensByEmailMutation, UpdateOauthAccessTokensByEmailMutationVariables>(UpdateOauthAccessTokensByEmailDocument, options);
      }
export type UpdateOauthAccessTokensByEmailMutationHookResult = ReturnType<typeof useUpdateOauthAccessTokensByEmailMutation>;
export type UpdateOauthAccessTokensByEmailMutationResult = Apollo.MutationResult<UpdateOauthAccessTokensByEmailMutation>;
export type UpdateOauthAccessTokensByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateOauthAccessTokensByEmailMutation, UpdateOauthAccessTokensByEmailMutationVariables>;
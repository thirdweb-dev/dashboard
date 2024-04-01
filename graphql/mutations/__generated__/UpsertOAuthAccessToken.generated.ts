import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertOAuthAccessTokenMutationVariables = Types.Exact<{
  object: Types.Oauth_Access_Token_Insert_Input;
}>;


export type UpsertOAuthAccessTokenMutation = { __typename?: 'mutation_root', insert_oauth_access_token_one?: { __typename?: 'oauth_access_token', access_token: string } | null };


export const UpsertOAuthAccessTokenDocument = gql`
    mutation UpsertOAuthAccessToken($object: oauth_access_token_insert_input!) {
  insert_oauth_access_token_one(
    object: $object
    on_conflict: {constraint: oauth_access_token_client_id_email_access_token_key, update_columns: []}
  ) {
    access_token
  }
}
    `;
export type UpsertOAuthAccessTokenMutationFn = Apollo.MutationFunction<UpsertOAuthAccessTokenMutation, UpsertOAuthAccessTokenMutationVariables>;

/**
 * __useUpsertOAuthAccessTokenMutation__
 *
 * To run a mutation, you first call `useUpsertOAuthAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertOAuthAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertOAuthAccessTokenMutation, { data, loading, error }] = useUpsertOAuthAccessTokenMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useUpsertOAuthAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpsertOAuthAccessTokenMutation, UpsertOAuthAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertOAuthAccessTokenMutation, UpsertOAuthAccessTokenMutationVariables>(UpsertOAuthAccessTokenDocument, options);
      }
export type UpsertOAuthAccessTokenMutationHookResult = ReturnType<typeof useUpsertOAuthAccessTokenMutation>;
export type UpsertOAuthAccessTokenMutationResult = Apollo.MutationResult<UpsertOAuthAccessTokenMutation>;
export type UpsertOAuthAccessTokenMutationOptions = Apollo.BaseMutationOptions<UpsertOAuthAccessTokenMutation, UpsertOAuthAccessTokenMutationVariables>;
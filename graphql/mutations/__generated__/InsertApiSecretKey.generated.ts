import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertApiSecretKeyMutationVariables = Types.Exact<{
  api_secret_key?: Types.InputMaybe<Types.Api_Secret_Key_Insert_Input>;
}>;


export type InsertApiSecretKeyMutation = { __typename?: 'mutation_root', insert_api_secret_key_one?: { __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string } | null };


export const InsertApiSecretKeyDocument = gql`
    mutation InsertApiSecretKey($api_secret_key: api_secret_key_insert_input = {}) {
  insert_api_secret_key_one(object: $api_secret_key) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;
export type InsertApiSecretKeyMutationFn = Apollo.MutationFunction<InsertApiSecretKeyMutation, InsertApiSecretKeyMutationVariables>;

/**
 * __useInsertApiSecretKeyMutation__
 *
 * To run a mutation, you first call `useInsertApiSecretKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertApiSecretKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertApiSecretKeyMutation, { data, loading, error }] = useInsertApiSecretKeyMutation({
 *   variables: {
 *      api_secret_key: // value for 'api_secret_key'
 *   },
 * });
 */
export function useInsertApiSecretKeyMutation(baseOptions?: Apollo.MutationHookOptions<InsertApiSecretKeyMutation, InsertApiSecretKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertApiSecretKeyMutation, InsertApiSecretKeyMutationVariables>(InsertApiSecretKeyDocument, options);
      }
export type InsertApiSecretKeyMutationHookResult = ReturnType<typeof useInsertApiSecretKeyMutation>;
export type InsertApiSecretKeyMutationResult = Apollo.MutationResult<InsertApiSecretKeyMutation>;
export type InsertApiSecretKeyMutationOptions = Apollo.BaseMutationOptions<InsertApiSecretKeyMutation, InsertApiSecretKeyMutationVariables>;
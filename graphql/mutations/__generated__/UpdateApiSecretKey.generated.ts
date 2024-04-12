import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ApiSecretKeyFragmentDoc } from '../../fragments/__generated__/ApiSecretKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateApiSecretKeyMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  apiSecretKeyValues: Types.Api_Secret_Key_Set_Input;
}>;


export type UpdateApiSecretKeyMutation = { __typename?: 'mutation_root', update_api_secret_key_by_pk?: { __typename?: 'api_secret_key', id: any, owner_id: string, created_at: any, revoked_at?: any | null, hashed_key: string } | null };


export const UpdateApiSecretKeyDocument = gql`
    mutation UpdateApiSecretKey($id: uuid!, $apiSecretKeyValues: api_secret_key_set_input!) {
  update_api_secret_key_by_pk(pk_columns: {id: $id}, _set: $apiSecretKeyValues) {
    ...ApiSecretKey
  }
}
    ${ApiSecretKeyFragmentDoc}`;
export type UpdateApiSecretKeyMutationFn = Apollo.MutationFunction<UpdateApiSecretKeyMutation, UpdateApiSecretKeyMutationVariables>;

/**
 * __useUpdateApiSecretKeyMutation__
 *
 * To run a mutation, you first call `useUpdateApiSecretKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApiSecretKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApiSecretKeyMutation, { data, loading, error }] = useUpdateApiSecretKeyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      apiSecretKeyValues: // value for 'apiSecretKeyValues'
 *   },
 * });
 */
export function useUpdateApiSecretKeyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApiSecretKeyMutation, UpdateApiSecretKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApiSecretKeyMutation, UpdateApiSecretKeyMutationVariables>(UpdateApiSecretKeyDocument, options);
      }
export type UpdateApiSecretKeyMutationHookResult = ReturnType<typeof useUpdateApiSecretKeyMutation>;
export type UpdateApiSecretKeyMutationResult = Apollo.MutationResult<UpdateApiSecretKeyMutation>;
export type UpdateApiSecretKeyMutationOptions = Apollo.BaseMutationOptions<UpdateApiSecretKeyMutation, UpdateApiSecretKeyMutationVariables>;
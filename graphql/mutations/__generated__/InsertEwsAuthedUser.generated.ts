import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { EwsAuthedUserFragmentDoc } from '../../fragments/__generated__/EwsAuthedUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertEwsAuthedUserMutationVariables = Types.Exact<{
  object: Types.Ews_Authed_User_Insert_Input;
}>;


export type InsertEwsAuthedUserMutation = { __typename?: 'mutation_root', insert_ews_authed_user_one?: { __typename?: 'ews_authed_user', authed_user_id: string, email: string, id: any } | null };


export const InsertEwsAuthedUserDocument = gql`
    mutation InsertEwsAuthedUser($object: ews_authed_user_insert_input!) {
  insert_ews_authed_user_one(object: $object) {
    ...EwsAuthedUser
  }
}
    ${EwsAuthedUserFragmentDoc}`;
export type InsertEwsAuthedUserMutationFn = Apollo.MutationFunction<InsertEwsAuthedUserMutation, InsertEwsAuthedUserMutationVariables>;

/**
 * __useInsertEwsAuthedUserMutation__
 *
 * To run a mutation, you first call `useInsertEwsAuthedUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertEwsAuthedUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertEwsAuthedUserMutation, { data, loading, error }] = useInsertEwsAuthedUserMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertEwsAuthedUserMutation(baseOptions?: Apollo.MutationHookOptions<InsertEwsAuthedUserMutation, InsertEwsAuthedUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertEwsAuthedUserMutation, InsertEwsAuthedUserMutationVariables>(InsertEwsAuthedUserDocument, options);
      }
export type InsertEwsAuthedUserMutationHookResult = ReturnType<typeof useInsertEwsAuthedUserMutation>;
export type InsertEwsAuthedUserMutationResult = Apollo.MutationResult<InsertEwsAuthedUserMutation>;
export type InsertEwsAuthedUserMutationOptions = Apollo.BaseMutationOptions<InsertEwsAuthedUserMutation, InsertEwsAuthedUserMutationVariables>;
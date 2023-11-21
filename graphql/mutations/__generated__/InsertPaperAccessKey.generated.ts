import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertPaperAccessKeyMutationVariables = Types.Exact<{
  object: Types.Paper_Access_Key_Insert_Input;
}>;


export type InsertPaperAccessKeyMutation = { __typename?: 'mutation_root', insert_paper_access_key_one?: { __typename?: 'paper_access_key', id: any, public_key: string } | null };


export const InsertPaperAccessKeyDocument = gql`
    mutation InsertPaperAccessKey($object: paper_access_key_insert_input!) {
  insert_paper_access_key_one(object: $object) {
    id
    public_key
  }
}
    `;
export type InsertPaperAccessKeyMutationFn = Apollo.MutationFunction<InsertPaperAccessKeyMutation, InsertPaperAccessKeyMutationVariables>;

/**
 * __useInsertPaperAccessKeyMutation__
 *
 * To run a mutation, you first call `useInsertPaperAccessKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPaperAccessKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPaperAccessKeyMutation, { data, loading, error }] = useInsertPaperAccessKeyMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertPaperAccessKeyMutation(baseOptions?: Apollo.MutationHookOptions<InsertPaperAccessKeyMutation, InsertPaperAccessKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPaperAccessKeyMutation, InsertPaperAccessKeyMutationVariables>(InsertPaperAccessKeyDocument, options);
      }
export type InsertPaperAccessKeyMutationHookResult = ReturnType<typeof useInsertPaperAccessKeyMutation>;
export type InsertPaperAccessKeyMutationResult = Apollo.MutationResult<InsertPaperAccessKeyMutation>;
export type InsertPaperAccessKeyMutationOptions = Apollo.BaseMutationOptions<InsertPaperAccessKeyMutation, InsertPaperAccessKeyMutationVariables>;
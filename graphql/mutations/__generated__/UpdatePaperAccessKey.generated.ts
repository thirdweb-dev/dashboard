import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePaperAccessKeyMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  updateValues: Types.Paper_Access_Key_Set_Input;
}>;


export type UpdatePaperAccessKeyMutation = { __typename?: 'mutation_root', update_paper_access_key_by_pk?: { __typename?: 'paper_access_key', public_key: string } | null };


export const UpdatePaperAccessKeyDocument = gql`
    mutation UpdatePaperAccessKey($id: uuid!, $updateValues: paper_access_key_set_input!) {
  update_paper_access_key_by_pk(pk_columns: {id: $id}, _set: $updateValues) {
    public_key
  }
}
    `;
export type UpdatePaperAccessKeyMutationFn = Apollo.MutationFunction<UpdatePaperAccessKeyMutation, UpdatePaperAccessKeyMutationVariables>;

/**
 * __useUpdatePaperAccessKeyMutation__
 *
 * To run a mutation, you first call `useUpdatePaperAccessKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaperAccessKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaperAccessKeyMutation, { data, loading, error }] = useUpdatePaperAccessKeyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateValues: // value for 'updateValues'
 *   },
 * });
 */
export function useUpdatePaperAccessKeyMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaperAccessKeyMutation, UpdatePaperAccessKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaperAccessKeyMutation, UpdatePaperAccessKeyMutationVariables>(UpdatePaperAccessKeyDocument, options);
      }
export type UpdatePaperAccessKeyMutationHookResult = ReturnType<typeof useUpdatePaperAccessKeyMutation>;
export type UpdatePaperAccessKeyMutationResult = Apollo.MutationResult<UpdatePaperAccessKeyMutation>;
export type UpdatePaperAccessKeyMutationOptions = Apollo.BaseMutationOptions<UpdatePaperAccessKeyMutation, UpdatePaperAccessKeyMutationVariables>;
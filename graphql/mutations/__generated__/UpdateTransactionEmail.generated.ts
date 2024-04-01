import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTransactionEmailMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  email: Types.Scalars['String']['input'];
}>;


export type UpdateTransactionEmailMutation = { __typename?: 'mutation_root', update_transaction_by_pk?: { __typename?: 'transaction', id: any } | null };


export const UpdateTransactionEmailDocument = gql`
    mutation UpdateTransactionEmail($id: uuid!, $email: String!) {
  update_transaction_by_pk(pk_columns: {id: $id}, _set: {email: $email}) {
    id
  }
}
    `;
export type UpdateTransactionEmailMutationFn = Apollo.MutationFunction<UpdateTransactionEmailMutation, UpdateTransactionEmailMutationVariables>;

/**
 * __useUpdateTransactionEmailMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionEmailMutation, { data, loading, error }] = useUpdateTransactionEmailMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateTransactionEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionEmailMutation, UpdateTransactionEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransactionEmailMutation, UpdateTransactionEmailMutationVariables>(UpdateTransactionEmailDocument, options);
      }
export type UpdateTransactionEmailMutationHookResult = ReturnType<typeof useUpdateTransactionEmailMutation>;
export type UpdateTransactionEmailMutationResult = Apollo.MutationResult<UpdateTransactionEmailMutation>;
export type UpdateTransactionEmailMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionEmailMutation, UpdateTransactionEmailMutationVariables>;
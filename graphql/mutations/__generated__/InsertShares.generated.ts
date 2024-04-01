import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertSharesMutationVariables = Types.Exact<{
  shares: Array<Types.Share_Insert_Input> | Types.Share_Insert_Input;
}>;


export type InsertSharesMutation = { __typename?: 'mutation_root', insert_share?: { __typename?: 'share_mutation_response', returning: Array<{ __typename?: 'share', id: any, type: string, encryption_password?: string | null }> } | null };


export const InsertSharesDocument = gql`
    mutation InsertShares($shares: [share_insert_input!]!) {
  insert_share(objects: $shares) {
    returning {
      id
      type
      encryption_password
    }
  }
}
    `;
export type InsertSharesMutationFn = Apollo.MutationFunction<InsertSharesMutation, InsertSharesMutationVariables>;

/**
 * __useInsertSharesMutation__
 *
 * To run a mutation, you first call `useInsertSharesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertSharesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertSharesMutation, { data, loading, error }] = useInsertSharesMutation({
 *   variables: {
 *      shares: // value for 'shares'
 *   },
 * });
 */
export function useInsertSharesMutation(baseOptions?: Apollo.MutationHookOptions<InsertSharesMutation, InsertSharesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertSharesMutation, InsertSharesMutationVariables>(InsertSharesDocument, options);
      }
export type InsertSharesMutationHookResult = ReturnType<typeof useInsertSharesMutation>;
export type InsertSharesMutationResult = Apollo.MutationResult<InsertSharesMutation>;
export type InsertSharesMutationOptions = Apollo.BaseMutationOptions<InsertSharesMutation, InsertSharesMutationVariables>;
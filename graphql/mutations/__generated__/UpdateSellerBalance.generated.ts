import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSellerBalanceMutationVariables = Types.Exact<{
  _eq: Types.Scalars['String']['input'];
  deposit_amount_usd_cents: Types.Scalars['Int']['input'];
}>;


export type UpdateSellerBalanceMutation = { __typename?: 'mutation_root', update_seller?: { __typename?: 'seller_mutation_response', affected_rows: number } | null };


export const UpdateSellerBalanceDocument = gql`
    mutation UpdateSellerBalance($_eq: String!, $deposit_amount_usd_cents: Int!) {
  update_seller(
    where: {id: {_eq: $_eq}}
    _inc: {deposit_amount_usd_cents: $deposit_amount_usd_cents}
  ) {
    affected_rows
  }
}
    `;
export type UpdateSellerBalanceMutationFn = Apollo.MutationFunction<UpdateSellerBalanceMutation, UpdateSellerBalanceMutationVariables>;

/**
 * __useUpdateSellerBalanceMutation__
 *
 * To run a mutation, you first call `useUpdateSellerBalanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSellerBalanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSellerBalanceMutation, { data, loading, error }] = useUpdateSellerBalanceMutation({
 *   variables: {
 *      _eq: // value for '_eq'
 *      deposit_amount_usd_cents: // value for 'deposit_amount_usd_cents'
 *   },
 * });
 */
export function useUpdateSellerBalanceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSellerBalanceMutation, UpdateSellerBalanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSellerBalanceMutation, UpdateSellerBalanceMutationVariables>(UpdateSellerBalanceDocument, options);
      }
export type UpdateSellerBalanceMutationHookResult = ReturnType<typeof useUpdateSellerBalanceMutation>;
export type UpdateSellerBalanceMutationResult = Apollo.MutationResult<UpdateSellerBalanceMutation>;
export type UpdateSellerBalanceMutationOptions = Apollo.BaseMutationOptions<UpdateSellerBalanceMutation, UpdateSellerBalanceMutationVariables>;
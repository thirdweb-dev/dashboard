import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BuyerFragmentDoc } from '../../fragments/__generated__/Buyer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBuyerMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  buyerValue: Types.Buyer_Set_Input;
}>;


export type UpdateBuyerMutation = { __typename?: 'mutation_root', update_buyer_by_pk?: { __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null } | null };


export const UpdateBuyerDocument = gql`
    mutation UpdateBuyer($id: String!, $buyerValue: buyer_set_input!) {
  update_buyer_by_pk(pk_columns: {id: $id}, _set: $buyerValue) {
    ...Buyer
  }
}
    ${BuyerFragmentDoc}`;
export type UpdateBuyerMutationFn = Apollo.MutationFunction<UpdateBuyerMutation, UpdateBuyerMutationVariables>;

/**
 * __useUpdateBuyerMutation__
 *
 * To run a mutation, you first call `useUpdateBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBuyerMutation, { data, loading, error }] = useUpdateBuyerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      buyerValue: // value for 'buyerValue'
 *   },
 * });
 */
export function useUpdateBuyerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBuyerMutation, UpdateBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBuyerMutation, UpdateBuyerMutationVariables>(UpdateBuyerDocument, options);
      }
export type UpdateBuyerMutationHookResult = ReturnType<typeof useUpdateBuyerMutation>;
export type UpdateBuyerMutationResult = Apollo.MutationResult<UpdateBuyerMutation>;
export type UpdateBuyerMutationOptions = Apollo.BaseMutationOptions<UpdateBuyerMutation, UpdateBuyerMutationVariables>;
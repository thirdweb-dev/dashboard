import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BuyerFragmentDoc } from '../../fragments/__generated__/Buyer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBuyersByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  buyerValue: Types.Buyer_Set_Input;
}>;


export type UpdateBuyersByEmailMutation = { __typename?: 'mutation_root', update_buyer?: { __typename?: 'buyer_mutation_response', returning: Array<{ __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null }> } | null };


export const UpdateBuyersByEmailDocument = gql`
    mutation UpdateBuyersByEmail($email: String!, $buyerValue: buyer_set_input!) {
  update_buyer(where: {email: {_eq: $email}}, _set: $buyerValue) {
    returning {
      ...Buyer
    }
  }
}
    ${BuyerFragmentDoc}`;
export type UpdateBuyersByEmailMutationFn = Apollo.MutationFunction<UpdateBuyersByEmailMutation, UpdateBuyersByEmailMutationVariables>;

/**
 * __useUpdateBuyersByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateBuyersByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBuyersByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBuyersByEmailMutation, { data, loading, error }] = useUpdateBuyersByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      buyerValue: // value for 'buyerValue'
 *   },
 * });
 */
export function useUpdateBuyersByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBuyersByEmailMutation, UpdateBuyersByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBuyersByEmailMutation, UpdateBuyersByEmailMutationVariables>(UpdateBuyersByEmailDocument, options);
      }
export type UpdateBuyersByEmailMutationHookResult = ReturnType<typeof useUpdateBuyersByEmailMutation>;
export type UpdateBuyersByEmailMutationResult = Apollo.MutationResult<UpdateBuyersByEmailMutation>;
export type UpdateBuyersByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateBuyersByEmailMutation, UpdateBuyersByEmailMutationVariables>;
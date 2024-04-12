import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerBillingPlanFragmentDoc } from '../../fragments/__generated__/SellerBillingPlan.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSellerBillingPlanMutationVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
  updateValue?: Types.InputMaybe<Types.Seller_Billing_Plan_Set_Input>;
}>;


export type UpdateSellerBillingPlanMutation = { __typename?: 'mutation_root', update_seller_billing_plan_by_pk?: { __typename?: 'seller_billing_plan', seller_id: string, type: string, plan_price_usd_cents: number, created_at: any, last_billed_at?: any | null, expires_at?: any | null, cancelled_at?: any | null } | null };


export const UpdateSellerBillingPlanDocument = gql`
    mutation UpdateSellerBillingPlan($sellerId: String!, $updateValue: seller_billing_plan_set_input) {
  update_seller_billing_plan_by_pk(
    pk_columns: {seller_id: $sellerId}
    _set: $updateValue
  ) {
    ...SellerBillingPlan
  }
}
    ${SellerBillingPlanFragmentDoc}`;
export type UpdateSellerBillingPlanMutationFn = Apollo.MutationFunction<UpdateSellerBillingPlanMutation, UpdateSellerBillingPlanMutationVariables>;

/**
 * __useUpdateSellerBillingPlanMutation__
 *
 * To run a mutation, you first call `useUpdateSellerBillingPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSellerBillingPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSellerBillingPlanMutation, { data, loading, error }] = useUpdateSellerBillingPlanMutation({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *      updateValue: // value for 'updateValue'
 *   },
 * });
 */
export function useUpdateSellerBillingPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSellerBillingPlanMutation, UpdateSellerBillingPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSellerBillingPlanMutation, UpdateSellerBillingPlanMutationVariables>(UpdateSellerBillingPlanDocument, options);
      }
export type UpdateSellerBillingPlanMutationHookResult = ReturnType<typeof useUpdateSellerBillingPlanMutation>;
export type UpdateSellerBillingPlanMutationResult = Apollo.MutationResult<UpdateSellerBillingPlanMutation>;
export type UpdateSellerBillingPlanMutationOptions = Apollo.BaseMutationOptions<UpdateSellerBillingPlanMutation, UpdateSellerBillingPlanMutationVariables>;
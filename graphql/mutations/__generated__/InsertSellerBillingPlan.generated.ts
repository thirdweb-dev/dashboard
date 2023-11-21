import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerBillingPlanFragmentDoc } from '../../fragments/__generated__/SellerBillingPlan.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertSellerBillingPlanMutationVariables = Types.Exact<{
  object: Types.Seller_Billing_Plan_Insert_Input;
}>;


export type InsertSellerBillingPlanMutation = { __typename?: 'mutation_root', insert_seller_billing_plan_one?: { __typename?: 'seller_billing_plan', seller_id: string, type: string, plan_price_usd_cents: number, created_at: any, last_billed_at?: any | null, expires_at?: any | null, cancelled_at?: any | null } | null };


export const InsertSellerBillingPlanDocument = gql`
    mutation InsertSellerBillingPlan($object: seller_billing_plan_insert_input!) {
  insert_seller_billing_plan_one(object: $object) {
    ...SellerBillingPlan
  }
}
    ${SellerBillingPlanFragmentDoc}`;
export type InsertSellerBillingPlanMutationFn = Apollo.MutationFunction<InsertSellerBillingPlanMutation, InsertSellerBillingPlanMutationVariables>;

/**
 * __useInsertSellerBillingPlanMutation__
 *
 * To run a mutation, you first call `useInsertSellerBillingPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertSellerBillingPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertSellerBillingPlanMutation, { data, loading, error }] = useInsertSellerBillingPlanMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertSellerBillingPlanMutation(baseOptions?: Apollo.MutationHookOptions<InsertSellerBillingPlanMutation, InsertSellerBillingPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertSellerBillingPlanMutation, InsertSellerBillingPlanMutationVariables>(InsertSellerBillingPlanDocument, options);
      }
export type InsertSellerBillingPlanMutationHookResult = ReturnType<typeof useInsertSellerBillingPlanMutation>;
export type InsertSellerBillingPlanMutationResult = Apollo.MutationResult<InsertSellerBillingPlanMutation>;
export type InsertSellerBillingPlanMutationOptions = Apollo.BaseMutationOptions<InsertSellerBillingPlanMutation, InsertSellerBillingPlanMutationVariables>;
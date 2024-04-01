import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BillingHistoryFragmentDoc } from '../../fragments/__generated__/BillingHistory.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertBillingHistoryMutationVariables = Types.Exact<{
  object: Types.Billing_History_Insert_Input;
}>;


export type InsertBillingHistoryMutation = { __typename?: 'mutation_root', insert_billing_history_one?: { __typename?: 'billing_history', id: any, seller_id: string, type: string, description: string, stripe_payment_id: string, price_charged_usd_cents: number, status: string, payment_completed_at: any } | null };


export const InsertBillingHistoryDocument = gql`
    mutation InsertBillingHistory($object: billing_history_insert_input!) {
  insert_billing_history_one(
    object: $object
    on_conflict: {constraint: billing_history_stripe_payment_id_key, update_columns: [type, price_charged_usd_cents, status, payment_completed_at]}
  ) {
    ...BillingHistory
  }
}
    ${BillingHistoryFragmentDoc}`;
export type InsertBillingHistoryMutationFn = Apollo.MutationFunction<InsertBillingHistoryMutation, InsertBillingHistoryMutationVariables>;

/**
 * __useInsertBillingHistoryMutation__
 *
 * To run a mutation, you first call `useInsertBillingHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertBillingHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertBillingHistoryMutation, { data, loading, error }] = useInsertBillingHistoryMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertBillingHistoryMutation(baseOptions?: Apollo.MutationHookOptions<InsertBillingHistoryMutation, InsertBillingHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertBillingHistoryMutation, InsertBillingHistoryMutationVariables>(InsertBillingHistoryDocument, options);
      }
export type InsertBillingHistoryMutationHookResult = ReturnType<typeof useInsertBillingHistoryMutation>;
export type InsertBillingHistoryMutationResult = Apollo.MutationResult<InsertBillingHistoryMutation>;
export type InsertBillingHistoryMutationOptions = Apollo.BaseMutationOptions<InsertBillingHistoryMutation, InsertBillingHistoryMutationVariables>;
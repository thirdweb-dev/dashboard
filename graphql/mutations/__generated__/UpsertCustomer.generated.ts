import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CustomerFragmentDoc } from '../../fragments/__generated__/Customer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertCustomerMutationVariables = Types.Exact<{
  customer: Types.Customer_Insert_Input;
}>;


export type UpsertCustomerMutation = { __typename?: 'mutation_root', insert_customer_one?: { __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null } | null };


export const UpsertCustomerDocument = gql`
    mutation UpsertCustomer($customer: customer_insert_input!) {
  insert_customer_one(
    object: $customer
    on_conflict: {constraint: customer_email_key, update_columns: []}
  ) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;
export type UpsertCustomerMutationFn = Apollo.MutationFunction<UpsertCustomerMutation, UpsertCustomerMutationVariables>;

/**
 * __useUpsertCustomerMutation__
 *
 * To run a mutation, you first call `useUpsertCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCustomerMutation, { data, loading, error }] = useUpsertCustomerMutation({
 *   variables: {
 *      customer: // value for 'customer'
 *   },
 * });
 */
export function useUpsertCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpsertCustomerMutation, UpsertCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertCustomerMutation, UpsertCustomerMutationVariables>(UpsertCustomerDocument, options);
      }
export type UpsertCustomerMutationHookResult = ReturnType<typeof useUpsertCustomerMutation>;
export type UpsertCustomerMutationResult = Apollo.MutationResult<UpsertCustomerMutation>;
export type UpsertCustomerMutationOptions = Apollo.BaseMutationOptions<UpsertCustomerMutation, UpsertCustomerMutationVariables>;
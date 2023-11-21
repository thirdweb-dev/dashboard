import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CustomerFragmentDoc } from '../../fragments/__generated__/Customer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  customerValue: Types.Customer_Set_Input;
}>;


export type UpdateCustomerMutation = { __typename?: 'mutation_root', update_customer_by_pk?: { __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null } | null };


export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($id: uuid!, $customerValue: customer_set_input!) {
  update_customer_by_pk(pk_columns: {id: $id}, _set: $customerValue) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      customerValue: // value for 'customerValue'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
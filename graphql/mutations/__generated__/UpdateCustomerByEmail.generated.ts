import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CustomerFragmentDoc } from '../../fragments/__generated__/Customer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerByEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  customerValue: Types.Customer_Set_Input;
}>;


export type UpdateCustomerByEmailMutation = { __typename?: 'mutation_root', update_customer?: { __typename?: 'customer_mutation_response', returning: Array<{ __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null }> } | null };


export const UpdateCustomerByEmailDocument = gql`
    mutation UpdateCustomerByEmail($email: String!, $customerValue: customer_set_input!) {
  update_customer(where: {email: {_eq: $email}}, _set: $customerValue) {
    returning {
      ...Customer
    }
  }
}
    ${CustomerFragmentDoc}`;
export type UpdateCustomerByEmailMutationFn = Apollo.MutationFunction<UpdateCustomerByEmailMutation, UpdateCustomerByEmailMutationVariables>;

/**
 * __useUpdateCustomerByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerByEmailMutation, { data, loading, error }] = useUpdateCustomerByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      customerValue: // value for 'customerValue'
 *   },
 * });
 */
export function useUpdateCustomerByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerByEmailMutation, UpdateCustomerByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerByEmailMutation, UpdateCustomerByEmailMutationVariables>(UpdateCustomerByEmailDocument, options);
      }
export type UpdateCustomerByEmailMutationHookResult = ReturnType<typeof useUpdateCustomerByEmailMutation>;
export type UpdateCustomerByEmailMutationResult = Apollo.MutationResult<UpdateCustomerByEmailMutation>;
export type UpdateCustomerByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerByEmailMutation, UpdateCustomerByEmailMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CustomerFragmentDoc } from '../../fragments/__generated__/Customer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomerByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type CustomerByEmailQuery = { __typename?: 'query_root', customer: Array<{ __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null }> };


export const CustomerByEmailDocument = gql`
    query CustomerByEmail($email: String!) {
  customer(where: {email: {_eq: $email}}) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useCustomerByEmailQuery__
 *
 * To run a query within a React component, call `useCustomerByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCustomerByEmailQuery(baseOptions: Apollo.QueryHookOptions<CustomerByEmailQuery, CustomerByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerByEmailQuery, CustomerByEmailQueryVariables>(CustomerByEmailDocument, options);
      }
export function useCustomerByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerByEmailQuery, CustomerByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerByEmailQuery, CustomerByEmailQueryVariables>(CustomerByEmailDocument, options);
        }
export function useCustomerByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomerByEmailQuery, CustomerByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomerByEmailQuery, CustomerByEmailQueryVariables>(CustomerByEmailDocument, options);
        }
export type CustomerByEmailQueryHookResult = ReturnType<typeof useCustomerByEmailQuery>;
export type CustomerByEmailLazyQueryHookResult = ReturnType<typeof useCustomerByEmailLazyQuery>;
export type CustomerByEmailSuspenseQueryHookResult = ReturnType<typeof useCustomerByEmailSuspenseQuery>;
export type CustomerByEmailQueryResult = Apollo.QueryResult<CustomerByEmailQuery, CustomerByEmailQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CustomerFragmentDoc } from '../../fragments/__generated__/Customer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomerQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type CustomerQuery = { __typename?: 'query_root', customer_by_pk?: { __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null } | null };


export const CustomerDocument = gql`
    query Customer($id: uuid!) {
  customer_by_pk(id: $id) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useCustomerQuery__
 *
 * To run a query within a React component, call `useCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerQuery(baseOptions: Apollo.QueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
      }
export function useCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
        }
export function useCustomerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, options);
        }
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerLazyQueryHookResult = ReturnType<typeof useCustomerLazyQuery>;
export type CustomerSuspenseQueryHookResult = ReturnType<typeof useCustomerSuspenseQuery>;
export type CustomerQueryResult = Apollo.QueryResult<CustomerQuery, CustomerQueryVariables>;
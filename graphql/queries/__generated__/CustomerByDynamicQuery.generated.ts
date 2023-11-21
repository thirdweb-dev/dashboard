import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CustomerFragmentDoc } from '../../fragments/__generated__/Customer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomerByDynamicQueryQueryVariables = Types.Exact<{
  customerExp?: Types.InputMaybe<Array<Types.Customer_Bool_Exp> | Types.Customer_Bool_Exp>;
}>;


export type CustomerByDynamicQueryQuery = { __typename?: 'query_root', customer: Array<{ __typename?: 'customer', id: any, email: string, created_at: any, stripe_customer_id?: string | null, stripe_verification_session_id?: string | null, stripe_verification_session_result?: string | null, stripe_verification_session_result_updated_at?: any | null, stripe_testmode_customer_id?: string | null, stripe_testmode_verification_session_id?: string | null, stripe_testmode_verification_session_result?: string | null, stripe_testmode_verification_session_result_updated_at?: any | null, checkoutcom_customer_id?: string | null, checkoutcom_testmode_customer_id?: string | null }> };


export const CustomerByDynamicQueryDocument = gql`
    query CustomerByDynamicQuery($customerExp: [customer_bool_exp!]) {
  customer(where: {_or: $customerExp}) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useCustomerByDynamicQueryQuery__
 *
 * To run a query within a React component, call `useCustomerByDynamicQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerByDynamicQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerByDynamicQueryQuery({
 *   variables: {
 *      customerExp: // value for 'customerExp'
 *   },
 * });
 */
export function useCustomerByDynamicQueryQuery(baseOptions?: Apollo.QueryHookOptions<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>(CustomerByDynamicQueryDocument, options);
      }
export function useCustomerByDynamicQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>(CustomerByDynamicQueryDocument, options);
        }
export function useCustomerByDynamicQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>(CustomerByDynamicQueryDocument, options);
        }
export type CustomerByDynamicQueryQueryHookResult = ReturnType<typeof useCustomerByDynamicQueryQuery>;
export type CustomerByDynamicQueryLazyQueryHookResult = ReturnType<typeof useCustomerByDynamicQueryLazyQuery>;
export type CustomerByDynamicQuerySuspenseQueryHookResult = ReturnType<typeof useCustomerByDynamicQuerySuspenseQuery>;
export type CustomerByDynamicQueryQueryResult = Apollo.QueryResult<CustomerByDynamicQueryQuery, CustomerByDynamicQueryQueryVariables>;
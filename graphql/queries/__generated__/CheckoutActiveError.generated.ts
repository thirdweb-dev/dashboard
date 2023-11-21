import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CheckoutActiveErrorFragmentDoc } from '../../fragments/__generated__/CheckoutActiveError.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutActiveErrorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckoutActiveErrorsQuery = { __typename?: 'query_root', checkout_active_error: Array<{ __typename?: 'checkout_active_error', id: any, condition: any, message: string, display_type: string }> };


export const CheckoutActiveErrorsDocument = gql`
    query CheckoutActiveErrors {
  checkout_active_error {
    ...CheckoutActiveError
  }
}
    ${CheckoutActiveErrorFragmentDoc}`;

/**
 * __useCheckoutActiveErrorsQuery__
 *
 * To run a query within a React component, call `useCheckoutActiveErrorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutActiveErrorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutActiveErrorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckoutActiveErrorsQuery(baseOptions?: Apollo.QueryHookOptions<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>(CheckoutActiveErrorsDocument, options);
      }
export function useCheckoutActiveErrorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>(CheckoutActiveErrorsDocument, options);
        }
export function useCheckoutActiveErrorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>(CheckoutActiveErrorsDocument, options);
        }
export type CheckoutActiveErrorsQueryHookResult = ReturnType<typeof useCheckoutActiveErrorsQuery>;
export type CheckoutActiveErrorsLazyQueryHookResult = ReturnType<typeof useCheckoutActiveErrorsLazyQuery>;
export type CheckoutActiveErrorsSuspenseQueryHookResult = ReturnType<typeof useCheckoutActiveErrorsSuspenseQuery>;
export type CheckoutActiveErrorsQueryResult = Apollo.QueryResult<CheckoutActiveErrorsQuery, CheckoutActiveErrorsQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AccountFragmentDoc } from '../../fragments/__generated__/Account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccountsBySellerIdQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type AccountsBySellerIdQuery = { __typename?: 'query_root', account: Array<{ __typename?: 'account', id: any, created_at: any, seller_id: string, email: string, full_name?: string | null, source?: string | null, role: string, convertkit_subscriber_id?: number | null }> };


export const AccountsBySellerIdDocument = gql`
    query AccountsBySellerId($sellerId: String!) {
  account(order_by: {created_at: asc}, where: {seller_id: {_eq: $sellerId}}) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;

/**
 * __useAccountsBySellerIdQuery__
 *
 * To run a query within a React component, call `useAccountsBySellerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsBySellerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsBySellerIdQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useAccountsBySellerIdQuery(baseOptions: Apollo.QueryHookOptions<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>(AccountsBySellerIdDocument, options);
      }
export function useAccountsBySellerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>(AccountsBySellerIdDocument, options);
        }
export function useAccountsBySellerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>(AccountsBySellerIdDocument, options);
        }
export type AccountsBySellerIdQueryHookResult = ReturnType<typeof useAccountsBySellerIdQuery>;
export type AccountsBySellerIdLazyQueryHookResult = ReturnType<typeof useAccountsBySellerIdLazyQuery>;
export type AccountsBySellerIdSuspenseQueryHookResult = ReturnType<typeof useAccountsBySellerIdSuspenseQuery>;
export type AccountsBySellerIdQueryResult = Apollo.QueryResult<AccountsBySellerIdQuery, AccountsBySellerIdQueryVariables>;
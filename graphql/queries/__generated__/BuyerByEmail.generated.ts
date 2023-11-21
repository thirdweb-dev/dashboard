import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BuyerFragmentDoc } from '../../fragments/__generated__/Buyer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BuyerByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type BuyerByEmailQuery = { __typename?: 'query_root', buyer: Array<{ __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null }> };


export const BuyerByEmailDocument = gql`
    query BuyerByEmail($email: String!) {
  buyer(where: {email: {_eq: $email}}) {
    ...Buyer
  }
}
    ${BuyerFragmentDoc}`;

/**
 * __useBuyerByEmailQuery__
 *
 * To run a query within a React component, call `useBuyerByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyerByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyerByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useBuyerByEmailQuery(baseOptions: Apollo.QueryHookOptions<BuyerByEmailQuery, BuyerByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuyerByEmailQuery, BuyerByEmailQueryVariables>(BuyerByEmailDocument, options);
      }
export function useBuyerByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyerByEmailQuery, BuyerByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuyerByEmailQuery, BuyerByEmailQueryVariables>(BuyerByEmailDocument, options);
        }
export function useBuyerByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BuyerByEmailQuery, BuyerByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BuyerByEmailQuery, BuyerByEmailQueryVariables>(BuyerByEmailDocument, options);
        }
export type BuyerByEmailQueryHookResult = ReturnType<typeof useBuyerByEmailQuery>;
export type BuyerByEmailLazyQueryHookResult = ReturnType<typeof useBuyerByEmailLazyQuery>;
export type BuyerByEmailSuspenseQueryHookResult = ReturnType<typeof useBuyerByEmailSuspenseQuery>;
export type BuyerByEmailQueryResult = Apollo.QueryResult<BuyerByEmailQuery, BuyerByEmailQueryVariables>;
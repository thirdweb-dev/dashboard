import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BuyerFragmentDoc } from '../../fragments/__generated__/Buyer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BuyerQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type BuyerQuery = { __typename?: 'query_root', buyer_by_pk?: { __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null } | null };


export const BuyerDocument = gql`
    query Buyer($id: String!) {
  buyer_by_pk(id: $id) {
    ...Buyer
  }
}
    ${BuyerFragmentDoc}`;

/**
 * __useBuyerQuery__
 *
 * To run a query within a React component, call `useBuyerQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBuyerQuery(baseOptions: Apollo.QueryHookOptions<BuyerQuery, BuyerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuyerQuery, BuyerQueryVariables>(BuyerDocument, options);
      }
export function useBuyerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyerQuery, BuyerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuyerQuery, BuyerQueryVariables>(BuyerDocument, options);
        }
export function useBuyerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BuyerQuery, BuyerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BuyerQuery, BuyerQueryVariables>(BuyerDocument, options);
        }
export type BuyerQueryHookResult = ReturnType<typeof useBuyerQuery>;
export type BuyerLazyQueryHookResult = ReturnType<typeof useBuyerLazyQuery>;
export type BuyerSuspenseQueryHookResult = ReturnType<typeof useBuyerSuspenseQuery>;
export type BuyerQueryResult = Apollo.QueryResult<BuyerQuery, BuyerQueryVariables>;
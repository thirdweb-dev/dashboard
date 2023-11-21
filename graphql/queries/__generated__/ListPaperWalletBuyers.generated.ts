import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BuyerFragmentDoc } from '../../fragments/__generated__/Buyer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListPaperWalletBuyersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListPaperWalletBuyersQuery = { __typename?: 'query_root', buyer: Array<{ __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null }> };


export const ListPaperWalletBuyersDocument = gql`
    query ListPaperWalletBuyers {
  buyer(where: {is_paper_wallet: {_eq: true}}) {
    ...Buyer
  }
}
    ${BuyerFragmentDoc}`;

/**
 * __useListPaperWalletBuyersQuery__
 *
 * To run a query within a React component, call `useListPaperWalletBuyersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPaperWalletBuyersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPaperWalletBuyersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPaperWalletBuyersQuery(baseOptions?: Apollo.QueryHookOptions<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>(ListPaperWalletBuyersDocument, options);
      }
export function useListPaperWalletBuyersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>(ListPaperWalletBuyersDocument, options);
        }
export function useListPaperWalletBuyersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>(ListPaperWalletBuyersDocument, options);
        }
export type ListPaperWalletBuyersQueryHookResult = ReturnType<typeof useListPaperWalletBuyersQuery>;
export type ListPaperWalletBuyersLazyQueryHookResult = ReturnType<typeof useListPaperWalletBuyersLazyQuery>;
export type ListPaperWalletBuyersSuspenseQueryHookResult = ReturnType<typeof useListPaperWalletBuyersSuspenseQuery>;
export type ListPaperWalletBuyersQueryResult = Apollo.QueryResult<ListPaperWalletBuyersQuery, ListPaperWalletBuyersQueryVariables>;
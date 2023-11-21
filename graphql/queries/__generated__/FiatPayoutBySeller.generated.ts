import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FiatPayoutFragmentDoc } from '../../fragments/__generated__/FiatPayout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FiatPayoutBySellerQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type FiatPayoutBySellerQuery = { __typename?: 'query_root', fiat_payout: Array<{ __typename?: 'fiat_payout', id: any, created_at: any, seller_id: string, amount_fiat_cents: number, currency_fiat: string, contract_address: string, contract_chain: string, paid_out_at?: any | null, transaction_hash: string, contract_payer_wallet_address: string, amount_crypto: string, currency_crypto: string }> };


export const FiatPayoutBySellerDocument = gql`
    query FiatPayoutBySeller($sellerId: String!) {
  fiat_payout(where: {seller_id: {_eq: $sellerId}}) {
    ...FiatPayout
  }
}
    ${FiatPayoutFragmentDoc}`;

/**
 * __useFiatPayoutBySellerQuery__
 *
 * To run a query within a React component, call `useFiatPayoutBySellerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiatPayoutBySellerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiatPayoutBySellerQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useFiatPayoutBySellerQuery(baseOptions: Apollo.QueryHookOptions<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>(FiatPayoutBySellerDocument, options);
      }
export function useFiatPayoutBySellerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>(FiatPayoutBySellerDocument, options);
        }
export function useFiatPayoutBySellerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>(FiatPayoutBySellerDocument, options);
        }
export type FiatPayoutBySellerQueryHookResult = ReturnType<typeof useFiatPayoutBySellerQuery>;
export type FiatPayoutBySellerLazyQueryHookResult = ReturnType<typeof useFiatPayoutBySellerLazyQuery>;
export type FiatPayoutBySellerSuspenseQueryHookResult = ReturnType<typeof useFiatPayoutBySellerSuspenseQuery>;
export type FiatPayoutBySellerQueryResult = Apollo.QueryResult<FiatPayoutBySellerQuery, FiatPayoutBySellerQueryVariables>;
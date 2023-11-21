import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FiatPayoutFragmentDoc } from '../../fragments/__generated__/FiatPayout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FiatPayoutByTransactionHashQueryVariables = Types.Exact<{
  transactionHash: Types.Scalars['String']['input'];
}>;


export type FiatPayoutByTransactionHashQuery = { __typename?: 'query_root', fiat_payout: Array<{ __typename?: 'fiat_payout', id: any, created_at: any, seller_id: string, amount_fiat_cents: number, currency_fiat: string, contract_address: string, contract_chain: string, paid_out_at?: any | null, transaction_hash: string, contract_payer_wallet_address: string, amount_crypto: string, currency_crypto: string }> };


export const FiatPayoutByTransactionHashDocument = gql`
    query FiatPayoutByTransactionHash($transactionHash: String!) {
  fiat_payout(where: {transaction_hash: {_eq: $transactionHash}}) {
    ...FiatPayout
  }
}
    ${FiatPayoutFragmentDoc}`;

/**
 * __useFiatPayoutByTransactionHashQuery__
 *
 * To run a query within a React component, call `useFiatPayoutByTransactionHashQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiatPayoutByTransactionHashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiatPayoutByTransactionHashQuery({
 *   variables: {
 *      transactionHash: // value for 'transactionHash'
 *   },
 * });
 */
export function useFiatPayoutByTransactionHashQuery(baseOptions: Apollo.QueryHookOptions<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>(FiatPayoutByTransactionHashDocument, options);
      }
export function useFiatPayoutByTransactionHashLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>(FiatPayoutByTransactionHashDocument, options);
        }
export function useFiatPayoutByTransactionHashSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>(FiatPayoutByTransactionHashDocument, options);
        }
export type FiatPayoutByTransactionHashQueryHookResult = ReturnType<typeof useFiatPayoutByTransactionHashQuery>;
export type FiatPayoutByTransactionHashLazyQueryHookResult = ReturnType<typeof useFiatPayoutByTransactionHashLazyQuery>;
export type FiatPayoutByTransactionHashSuspenseQueryHookResult = ReturnType<typeof useFiatPayoutByTransactionHashSuspenseQuery>;
export type FiatPayoutByTransactionHashQueryResult = Apollo.QueryResult<FiatPayoutByTransactionHashQuery, FiatPayoutByTransactionHashQueryVariables>;
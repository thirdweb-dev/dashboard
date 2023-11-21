import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AirdropFragmentDoc } from '../../fragments/__generated__/Airdrop.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AirdropByTransactionIdQueryVariables = Types.Exact<{
  transactionId: Types.Scalars['uuid']['input'];
}>;


export type AirdropByTransactionIdQuery = { __typename?: 'query_root', airdrop: Array<{ __typename?: 'airdrop', id: any, wallet_address?: string | null, email?: string | null, status: string, transaction_id: any, contract_id?: any | null, created_at: any, updated_at: any, contract?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null }> };


export const AirdropByTransactionIdDocument = gql`
    query AirdropByTransactionId($transactionId: uuid!) {
  airdrop(where: {transaction_id: {_eq: $transactionId}}) {
    ...Airdrop
  }
}
    ${AirdropFragmentDoc}`;

/**
 * __useAirdropByTransactionIdQuery__
 *
 * To run a query within a React component, call `useAirdropByTransactionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirdropByTransactionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirdropByTransactionIdQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useAirdropByTransactionIdQuery(baseOptions: Apollo.QueryHookOptions<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>(AirdropByTransactionIdDocument, options);
      }
export function useAirdropByTransactionIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>(AirdropByTransactionIdDocument, options);
        }
export function useAirdropByTransactionIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>(AirdropByTransactionIdDocument, options);
        }
export type AirdropByTransactionIdQueryHookResult = ReturnType<typeof useAirdropByTransactionIdQuery>;
export type AirdropByTransactionIdLazyQueryHookResult = ReturnType<typeof useAirdropByTransactionIdLazyQuery>;
export type AirdropByTransactionIdSuspenseQueryHookResult = ReturnType<typeof useAirdropByTransactionIdSuspenseQuery>;
export type AirdropByTransactionIdQueryResult = Apollo.QueryResult<AirdropByTransactionIdQuery, AirdropByTransactionIdQueryVariables>;
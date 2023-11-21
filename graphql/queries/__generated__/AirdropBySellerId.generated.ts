import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AirdropFragmentDoc } from '../../fragments/__generated__/Airdrop.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AirdropBySellerIdQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type AirdropBySellerIdQuery = { __typename?: 'query_root', airdrop: Array<{ __typename?: 'airdrop', id: any, wallet_address?: string | null, email?: string | null, status: string, transaction_id: any, contract_id?: any | null, created_at: any, updated_at: any, contract?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null }> };


export const AirdropBySellerIdDocument = gql`
    query AirdropBySellerId($sellerId: String!) {
  airdrop(where: {seller_id: {_eq: $sellerId}}, order_by: {created_at: desc}) {
    ...Airdrop
  }
}
    ${AirdropFragmentDoc}`;

/**
 * __useAirdropBySellerIdQuery__
 *
 * To run a query within a React component, call `useAirdropBySellerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirdropBySellerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirdropBySellerIdQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useAirdropBySellerIdQuery(baseOptions: Apollo.QueryHookOptions<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>(AirdropBySellerIdDocument, options);
      }
export function useAirdropBySellerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>(AirdropBySellerIdDocument, options);
        }
export function useAirdropBySellerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>(AirdropBySellerIdDocument, options);
        }
export type AirdropBySellerIdQueryHookResult = ReturnType<typeof useAirdropBySellerIdQuery>;
export type AirdropBySellerIdLazyQueryHookResult = ReturnType<typeof useAirdropBySellerIdLazyQuery>;
export type AirdropBySellerIdSuspenseQueryHookResult = ReturnType<typeof useAirdropBySellerIdSuspenseQuery>;
export type AirdropBySellerIdQueryResult = Apollo.QueryResult<AirdropBySellerIdQuery, AirdropBySellerIdQueryVariables>;
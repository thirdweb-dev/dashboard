import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListContractsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListContractsQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ListContractsDocument = gql`
    query ListContracts {
  contract(where: {deleted_at: {_is_null: false}}) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useListContractsQuery__
 *
 * To run a query within a React component, call `useListContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListContractsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListContractsQuery(baseOptions?: Apollo.QueryHookOptions<ListContractsQuery, ListContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListContractsQuery, ListContractsQueryVariables>(ListContractsDocument, options);
      }
export function useListContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListContractsQuery, ListContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListContractsQuery, ListContractsQueryVariables>(ListContractsDocument, options);
        }
export function useListContractsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListContractsQuery, ListContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListContractsQuery, ListContractsQueryVariables>(ListContractsDocument, options);
        }
export type ListContractsQueryHookResult = ReturnType<typeof useListContractsQuery>;
export type ListContractsLazyQueryHookResult = ReturnType<typeof useListContractsLazyQuery>;
export type ListContractsSuspenseQueryHookResult = ReturnType<typeof useListContractsSuspenseQuery>;
export type ListContractsQueryResult = Apollo.QueryResult<ListContractsQuery, ListContractsQueryVariables>;
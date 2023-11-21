import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllContractsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllContractsQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const GetAllContractsDocument = gql`
    query GetAllContracts {
  contract {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useGetAllContractsQuery__
 *
 * To run a query within a React component, call `useGetAllContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllContractsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllContractsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllContractsQuery, GetAllContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllContractsQuery, GetAllContractsQueryVariables>(GetAllContractsDocument, options);
      }
export function useGetAllContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllContractsQuery, GetAllContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllContractsQuery, GetAllContractsQueryVariables>(GetAllContractsDocument, options);
        }
export function useGetAllContractsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllContractsQuery, GetAllContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllContractsQuery, GetAllContractsQueryVariables>(GetAllContractsDocument, options);
        }
export type GetAllContractsQueryHookResult = ReturnType<typeof useGetAllContractsQuery>;
export type GetAllContractsLazyQueryHookResult = ReturnType<typeof useGetAllContractsLazyQuery>;
export type GetAllContractsSuspenseQueryHookResult = ReturnType<typeof useGetAllContractsSuspenseQuery>;
export type GetAllContractsQueryResult = Apollo.QueryResult<GetAllContractsQuery, GetAllContractsQueryVariables>;
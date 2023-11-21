import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractsByAddressAndChainQueryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String']['input'];
  chain: Types.Scalars['String']['input'];
}>;


export type ContractsByAddressAndChainQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ContractsByAddressAndChainDocument = gql`
    query ContractsByAddressAndChain($contractAddress: String!, $chain: String!) {
  contract(
    where: {deleted_at: {_gte: "now()"}, address: {_eq: $contractAddress}, chain: {_eq: $chain}}
  ) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractsByAddressAndChainQuery__
 *
 * To run a query within a React component, call `useContractsByAddressAndChainQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractsByAddressAndChainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractsByAddressAndChainQuery({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      chain: // value for 'chain'
 *   },
 * });
 */
export function useContractsByAddressAndChainQuery(baseOptions: Apollo.QueryHookOptions<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>(ContractsByAddressAndChainDocument, options);
      }
export function useContractsByAddressAndChainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>(ContractsByAddressAndChainDocument, options);
        }
export function useContractsByAddressAndChainSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>(ContractsByAddressAndChainDocument, options);
        }
export type ContractsByAddressAndChainQueryHookResult = ReturnType<typeof useContractsByAddressAndChainQuery>;
export type ContractsByAddressAndChainLazyQueryHookResult = ReturnType<typeof useContractsByAddressAndChainLazyQuery>;
export type ContractsByAddressAndChainSuspenseQueryHookResult = ReturnType<typeof useContractsByAddressAndChainSuspenseQuery>;
export type ContractsByAddressAndChainQueryResult = Apollo.QueryResult<ContractsByAddressAndChainQuery, ContractsByAddressAndChainQueryVariables>;
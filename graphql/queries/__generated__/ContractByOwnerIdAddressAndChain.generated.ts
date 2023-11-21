import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractByOwnerIdAddressAndChainQueryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String']['input'];
  ownerId: Types.Scalars['String']['input'];
  chain: Types.Scalars['String']['input'];
}>;


export type ContractByOwnerIdAddressAndChainQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ContractByOwnerIdAddressAndChainDocument = gql`
    query ContractByOwnerIdAddressAndChain($contractAddress: String!, $ownerId: String!, $chain: String!) {
  contract(
    where: {deleted_at: {_gte: "now()"}, address: {_ilike: $contractAddress}, owner_id: {_eq: $ownerId}, chain: {_eq: $chain}}
  ) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractByOwnerIdAddressAndChainQuery__
 *
 * To run a query within a React component, call `useContractByOwnerIdAddressAndChainQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractByOwnerIdAddressAndChainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractByOwnerIdAddressAndChainQuery({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      ownerId: // value for 'ownerId'
 *      chain: // value for 'chain'
 *   },
 * });
 */
export function useContractByOwnerIdAddressAndChainQuery(baseOptions: Apollo.QueryHookOptions<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>(ContractByOwnerIdAddressAndChainDocument, options);
      }
export function useContractByOwnerIdAddressAndChainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>(ContractByOwnerIdAddressAndChainDocument, options);
        }
export function useContractByOwnerIdAddressAndChainSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>(ContractByOwnerIdAddressAndChainDocument, options);
        }
export type ContractByOwnerIdAddressAndChainQueryHookResult = ReturnType<typeof useContractByOwnerIdAddressAndChainQuery>;
export type ContractByOwnerIdAddressAndChainLazyQueryHookResult = ReturnType<typeof useContractByOwnerIdAddressAndChainLazyQuery>;
export type ContractByOwnerIdAddressAndChainSuspenseQueryHookResult = ReturnType<typeof useContractByOwnerIdAddressAndChainSuspenseQuery>;
export type ContractByOwnerIdAddressAndChainQueryResult = Apollo.QueryResult<ContractByOwnerIdAddressAndChainQuery, ContractByOwnerIdAddressAndChainQueryVariables>;
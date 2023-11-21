import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractByOwnerIdAndContractIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
  contractId: Types.Scalars['uuid']['input'];
}>;


export type ContractByOwnerIdAndContractIdQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ContractByOwnerIdAndContractIdDocument = gql`
    query ContractByOwnerIdAndContractId($ownerId: String!, $contractId: uuid!) {
  contract(
    where: {owner_id: {_eq: $ownerId}, id: {_eq: $contractId}, deleted_at: {_gte: "now()"}}
  ) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractByOwnerIdAndContractIdQuery__
 *
 * To run a query within a React component, call `useContractByOwnerIdAndContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractByOwnerIdAndContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractByOwnerIdAndContractIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useContractByOwnerIdAndContractIdQuery(baseOptions: Apollo.QueryHookOptions<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>(ContractByOwnerIdAndContractIdDocument, options);
      }
export function useContractByOwnerIdAndContractIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>(ContractByOwnerIdAndContractIdDocument, options);
        }
export function useContractByOwnerIdAndContractIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>(ContractByOwnerIdAndContractIdDocument, options);
        }
export type ContractByOwnerIdAndContractIdQueryHookResult = ReturnType<typeof useContractByOwnerIdAndContractIdQuery>;
export type ContractByOwnerIdAndContractIdLazyQueryHookResult = ReturnType<typeof useContractByOwnerIdAndContractIdLazyQuery>;
export type ContractByOwnerIdAndContractIdSuspenseQueryHookResult = ReturnType<typeof useContractByOwnerIdAndContractIdSuspenseQuery>;
export type ContractByOwnerIdAndContractIdQueryResult = Apollo.QueryResult<ContractByOwnerIdAndContractIdQuery, ContractByOwnerIdAndContractIdQueryVariables>;
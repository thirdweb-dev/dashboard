import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractsByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
}>;


export type ContractsByOwnerIdQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ContractsByOwnerIdDocument = gql`
    query ContractsByOwnerId($ownerId: String!) {
  contract(
    where: {owner_id: {_eq: $ownerId}, _and: {deleted_at: {_is_null: false}}}
    order_by: {created_at: desc}
  ) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractsByOwnerIdQuery__
 *
 * To run a query within a React component, call `useContractsByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractsByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractsByOwnerIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useContractsByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>(ContractsByOwnerIdDocument, options);
      }
export function useContractsByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>(ContractsByOwnerIdDocument, options);
        }
export function useContractsByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>(ContractsByOwnerIdDocument, options);
        }
export type ContractsByOwnerIdQueryHookResult = ReturnType<typeof useContractsByOwnerIdQuery>;
export type ContractsByOwnerIdLazyQueryHookResult = ReturnType<typeof useContractsByOwnerIdLazyQuery>;
export type ContractsByOwnerIdSuspenseQueryHookResult = ReturnType<typeof useContractsByOwnerIdSuspenseQuery>;
export type ContractsByOwnerIdQueryResult = Apollo.QueryResult<ContractsByOwnerIdQuery, ContractsByOwnerIdQueryVariables>;
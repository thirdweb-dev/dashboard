import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
}>;


export type ContractByOwnerIdQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ContractByOwnerIdDocument = gql`
    query ContractByOwnerId($ownerId: String!) {
  contract(where: {owner_id: {_eq: $ownerId}}) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractByOwnerIdQuery__
 *
 * To run a query within a React component, call `useContractByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractByOwnerIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useContractByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>(ContractByOwnerIdDocument, options);
      }
export function useContractByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>(ContractByOwnerIdDocument, options);
        }
export function useContractByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>(ContractByOwnerIdDocument, options);
        }
export type ContractByOwnerIdQueryHookResult = ReturnType<typeof useContractByOwnerIdQuery>;
export type ContractByOwnerIdLazyQueryHookResult = ReturnType<typeof useContractByOwnerIdLazyQuery>;
export type ContractByOwnerIdSuspenseQueryHookResult = ReturnType<typeof useContractByOwnerIdSuspenseQuery>;
export type ContractByOwnerIdQueryResult = Apollo.QueryResult<ContractByOwnerIdQuery, ContractByOwnerIdQueryVariables>;
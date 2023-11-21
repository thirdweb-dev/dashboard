import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractByOwnerIdAndDisplayNameQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
  displayName: Types.Scalars['String']['input'];
}>;


export type ContractByOwnerIdAndDisplayNameQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const ContractByOwnerIdAndDisplayNameDocument = gql`
    query ContractByOwnerIdAndDisplayName($ownerId: String!, $displayName: String!) {
  contract(where: {owner_id: {_eq: $ownerId}, display_name: {_eq: $displayName}}) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractByOwnerIdAndDisplayNameQuery__
 *
 * To run a query within a React component, call `useContractByOwnerIdAndDisplayNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractByOwnerIdAndDisplayNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractByOwnerIdAndDisplayNameQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useContractByOwnerIdAndDisplayNameQuery(baseOptions: Apollo.QueryHookOptions<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>(ContractByOwnerIdAndDisplayNameDocument, options);
      }
export function useContractByOwnerIdAndDisplayNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>(ContractByOwnerIdAndDisplayNameDocument, options);
        }
export function useContractByOwnerIdAndDisplayNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>(ContractByOwnerIdAndDisplayNameDocument, options);
        }
export type ContractByOwnerIdAndDisplayNameQueryHookResult = ReturnType<typeof useContractByOwnerIdAndDisplayNameQuery>;
export type ContractByOwnerIdAndDisplayNameLazyQueryHookResult = ReturnType<typeof useContractByOwnerIdAndDisplayNameLazyQuery>;
export type ContractByOwnerIdAndDisplayNameSuspenseQueryHookResult = ReturnType<typeof useContractByOwnerIdAndDisplayNameSuspenseQuery>;
export type ContractByOwnerIdAndDisplayNameQueryResult = Apollo.QueryResult<ContractByOwnerIdAndDisplayNameQuery, ContractByOwnerIdAndDisplayNameQueryVariables>;
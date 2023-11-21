import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractByIdQueryVariables = Types.Exact<{
  contractId: Types.Scalars['uuid']['input'];
}>;


export type ContractByIdQuery = { __typename?: 'query_root', contract_by_pk?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null };


export const ContractByIdDocument = gql`
    query ContractById($contractId: uuid!) {
  contract_by_pk(id: $contractId) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractByIdQuery__
 *
 * To run a query within a React component, call `useContractByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractByIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useContractByIdQuery(baseOptions: Apollo.QueryHookOptions<ContractByIdQuery, ContractByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractByIdQuery, ContractByIdQueryVariables>(ContractByIdDocument, options);
      }
export function useContractByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractByIdQuery, ContractByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractByIdQuery, ContractByIdQueryVariables>(ContractByIdDocument, options);
        }
export function useContractByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractByIdQuery, ContractByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractByIdQuery, ContractByIdQueryVariables>(ContractByIdDocument, options);
        }
export type ContractByIdQueryHookResult = ReturnType<typeof useContractByIdQuery>;
export type ContractByIdLazyQueryHookResult = ReturnType<typeof useContractByIdLazyQuery>;
export type ContractByIdSuspenseQueryHookResult = ReturnType<typeof useContractByIdSuspenseQuery>;
export type ContractByIdQueryResult = Apollo.QueryResult<ContractByIdQuery, ContractByIdQueryVariables>;
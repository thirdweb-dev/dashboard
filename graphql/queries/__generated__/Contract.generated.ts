import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type ContractQuery = { __typename?: 'query_root', contract_by_pk?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null };


export const ContractDocument = gql`
    query Contract($id: uuid!) {
  contract_by_pk(id: $id) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useContractQuery__
 *
 * To run a query within a React component, call `useContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContractQuery(baseOptions: Apollo.QueryHookOptions<ContractQuery, ContractQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractQuery, ContractQueryVariables>(ContractDocument, options);
      }
export function useContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractQuery, ContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractQuery, ContractQueryVariables>(ContractDocument, options);
        }
export function useContractSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractQuery, ContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractQuery, ContractQueryVariables>(ContractDocument, options);
        }
export type ContractQueryHookResult = ReturnType<typeof useContractQuery>;
export type ContractLazyQueryHookResult = ReturnType<typeof useContractLazyQuery>;
export type ContractSuspenseQueryHookResult = ReturnType<typeof useContractSuspenseQuery>;
export type ContractQueryResult = Apollo.QueryResult<ContractQuery, ContractQueryVariables>;
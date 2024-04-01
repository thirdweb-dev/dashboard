import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FiatPayoutEnabledContractsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FiatPayoutEnabledContractsQuery = { __typename?: 'query_root', contract: Array<{ __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean }> };


export const FiatPayoutEnabledContractsDocument = gql`
    query FiatPayoutEnabledContracts {
  contract(
    where: {is_fiat_payout_enabled: {_eq: true}, _and: {deleted_at: {_eq: "infinity"}}}
  ) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useFiatPayoutEnabledContractsQuery__
 *
 * To run a query within a React component, call `useFiatPayoutEnabledContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiatPayoutEnabledContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiatPayoutEnabledContractsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFiatPayoutEnabledContractsQuery(baseOptions?: Apollo.QueryHookOptions<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>(FiatPayoutEnabledContractsDocument, options);
      }
export function useFiatPayoutEnabledContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>(FiatPayoutEnabledContractsDocument, options);
        }
export function useFiatPayoutEnabledContractsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>(FiatPayoutEnabledContractsDocument, options);
        }
export type FiatPayoutEnabledContractsQueryHookResult = ReturnType<typeof useFiatPayoutEnabledContractsQuery>;
export type FiatPayoutEnabledContractsLazyQueryHookResult = ReturnType<typeof useFiatPayoutEnabledContractsLazyQuery>;
export type FiatPayoutEnabledContractsSuspenseQueryHookResult = ReturnType<typeof useFiatPayoutEnabledContractsSuspenseQuery>;
export type FiatPayoutEnabledContractsQueryResult = Apollo.QueryResult<FiatPayoutEnabledContractsQuery, FiatPayoutEnabledContractsQueryVariables>;
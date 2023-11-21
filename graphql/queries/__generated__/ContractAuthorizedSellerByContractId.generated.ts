import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractAuthorizedSellerFragmentDoc } from '../../fragments/__generated__/ContractAuthorizedSeller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContractAuthorizedSellerByContractIdQueryVariables = Types.Exact<{
  contractId: Types.Scalars['uuid']['input'];
}>;


export type ContractAuthorizedSellerByContractIdQuery = { __typename?: 'query_root', contract_authorized_seller: Array<{ __typename?: 'contract_authorized_seller', id: any, contract_id: any, authorized_seller_id: string, granted_at: any, revoked_at?: any | null }> };


export const ContractAuthorizedSellerByContractIdDocument = gql`
    query ContractAuthorizedSellerByContractId($contractId: uuid!) {
  contract_authorized_seller(where: {contract_id: {_eq: $contractId}}) {
    ...ContractAuthorizedSeller
  }
}
    ${ContractAuthorizedSellerFragmentDoc}`;

/**
 * __useContractAuthorizedSellerByContractIdQuery__
 *
 * To run a query within a React component, call `useContractAuthorizedSellerByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractAuthorizedSellerByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractAuthorizedSellerByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useContractAuthorizedSellerByContractIdQuery(baseOptions: Apollo.QueryHookOptions<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>(ContractAuthorizedSellerByContractIdDocument, options);
      }
export function useContractAuthorizedSellerByContractIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>(ContractAuthorizedSellerByContractIdDocument, options);
        }
export function useContractAuthorizedSellerByContractIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>(ContractAuthorizedSellerByContractIdDocument, options);
        }
export type ContractAuthorizedSellerByContractIdQueryHookResult = ReturnType<typeof useContractAuthorizedSellerByContractIdQuery>;
export type ContractAuthorizedSellerByContractIdLazyQueryHookResult = ReturnType<typeof useContractAuthorizedSellerByContractIdLazyQuery>;
export type ContractAuthorizedSellerByContractIdSuspenseQueryHookResult = ReturnType<typeof useContractAuthorizedSellerByContractIdSuspenseQuery>;
export type ContractAuthorizedSellerByContractIdQueryResult = Apollo.QueryResult<ContractAuthorizedSellerByContractIdQuery, ContractAuthorizedSellerByContractIdQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { PaperAccessKeyFragmentDoc } from '../../fragments/__generated__/PaperAccessKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PaperAccessKeyByContractAddressQueryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String']['input'];
  ownerId: Types.Scalars['String']['input'];
}>;


export type PaperAccessKeyByContractAddressQuery = { __typename?: 'query_root', paper_access_key: Array<{ __typename?: 'paper_access_key', id: any, public_key: string, created_at: any, revoked_at: any, owner_id: string, checkout_id?: any | null }> };


export const PaperAccessKeyByContractAddressDocument = gql`
    query PaperAccessKeyByContractAddress($contractAddress: String!, $ownerId: String!) {
  paper_access_key(
    where: {contract_address: {_eq: $contractAddress}, revoked_at: {_gte: "now()"}, owner_id: {_eq: $ownerId}}
  ) {
    ...PaperAccessKey
  }
}
    ${PaperAccessKeyFragmentDoc}`;

/**
 * __usePaperAccessKeyByContractAddressQuery__
 *
 * To run a query within a React component, call `usePaperAccessKeyByContractAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaperAccessKeyByContractAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaperAccessKeyByContractAddressQuery({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function usePaperAccessKeyByContractAddressQuery(baseOptions: Apollo.QueryHookOptions<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>(PaperAccessKeyByContractAddressDocument, options);
      }
export function usePaperAccessKeyByContractAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>(PaperAccessKeyByContractAddressDocument, options);
        }
export function usePaperAccessKeyByContractAddressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>(PaperAccessKeyByContractAddressDocument, options);
        }
export type PaperAccessKeyByContractAddressQueryHookResult = ReturnType<typeof usePaperAccessKeyByContractAddressQuery>;
export type PaperAccessKeyByContractAddressLazyQueryHookResult = ReturnType<typeof usePaperAccessKeyByContractAddressLazyQuery>;
export type PaperAccessKeyByContractAddressSuspenseQueryHookResult = ReturnType<typeof usePaperAccessKeyByContractAddressSuspenseQuery>;
export type PaperAccessKeyByContractAddressQueryResult = Apollo.QueryResult<PaperAccessKeyByContractAddressQuery, PaperAccessKeyByContractAddressQueryVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { PaperAccessKeyFragmentDoc } from '../../fragments/__generated__/PaperAccessKey.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String']['input'];
  ownerId: Types.Scalars['String']['input'];
}>;


export type PaperAccessKeyByContractAddressWithPrivateKeyQuery = { __typename?: 'query_root', paper_access_key: Array<{ __typename?: 'paper_access_key', hashed_private_key: string, id: any, public_key: string, created_at: any, revoked_at: any, owner_id: string, checkout_id?: any | null }> };


export const PaperAccessKeyByContractAddressWithPrivateKeyDocument = gql`
    query PaperAccessKeyByContractAddressWithPrivateKey($contractAddress: String!, $ownerId: String!) {
  paper_access_key(
    where: {contract_address: {_eq: $contractAddress}, revoked_at: {_gte: "now()"}, owner_id: {_eq: $ownerId}}
  ) {
    ...PaperAccessKey
    hashed_private_key
  }
}
    ${PaperAccessKeyFragmentDoc}`;

/**
 * __usePaperAccessKeyByContractAddressWithPrivateKeyQuery__
 *
 * To run a query within a React component, call `usePaperAccessKeyByContractAddressWithPrivateKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaperAccessKeyByContractAddressWithPrivateKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaperAccessKeyByContractAddressWithPrivateKeyQuery({
 *   variables: {
 *      contractAddress: // value for 'contractAddress'
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function usePaperAccessKeyByContractAddressWithPrivateKeyQuery(baseOptions: Apollo.QueryHookOptions<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>(PaperAccessKeyByContractAddressWithPrivateKeyDocument, options);
      }
export function usePaperAccessKeyByContractAddressWithPrivateKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>(PaperAccessKeyByContractAddressWithPrivateKeyDocument, options);
        }
export function usePaperAccessKeyByContractAddressWithPrivateKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>(PaperAccessKeyByContractAddressWithPrivateKeyDocument, options);
        }
export type PaperAccessKeyByContractAddressWithPrivateKeyQueryHookResult = ReturnType<typeof usePaperAccessKeyByContractAddressWithPrivateKeyQuery>;
export type PaperAccessKeyByContractAddressWithPrivateKeyLazyQueryHookResult = ReturnType<typeof usePaperAccessKeyByContractAddressWithPrivateKeyLazyQuery>;
export type PaperAccessKeyByContractAddressWithPrivateKeySuspenseQueryHookResult = ReturnType<typeof usePaperAccessKeyByContractAddressWithPrivateKeySuspenseQuery>;
export type PaperAccessKeyByContractAddressWithPrivateKeyQueryResult = Apollo.QueryResult<PaperAccessKeyByContractAddressWithPrivateKeyQuery, PaperAccessKeyByContractAddressWithPrivateKeyQueryVariables>;
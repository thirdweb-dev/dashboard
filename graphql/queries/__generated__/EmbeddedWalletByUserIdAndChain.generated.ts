import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { EmbeddedWalletFragmentDoc } from '../../fragments/__generated__/EmbeddedWallet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EmbeddedWalletByUserIdAndChainQueryVariables = Types.Exact<{
  userId: Types.Scalars['uuid']['input'];
  chain: Types.Scalars['String']['input'];
}>;


export type EmbeddedWalletByUserIdAndChainQuery = { __typename?: 'query_root', embedded_wallet: Array<{ __typename?: 'embedded_wallet', chain: string, id: any, address: string, wallet_user_id: any }> };


export const EmbeddedWalletByUserIdAndChainDocument = gql`
    query EmbeddedWalletByUserIdAndChain($userId: uuid!, $chain: String!) {
  embedded_wallet(where: {wallet_user_id: {_eq: $userId}, chain: {_eq: $chain}}) {
    ...EmbeddedWallet
  }
}
    ${EmbeddedWalletFragmentDoc}`;

/**
 * __useEmbeddedWalletByUserIdAndChainQuery__
 *
 * To run a query within a React component, call `useEmbeddedWalletByUserIdAndChainQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmbeddedWalletByUserIdAndChainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmbeddedWalletByUserIdAndChainQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      chain: // value for 'chain'
 *   },
 * });
 */
export function useEmbeddedWalletByUserIdAndChainQuery(baseOptions: Apollo.QueryHookOptions<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>(EmbeddedWalletByUserIdAndChainDocument, options);
      }
export function useEmbeddedWalletByUserIdAndChainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>(EmbeddedWalletByUserIdAndChainDocument, options);
        }
export function useEmbeddedWalletByUserIdAndChainSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>(EmbeddedWalletByUserIdAndChainDocument, options);
        }
export type EmbeddedWalletByUserIdAndChainQueryHookResult = ReturnType<typeof useEmbeddedWalletByUserIdAndChainQuery>;
export type EmbeddedWalletByUserIdAndChainLazyQueryHookResult = ReturnType<typeof useEmbeddedWalletByUserIdAndChainLazyQuery>;
export type EmbeddedWalletByUserIdAndChainSuspenseQueryHookResult = ReturnType<typeof useEmbeddedWalletByUserIdAndChainSuspenseQuery>;
export type EmbeddedWalletByUserIdAndChainQueryResult = Apollo.QueryResult<EmbeddedWalletByUserIdAndChainQuery, EmbeddedWalletByUserIdAndChainQueryVariables>;
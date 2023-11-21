import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ShareFragmentDoc } from '../../fragments/__generated__/Share.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharesByEmbeddedWalletIdAndTypeQueryVariables = Types.Exact<{
  embeddedWalletId: Types.Scalars['uuid']['input'];
  types: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type SharesByEmbeddedWalletIdAndTypeQuery = { __typename?: 'query_root', share: Array<{ __typename?: 'share', type: string, id: any, encryption_password?: string | null, encrypted_value?: string | null, wallet_user_id: any, embedded_wallet_id: any }> };


export const SharesByEmbeddedWalletIdAndTypeDocument = gql`
    query SharesByEmbeddedWalletIdAndType($embeddedWalletId: uuid!, $types: [String!]!) {
  share(
    where: {embedded_wallet_id: {_eq: $embeddedWalletId}, type: {_in: $types}}
  ) {
    ...Share
  }
}
    ${ShareFragmentDoc}`;

/**
 * __useSharesByEmbeddedWalletIdAndTypeQuery__
 *
 * To run a query within a React component, call `useSharesByEmbeddedWalletIdAndTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharesByEmbeddedWalletIdAndTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharesByEmbeddedWalletIdAndTypeQuery({
 *   variables: {
 *      embeddedWalletId: // value for 'embeddedWalletId'
 *      types: // value for 'types'
 *   },
 * });
 */
export function useSharesByEmbeddedWalletIdAndTypeQuery(baseOptions: Apollo.QueryHookOptions<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>(SharesByEmbeddedWalletIdAndTypeDocument, options);
      }
export function useSharesByEmbeddedWalletIdAndTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>(SharesByEmbeddedWalletIdAndTypeDocument, options);
        }
export function useSharesByEmbeddedWalletIdAndTypeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>(SharesByEmbeddedWalletIdAndTypeDocument, options);
        }
export type SharesByEmbeddedWalletIdAndTypeQueryHookResult = ReturnType<typeof useSharesByEmbeddedWalletIdAndTypeQuery>;
export type SharesByEmbeddedWalletIdAndTypeLazyQueryHookResult = ReturnType<typeof useSharesByEmbeddedWalletIdAndTypeLazyQuery>;
export type SharesByEmbeddedWalletIdAndTypeSuspenseQueryHookResult = ReturnType<typeof useSharesByEmbeddedWalletIdAndTypeSuspenseQuery>;
export type SharesByEmbeddedWalletIdAndTypeQueryResult = Apollo.QueryResult<SharesByEmbeddedWalletIdAndTypeQuery, SharesByEmbeddedWalletIdAndTypeQueryVariables>;
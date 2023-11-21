import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WebhookFragmentDoc } from '../../fragments/__generated__/Webhook.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WebhooksBySellerIdQueryVariables = Types.Exact<{
  sellerId: Types.Scalars['String']['input'];
}>;


export type WebhooksBySellerIdQuery = { __typename?: 'query_root', webhook: Array<{ __typename?: 'webhook', id: any, seller_id: string, url: string, is_production: boolean, created_at: any, deleted_at?: any | null }> };


export const WebhooksBySellerIdDocument = gql`
    query WebhooksBySellerId($sellerId: String!) {
  webhook(
    where: {seller_id: {_eq: $sellerId}, deleted_at: {_is_null: true}}
    order_by: {created_at: asc}
  ) {
    ...Webhook
  }
}
    ${WebhookFragmentDoc}`;

/**
 * __useWebhooksBySellerIdQuery__
 *
 * To run a query within a React component, call `useWebhooksBySellerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebhooksBySellerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebhooksBySellerIdQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useWebhooksBySellerIdQuery(baseOptions: Apollo.QueryHookOptions<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>(WebhooksBySellerIdDocument, options);
      }
export function useWebhooksBySellerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>(WebhooksBySellerIdDocument, options);
        }
export function useWebhooksBySellerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>(WebhooksBySellerIdDocument, options);
        }
export type WebhooksBySellerIdQueryHookResult = ReturnType<typeof useWebhooksBySellerIdQuery>;
export type WebhooksBySellerIdLazyQueryHookResult = ReturnType<typeof useWebhooksBySellerIdLazyQuery>;
export type WebhooksBySellerIdSuspenseQueryHookResult = ReturnType<typeof useWebhooksBySellerIdSuspenseQuery>;
export type WebhooksBySellerIdQueryResult = Apollo.QueryResult<WebhooksBySellerIdQuery, WebhooksBySellerIdQueryVariables>;
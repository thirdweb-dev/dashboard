import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WebhookEventFragmentDoc } from '../../fragments/__generated__/WebhookEvent.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WebhookEventsByWebhookIdQueryVariables = Types.Exact<{
  webhookId: Types.Scalars['uuid']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type WebhookEventsByWebhookIdQuery = { __typename?: 'query_root', webhook_event: Array<{ __typename?: 'webhook_event', id: any, created_at: any, webhook_id: any, request_body: string, response_body: string, status: any, type: string, seller_id: string }> };


export const WebhookEventsByWebhookIdDocument = gql`
    query WebhookEventsByWebhookId($webhookId: uuid!, $limit: Int = 20) {
  webhook_event(
    where: {webhook_id: {_eq: $webhookId}}
    order_by: {created_at: desc}
    limit: $limit
  ) {
    ...WebhookEvent
  }
}
    ${WebhookEventFragmentDoc}`;

/**
 * __useWebhookEventsByWebhookIdQuery__
 *
 * To run a query within a React component, call `useWebhookEventsByWebhookIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebhookEventsByWebhookIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebhookEventsByWebhookIdQuery({
 *   variables: {
 *      webhookId: // value for 'webhookId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useWebhookEventsByWebhookIdQuery(baseOptions: Apollo.QueryHookOptions<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>(WebhookEventsByWebhookIdDocument, options);
      }
export function useWebhookEventsByWebhookIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>(WebhookEventsByWebhookIdDocument, options);
        }
export function useWebhookEventsByWebhookIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>(WebhookEventsByWebhookIdDocument, options);
        }
export type WebhookEventsByWebhookIdQueryHookResult = ReturnType<typeof useWebhookEventsByWebhookIdQuery>;
export type WebhookEventsByWebhookIdLazyQueryHookResult = ReturnType<typeof useWebhookEventsByWebhookIdLazyQuery>;
export type WebhookEventsByWebhookIdSuspenseQueryHookResult = ReturnType<typeof useWebhookEventsByWebhookIdSuspenseQuery>;
export type WebhookEventsByWebhookIdQueryResult = Apollo.QueryResult<WebhookEventsByWebhookIdQuery, WebhookEventsByWebhookIdQueryVariables>;
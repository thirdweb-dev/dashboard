import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WebhookFragmentDoc } from '../../fragments/__generated__/Webhook.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllWebhooksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllWebhooksQuery = { __typename?: 'query_root', webhook: Array<{ __typename?: 'webhook', id: any, seller_id: string, url: string, is_production: boolean, created_at: any, deleted_at?: any | null }> };


export const GetAllWebhooksDocument = gql`
    query GetAllWebhooks {
  webhook {
    ...Webhook
  }
}
    ${WebhookFragmentDoc}`;

/**
 * __useGetAllWebhooksQuery__
 *
 * To run a query within a React component, call `useGetAllWebhooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWebhooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWebhooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWebhooksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>(GetAllWebhooksDocument, options);
      }
export function useGetAllWebhooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>(GetAllWebhooksDocument, options);
        }
export function useGetAllWebhooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>(GetAllWebhooksDocument, options);
        }
export type GetAllWebhooksQueryHookResult = ReturnType<typeof useGetAllWebhooksQuery>;
export type GetAllWebhooksLazyQueryHookResult = ReturnType<typeof useGetAllWebhooksLazyQuery>;
export type GetAllWebhooksSuspenseQueryHookResult = ReturnType<typeof useGetAllWebhooksSuspenseQuery>;
export type GetAllWebhooksQueryResult = Apollo.QueryResult<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>;
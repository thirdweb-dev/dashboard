import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WebhookEventFragmentDoc } from '../../fragments/__generated__/WebhookEvent.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertWebhookEventMutationVariables = Types.Exact<{
  object: Types.Webhook_Event_Insert_Input;
}>;


export type InsertWebhookEventMutation = { __typename?: 'mutation_root', insert_webhook_event_one?: { __typename?: 'webhook_event', id: any, created_at: any, webhook_id: any, request_body: string, response_body: string, status: any, type: string, seller_id: string } | null };


export const InsertWebhookEventDocument = gql`
    mutation InsertWebhookEvent($object: webhook_event_insert_input!) {
  insert_webhook_event_one(object: $object) {
    ...WebhookEvent
  }
}
    ${WebhookEventFragmentDoc}`;
export type InsertWebhookEventMutationFn = Apollo.MutationFunction<InsertWebhookEventMutation, InsertWebhookEventMutationVariables>;

/**
 * __useInsertWebhookEventMutation__
 *
 * To run a mutation, you first call `useInsertWebhookEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWebhookEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWebhookEventMutation, { data, loading, error }] = useInsertWebhookEventMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertWebhookEventMutation(baseOptions?: Apollo.MutationHookOptions<InsertWebhookEventMutation, InsertWebhookEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertWebhookEventMutation, InsertWebhookEventMutationVariables>(InsertWebhookEventDocument, options);
      }
export type InsertWebhookEventMutationHookResult = ReturnType<typeof useInsertWebhookEventMutation>;
export type InsertWebhookEventMutationResult = Apollo.MutationResult<InsertWebhookEventMutation>;
export type InsertWebhookEventMutationOptions = Apollo.BaseMutationOptions<InsertWebhookEventMutation, InsertWebhookEventMutationVariables>;
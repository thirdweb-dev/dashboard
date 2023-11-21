import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WebhookFragmentDoc } from '../../fragments/__generated__/Webhook.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertWebhookMutationVariables = Types.Exact<{
  object: Types.Webhook_Insert_Input;
}>;


export type InsertWebhookMutation = { __typename?: 'mutation_root', insert_webhook_one?: { __typename?: 'webhook', id: any, seller_id: string, url: string, is_production: boolean, created_at: any, deleted_at?: any | null } | null };


export const InsertWebhookDocument = gql`
    mutation InsertWebhook($object: webhook_insert_input!) {
  insert_webhook_one(object: $object) {
    ...Webhook
  }
}
    ${WebhookFragmentDoc}`;
export type InsertWebhookMutationFn = Apollo.MutationFunction<InsertWebhookMutation, InsertWebhookMutationVariables>;

/**
 * __useInsertWebhookMutation__
 *
 * To run a mutation, you first call `useInsertWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWebhookMutation, { data, loading, error }] = useInsertWebhookMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertWebhookMutation(baseOptions?: Apollo.MutationHookOptions<InsertWebhookMutation, InsertWebhookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertWebhookMutation, InsertWebhookMutationVariables>(InsertWebhookDocument, options);
      }
export type InsertWebhookMutationHookResult = ReturnType<typeof useInsertWebhookMutation>;
export type InsertWebhookMutationResult = Apollo.MutationResult<InsertWebhookMutation>;
export type InsertWebhookMutationOptions = Apollo.BaseMutationOptions<InsertWebhookMutation, InsertWebhookMutationVariables>;
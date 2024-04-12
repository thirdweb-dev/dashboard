import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { WebhookFragmentDoc } from '../../fragments/__generated__/Webhook.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateWebhookMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  webhookValue: Types.Webhook_Set_Input;
}>;


export type UpdateWebhookMutation = { __typename?: 'mutation_root', update_webhook_by_pk?: { __typename?: 'webhook', id: any, seller_id: string, url: string, is_production: boolean, created_at: any, deleted_at?: any | null } | null };


export const UpdateWebhookDocument = gql`
    mutation UpdateWebhook($id: uuid!, $webhookValue: webhook_set_input!) {
  update_webhook_by_pk(pk_columns: {id: $id}, _set: $webhookValue) {
    ...Webhook
  }
}
    ${WebhookFragmentDoc}`;
export type UpdateWebhookMutationFn = Apollo.MutationFunction<UpdateWebhookMutation, UpdateWebhookMutationVariables>;

/**
 * __useUpdateWebhookMutation__
 *
 * To run a mutation, you first call `useUpdateWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWebhookMutation, { data, loading, error }] = useUpdateWebhookMutation({
 *   variables: {
 *      id: // value for 'id'
 *      webhookValue: // value for 'webhookValue'
 *   },
 * });
 */
export function useUpdateWebhookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWebhookMutation, UpdateWebhookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWebhookMutation, UpdateWebhookMutationVariables>(UpdateWebhookDocument, options);
      }
export type UpdateWebhookMutationHookResult = ReturnType<typeof useUpdateWebhookMutation>;
export type UpdateWebhookMutationResult = Apollo.MutationResult<UpdateWebhookMutation>;
export type UpdateWebhookMutationOptions = Apollo.BaseMutationOptions<UpdateWebhookMutation, UpdateWebhookMutationVariables>;
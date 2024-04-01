import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BuyerFragmentDoc } from '../../fragments/__generated__/Buyer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertBuyerMutationVariables = Types.Exact<{
  buyer: Types.Buyer_Insert_Input;
}>;


export type UpsertBuyerMutation = { __typename?: 'mutation_root', insert_buyer_one?: { __typename?: 'buyer', id: string, email: string, stripe_customer_id?: string | null, stripe_testmode_customer_id?: string | null, stripe_verification_session_id?: string | null, created_at?: any | null, stripe_testmode_verification_session_id?: string | null, is_paper_wallet?: boolean | null } | null };


export const UpsertBuyerDocument = gql`
    mutation UpsertBuyer($buyer: buyer_insert_input!) {
  insert_buyer_one(object: $buyer, on_conflict: {constraint: buyer_pkey}) {
    ...Buyer
  }
}
    ${BuyerFragmentDoc}`;
export type UpsertBuyerMutationFn = Apollo.MutationFunction<UpsertBuyerMutation, UpsertBuyerMutationVariables>;

/**
 * __useUpsertBuyerMutation__
 *
 * To run a mutation, you first call `useUpsertBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertBuyerMutation, { data, loading, error }] = useUpsertBuyerMutation({
 *   variables: {
 *      buyer: // value for 'buyer'
 *   },
 * });
 */
export function useUpsertBuyerMutation(baseOptions?: Apollo.MutationHookOptions<UpsertBuyerMutation, UpsertBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertBuyerMutation, UpsertBuyerMutationVariables>(UpsertBuyerDocument, options);
      }
export type UpsertBuyerMutationHookResult = ReturnType<typeof useUpsertBuyerMutation>;
export type UpsertBuyerMutationResult = Apollo.MutationResult<UpsertBuyerMutation>;
export type UpsertBuyerMutationOptions = Apollo.BaseMutationOptions<UpsertBuyerMutation, UpsertBuyerMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { AirdropFragmentDoc } from '../../fragments/__generated__/Airdrop.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertAirdropMutationVariables = Types.Exact<{
  object: Types.Airdrop_Insert_Input;
}>;


export type UpsertAirdropMutation = { __typename?: 'mutation_root', insert_airdrop_one?: { __typename?: 'airdrop', id: any, wallet_address?: string | null, email?: string | null, status: string, transaction_id: any, contract_id?: any | null, created_at: any, updated_at: any, contract?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null } | null };


export const UpsertAirdropDocument = gql`
    mutation UpsertAirdrop($object: airdrop_insert_input!) {
  insert_airdrop_one(
    object: $object
    on_conflict: {constraint: airdrop_pkey, update_columns: [wallet_address, status, transaction_id, updated_at]}
  ) {
    ...Airdrop
  }
}
    ${AirdropFragmentDoc}`;
export type UpsertAirdropMutationFn = Apollo.MutationFunction<UpsertAirdropMutation, UpsertAirdropMutationVariables>;

/**
 * __useUpsertAirdropMutation__
 *
 * To run a mutation, you first call `useUpsertAirdropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertAirdropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertAirdropMutation, { data, loading, error }] = useUpsertAirdropMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useUpsertAirdropMutation(baseOptions?: Apollo.MutationHookOptions<UpsertAirdropMutation, UpsertAirdropMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertAirdropMutation, UpsertAirdropMutationVariables>(UpsertAirdropDocument, options);
      }
export type UpsertAirdropMutationHookResult = ReturnType<typeof useUpsertAirdropMutation>;
export type UpsertAirdropMutationResult = Apollo.MutationResult<UpsertAirdropMutation>;
export type UpsertAirdropMutationOptions = Apollo.BaseMutationOptions<UpsertAirdropMutation, UpsertAirdropMutationVariables>;
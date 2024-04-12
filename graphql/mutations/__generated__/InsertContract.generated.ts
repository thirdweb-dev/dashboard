import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { BaseContractFragmentDoc } from '../../fragments/__generated__/BaseContract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertContractMutationVariables = Types.Exact<{
  contract: Types.Contract_Insert_Input;
}>;


export type InsertContractMutation = { __typename?: 'mutation_root', insert_contract_one?: { __typename?: 'contract', id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null };


export const InsertContractDocument = gql`
    mutation InsertContract($contract: contract_insert_input!) {
  insert_contract_one(object: $contract) {
    ...BaseContract
  }
}
    ${BaseContractFragmentDoc}`;
export type InsertContractMutationFn = Apollo.MutationFunction<InsertContractMutation, InsertContractMutationVariables>;

/**
 * __useInsertContractMutation__
 *
 * To run a mutation, you first call `useInsertContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertContractMutation, { data, loading, error }] = useInsertContractMutation({
 *   variables: {
 *      contract: // value for 'contract'
 *   },
 * });
 */
export function useInsertContractMutation(baseOptions?: Apollo.MutationHookOptions<InsertContractMutation, InsertContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertContractMutation, InsertContractMutationVariables>(InsertContractDocument, options);
      }
export type InsertContractMutationHookResult = ReturnType<typeof useInsertContractMutation>;
export type InsertContractMutationResult = Apollo.MutationResult<InsertContractMutation>;
export type InsertContractMutationOptions = Apollo.BaseMutationOptions<InsertContractMutation, InsertContractMutationVariables>;
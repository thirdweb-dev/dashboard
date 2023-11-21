import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../../fragments/__generated__/Contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateContractMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  value: Types.Contract_Set_Input;
}>;


export type UpdateContractMutation = { __typename?: 'mutation_root', update_contract_by_pk?: { __typename?: 'contract', definition: any, id: any, display_name: string, address: string, chain: string, type: string, created_at: any, deleted_at: any, owner_id: string, is_created_by_contract_deployer: boolean, secondary_sales: boolean, is_fiat_payout_enabled: boolean, is_paper_managed: boolean, is_airdrop: boolean } | null };


export const UpdateContractDocument = gql`
    mutation UpdateContract($id: uuid!, $value: contract_set_input!) {
  update_contract_by_pk(pk_columns: {id: $id}, _set: $value) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;
export type UpdateContractMutationFn = Apollo.MutationFunction<UpdateContractMutation, UpdateContractMutationVariables>;

/**
 * __useUpdateContractMutation__
 *
 * To run a mutation, you first call `useUpdateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractMutation, { data, loading, error }] = useUpdateContractMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateContractMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContractMutation, UpdateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContractMutation, UpdateContractMutationVariables>(UpdateContractDocument, options);
      }
export type UpdateContractMutationHookResult = ReturnType<typeof useUpdateContractMutation>;
export type UpdateContractMutationResult = Apollo.MutationResult<UpdateContractMutation>;
export type UpdateContractMutationOptions = Apollo.BaseMutationOptions<UpdateContractMutation, UpdateContractMutationVariables>;
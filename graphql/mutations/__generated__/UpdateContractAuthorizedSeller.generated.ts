import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractAuthorizedSellerFragmentDoc } from '../../fragments/__generated__/ContractAuthorizedSeller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateContractAuthorizedSellerMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  value: Types.Contract_Authorized_Seller_Set_Input;
}>;


export type UpdateContractAuthorizedSellerMutation = { __typename?: 'mutation_root', update_contract_authorized_seller_by_pk?: { __typename?: 'contract_authorized_seller', id: any, contract_id: any, authorized_seller_id: string, granted_at: any, revoked_at?: any | null } | null };


export const UpdateContractAuthorizedSellerDocument = gql`
    mutation UpdateContractAuthorizedSeller($id: uuid!, $value: contract_authorized_seller_set_input!) {
  update_contract_authorized_seller_by_pk(pk_columns: {id: $id}, _set: $value) {
    ...ContractAuthorizedSeller
  }
}
    ${ContractAuthorizedSellerFragmentDoc}`;
export type UpdateContractAuthorizedSellerMutationFn = Apollo.MutationFunction<UpdateContractAuthorizedSellerMutation, UpdateContractAuthorizedSellerMutationVariables>;

/**
 * __useUpdateContractAuthorizedSellerMutation__
 *
 * To run a mutation, you first call `useUpdateContractAuthorizedSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractAuthorizedSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractAuthorizedSellerMutation, { data, loading, error }] = useUpdateContractAuthorizedSellerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateContractAuthorizedSellerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContractAuthorizedSellerMutation, UpdateContractAuthorizedSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContractAuthorizedSellerMutation, UpdateContractAuthorizedSellerMutationVariables>(UpdateContractAuthorizedSellerDocument, options);
      }
export type UpdateContractAuthorizedSellerMutationHookResult = ReturnType<typeof useUpdateContractAuthorizedSellerMutation>;
export type UpdateContractAuthorizedSellerMutationResult = Apollo.MutationResult<UpdateContractAuthorizedSellerMutation>;
export type UpdateContractAuthorizedSellerMutationOptions = Apollo.BaseMutationOptions<UpdateContractAuthorizedSellerMutation, UpdateContractAuthorizedSellerMutationVariables>;
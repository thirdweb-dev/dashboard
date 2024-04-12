import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { ContractAuthorizedSellerFragmentDoc } from '../../fragments/__generated__/ContractAuthorizedSeller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertContractAuthorizedSellerMutationVariables = Types.Exact<{
  contractAuthorizedSeller: Types.Contract_Authorized_Seller_Insert_Input;
}>;


export type InsertContractAuthorizedSellerMutation = { __typename?: 'mutation_root', insert_contract_authorized_seller_one?: { __typename?: 'contract_authorized_seller', id: any, contract_id: any, authorized_seller_id: string, granted_at: any, revoked_at?: any | null } | null };


export const InsertContractAuthorizedSellerDocument = gql`
    mutation InsertContractAuthorizedSeller($contractAuthorizedSeller: contract_authorized_seller_insert_input!) {
  insert_contract_authorized_seller_one(object: $contractAuthorizedSeller) {
    ...ContractAuthorizedSeller
  }
}
    ${ContractAuthorizedSellerFragmentDoc}`;
export type InsertContractAuthorizedSellerMutationFn = Apollo.MutationFunction<InsertContractAuthorizedSellerMutation, InsertContractAuthorizedSellerMutationVariables>;

/**
 * __useInsertContractAuthorizedSellerMutation__
 *
 * To run a mutation, you first call `useInsertContractAuthorizedSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertContractAuthorizedSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertContractAuthorizedSellerMutation, { data, loading, error }] = useInsertContractAuthorizedSellerMutation({
 *   variables: {
 *      contractAuthorizedSeller: // value for 'contractAuthorizedSeller'
 *   },
 * });
 */
export function useInsertContractAuthorizedSellerMutation(baseOptions?: Apollo.MutationHookOptions<InsertContractAuthorizedSellerMutation, InsertContractAuthorizedSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertContractAuthorizedSellerMutation, InsertContractAuthorizedSellerMutationVariables>(InsertContractAuthorizedSellerDocument, options);
      }
export type InsertContractAuthorizedSellerMutationHookResult = ReturnType<typeof useInsertContractAuthorizedSellerMutation>;
export type InsertContractAuthorizedSellerMutationResult = Apollo.MutationResult<InsertContractAuthorizedSellerMutation>;
export type InsertContractAuthorizedSellerMutationOptions = Apollo.BaseMutationOptions<InsertContractAuthorizedSellerMutation, InsertContractAuthorizedSellerMutationVariables>;
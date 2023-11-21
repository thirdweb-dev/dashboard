import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertNewSellerMutationVariables = Types.Exact<{
  seller: Types.Seller_Insert_Input;
}>;


export type InsertNewSellerMutation = { __typename?: 'mutation_root', insert_seller_one?: { __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null } | null };


export const InsertNewSellerDocument = gql`
    mutation InsertNewSeller($seller: seller_insert_input!) {
  insert_seller_one(object: $seller) {
    ...Seller
  }
}
    ${SellerFragmentDoc}`;
export type InsertNewSellerMutationFn = Apollo.MutationFunction<InsertNewSellerMutation, InsertNewSellerMutationVariables>;

/**
 * __useInsertNewSellerMutation__
 *
 * To run a mutation, you first call `useInsertNewSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertNewSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertNewSellerMutation, { data, loading, error }] = useInsertNewSellerMutation({
 *   variables: {
 *      seller: // value for 'seller'
 *   },
 * });
 */
export function useInsertNewSellerMutation(baseOptions?: Apollo.MutationHookOptions<InsertNewSellerMutation, InsertNewSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertNewSellerMutation, InsertNewSellerMutationVariables>(InsertNewSellerDocument, options);
      }
export type InsertNewSellerMutationHookResult = ReturnType<typeof useInsertNewSellerMutation>;
export type InsertNewSellerMutationResult = Apollo.MutationResult<InsertNewSellerMutation>;
export type InsertNewSellerMutationOptions = Apollo.BaseMutationOptions<InsertNewSellerMutation, InsertNewSellerMutationVariables>;
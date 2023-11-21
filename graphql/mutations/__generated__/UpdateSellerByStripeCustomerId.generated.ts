import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSellerByStripeCustomerIdMutationVariables = Types.Exact<{
  stripe_customer_id: Types.Scalars['String']['input'];
  sellerValue: Types.Seller_Set_Input;
}>;


export type UpdateSellerByStripeCustomerIdMutation = { __typename?: 'mutation_root', update_seller?: { __typename?: 'seller_mutation_response', returning: Array<{ __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null }> } | null };


export const UpdateSellerByStripeCustomerIdDocument = gql`
    mutation UpdateSellerByStripeCustomerId($stripe_customer_id: String!, $sellerValue: seller_set_input!) {
  update_seller(
    where: {stripe_customer_id: {_eq: $stripe_customer_id}}
    _set: $sellerValue
  ) {
    returning {
      ...Seller
    }
  }
}
    ${SellerFragmentDoc}`;
export type UpdateSellerByStripeCustomerIdMutationFn = Apollo.MutationFunction<UpdateSellerByStripeCustomerIdMutation, UpdateSellerByStripeCustomerIdMutationVariables>;

/**
 * __useUpdateSellerByStripeCustomerIdMutation__
 *
 * To run a mutation, you first call `useUpdateSellerByStripeCustomerIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSellerByStripeCustomerIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSellerByStripeCustomerIdMutation, { data, loading, error }] = useUpdateSellerByStripeCustomerIdMutation({
 *   variables: {
 *      stripe_customer_id: // value for 'stripe_customer_id'
 *      sellerValue: // value for 'sellerValue'
 *   },
 * });
 */
export function useUpdateSellerByStripeCustomerIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSellerByStripeCustomerIdMutation, UpdateSellerByStripeCustomerIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSellerByStripeCustomerIdMutation, UpdateSellerByStripeCustomerIdMutationVariables>(UpdateSellerByStripeCustomerIdDocument, options);
      }
export type UpdateSellerByStripeCustomerIdMutationHookResult = ReturnType<typeof useUpdateSellerByStripeCustomerIdMutation>;
export type UpdateSellerByStripeCustomerIdMutationResult = Apollo.MutationResult<UpdateSellerByStripeCustomerIdMutation>;
export type UpdateSellerByStripeCustomerIdMutationOptions = Apollo.BaseMutationOptions<UpdateSellerByStripeCustomerIdMutation, UpdateSellerByStripeCustomerIdMutationVariables>;
import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CheckoutFragmentDoc } from '../../fragments/__generated__/Checkout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['String']['input'];
  offset: Types.Scalars['Int']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  contractChains: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type CheckoutByOwnerIdQuery = { __typename?: 'query_root', checkout_aggregate: { __typename?: 'checkout_aggregate', aggregate?: { __typename?: 'checkout_aggregate_fields', count: number } | null }, checkout: Array<{ __typename?: 'checkout', id: any, owner_id: string, contract_address: string, contract_type: string, contract_chain: string, collection_title: string, collection_description?: string | null, image_url?: string | null, success_callback_url?: string | null, cancel_callback_url?: string | null, created_at: any, deleted_at: any, price: any, hide_native_mint: boolean, hide_pay_with_card: boolean, hide_pay_with_crypto: boolean, hide_pay_with_bank: boolean, hide_pay_with_ideal: boolean, hide_connect_paper_wallet: boolean, hide_connect_external_wallet: boolean, mint_abi_function_name?: string | null, custom_abi: any, listing_id?: string | null, pack_id?: string | null, pack_address?: string | null, bundle_address?: string | null, brand_dark_mode: boolean, brand_button_shape: string, brand_color_scheme: string, token_id?: string | null, webhook_urls: any, float_wallet_addresses: any, require_verified_email: boolean, has_public_link: boolean, limit_per_wallet_address?: number | null, limit_per_transaction: number, card_payments_vendor?: string | null, redirect_after_payment: boolean, should_send_transfer_completed_email: boolean, seller_twitter_handle?: string | null, use_paper_access_key: boolean, generated_by_registered_contract: boolean, registered_contract_id?: any | null, contract_args?: any | null, post_purchase_message_markdown?: string | null, post_purchase_button_text?: string | null, sponsored_fees: boolean, thirdweb_client_id?: string | null, seller: { __typename?: 'seller', id: string, twitter_handle?: string | null, service_fee_bps: number, support_email?: string | null, email_display_name?: string | null, company_name?: string | null, company_logo_url?: string | null, fee_bearer: string, default_float_wallets?: any | null, deposit_amount_usd_cents?: number | null, has_production_access?: boolean | null, is_trusted?: boolean | null } }> };


export const CheckoutByOwnerIdDocument = gql`
    query CheckoutByOwnerId($ownerId: String!, $offset: Int!, $limit: Int = 10, $contractChains: [String!]!) {
  checkout_aggregate(
    where: {owner_id: {_eq: $ownerId}, deleted_at: {_gt: "now()"}, generated_by_registered_contract: {_eq: false}, contract_chain: {_in: $contractChains}}
  ) {
    aggregate {
      count
    }
  }
  checkout(
    where: {owner_id: {_eq: $ownerId}, deleted_at: {_gt: "now()"}, generated_by_registered_contract: {_eq: false}, contract_chain: {_in: $contractChains}}
    order_by: {created_at: desc}
    offset: $offset
    limit: $limit
  ) {
    ...Checkout
  }
}
    ${CheckoutFragmentDoc}`;

/**
 * __useCheckoutByOwnerIdQuery__
 *
 * To run a query within a React component, call `useCheckoutByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutByOwnerIdQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      contractChains: // value for 'contractChains'
 *   },
 * });
 */
export function useCheckoutByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>(CheckoutByOwnerIdDocument, options);
      }
export function useCheckoutByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>(CheckoutByOwnerIdDocument, options);
        }
export function useCheckoutByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>(CheckoutByOwnerIdDocument, options);
        }
export type CheckoutByOwnerIdQueryHookResult = ReturnType<typeof useCheckoutByOwnerIdQuery>;
export type CheckoutByOwnerIdLazyQueryHookResult = ReturnType<typeof useCheckoutByOwnerIdLazyQuery>;
export type CheckoutByOwnerIdSuspenseQueryHookResult = ReturnType<typeof useCheckoutByOwnerIdSuspenseQuery>;
export type CheckoutByOwnerIdQueryResult = Apollo.QueryResult<CheckoutByOwnerIdQuery, CheckoutByOwnerIdQueryVariables>;
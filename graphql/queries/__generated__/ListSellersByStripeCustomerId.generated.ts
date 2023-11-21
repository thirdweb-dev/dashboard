import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListSellersByStripeCustomerIdQueryVariables = Types.Exact<{
  stripeCustomerId: Types.Scalars['String']['input'];
}>;


export type ListSellersByStripeCustomerIdQuery = { __typename?: 'query_root', seller: Array<{ __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null }> };


export const ListSellersByStripeCustomerIdDocument = gql`
    query ListSellersByStripeCustomerId($stripeCustomerId: String!) {
  seller(where: {stripe_customer_id: {_eq: $stripeCustomerId}}) {
    ...Seller
  }
}
    ${SellerFragmentDoc}`;

/**
 * __useListSellersByStripeCustomerIdQuery__
 *
 * To run a query within a React component, call `useListSellersByStripeCustomerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSellersByStripeCustomerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSellersByStripeCustomerIdQuery({
 *   variables: {
 *      stripeCustomerId: // value for 'stripeCustomerId'
 *   },
 * });
 */
export function useListSellersByStripeCustomerIdQuery(baseOptions: Apollo.QueryHookOptions<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>(ListSellersByStripeCustomerIdDocument, options);
      }
export function useListSellersByStripeCustomerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>(ListSellersByStripeCustomerIdDocument, options);
        }
export function useListSellersByStripeCustomerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>(ListSellersByStripeCustomerIdDocument, options);
        }
export type ListSellersByStripeCustomerIdQueryHookResult = ReturnType<typeof useListSellersByStripeCustomerIdQuery>;
export type ListSellersByStripeCustomerIdLazyQueryHookResult = ReturnType<typeof useListSellersByStripeCustomerIdLazyQuery>;
export type ListSellersByStripeCustomerIdSuspenseQueryHookResult = ReturnType<typeof useListSellersByStripeCustomerIdSuspenseQuery>;
export type ListSellersByStripeCustomerIdQueryResult = Apollo.QueryResult<ListSellersByStripeCustomerIdQuery, ListSellersByStripeCustomerIdQueryVariables>;
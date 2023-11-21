import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnverifiedSellersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UnverifiedSellersQuery = { __typename?: 'query_root', seller: Array<{ __typename?: 'seller', paper_private_notes?: string | null, id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null }> };


export const UnverifiedSellersDocument = gql`
    query UnverifiedSellers {
  seller(
    where: {date_business_documents_verified: {_is_null: true}, is_sole_proprietor: {_eq: false}, deleted_at: {_is_null: true}}
    order_by: {created_at: desc}
  ) {
    ...Seller
    paper_private_notes
  }
}
    ${SellerFragmentDoc}`;

/**
 * __useUnverifiedSellersQuery__
 *
 * To run a query within a React component, call `useUnverifiedSellersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnverifiedSellersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnverifiedSellersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnverifiedSellersQuery(baseOptions?: Apollo.QueryHookOptions<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>(UnverifiedSellersDocument, options);
      }
export function useUnverifiedSellersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>(UnverifiedSellersDocument, options);
        }
export function useUnverifiedSellersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>(UnverifiedSellersDocument, options);
        }
export type UnverifiedSellersQueryHookResult = ReturnType<typeof useUnverifiedSellersQuery>;
export type UnverifiedSellersLazyQueryHookResult = ReturnType<typeof useUnverifiedSellersLazyQuery>;
export type UnverifiedSellersSuspenseQueryHookResult = ReturnType<typeof useUnverifiedSellersSuspenseQuery>;
export type UnverifiedSellersQueryResult = Apollo.QueryResult<UnverifiedSellersQuery, UnverifiedSellersQueryVariables>;
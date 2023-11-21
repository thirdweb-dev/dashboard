import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { FiatPayoutFragmentDoc } from '../../fragments/__generated__/FiatPayout.generated';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FiatPayoutUnpaidQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FiatPayoutUnpaidQuery = { __typename?: 'query_root', fiat_payout: Array<{ __typename?: 'fiat_payout', id: any, created_at: any, seller_id: string, amount_fiat_cents: number, currency_fiat: string, contract_address: string, contract_chain: string, paid_out_at?: any | null, transaction_hash: string, contract_payer_wallet_address: string, amount_crypto: string, currency_crypto: string, seller: { __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null } }> };


export const FiatPayoutUnpaidDocument = gql`
    query FiatPayoutUnpaid {
  fiat_payout(where: {paid_out_at: {_is_null: true}}) {
    ...FiatPayout
    seller {
      ...Seller
    }
  }
}
    ${FiatPayoutFragmentDoc}
${SellerFragmentDoc}`;

/**
 * __useFiatPayoutUnpaidQuery__
 *
 * To run a query within a React component, call `useFiatPayoutUnpaidQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiatPayoutUnpaidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiatPayoutUnpaidQuery({
 *   variables: {
 *   },
 * });
 */
export function useFiatPayoutUnpaidQuery(baseOptions?: Apollo.QueryHookOptions<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>(FiatPayoutUnpaidDocument, options);
      }
export function useFiatPayoutUnpaidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>(FiatPayoutUnpaidDocument, options);
        }
export function useFiatPayoutUnpaidSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>(FiatPayoutUnpaidDocument, options);
        }
export type FiatPayoutUnpaidQueryHookResult = ReturnType<typeof useFiatPayoutUnpaidQuery>;
export type FiatPayoutUnpaidLazyQueryHookResult = ReturnType<typeof useFiatPayoutUnpaidLazyQuery>;
export type FiatPayoutUnpaidSuspenseQueryHookResult = ReturnType<typeof useFiatPayoutUnpaidSuspenseQuery>;
export type FiatPayoutUnpaidQueryResult = Apollo.QueryResult<FiatPayoutUnpaidQuery, FiatPayoutUnpaidQueryVariables>;
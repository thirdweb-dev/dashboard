import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerPrivateFragmentDoc } from '../../fragments/__generated__/SellerPrivate.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SellerPrivateQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type SellerPrivateQuery = { __typename?: 'query_root', seller_by_pk?: { __typename?: 'seller', risk_level: string, paper_private_notes?: string | null, production_checkout_purchase_limit_usd_cents?: number | null, id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null } | null };


export const SellerPrivateDocument = gql`
    query SellerPrivate($id: String!) {
  seller_by_pk(id: $id) {
    ...SellerPrivate
  }
}
    ${SellerPrivateFragmentDoc}`;

/**
 * __useSellerPrivateQuery__
 *
 * To run a query within a React component, call `useSellerPrivateQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerPrivateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerPrivateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSellerPrivateQuery(baseOptions: Apollo.QueryHookOptions<SellerPrivateQuery, SellerPrivateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellerPrivateQuery, SellerPrivateQueryVariables>(SellerPrivateDocument, options);
      }
export function useSellerPrivateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellerPrivateQuery, SellerPrivateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellerPrivateQuery, SellerPrivateQueryVariables>(SellerPrivateDocument, options);
        }
export function useSellerPrivateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SellerPrivateQuery, SellerPrivateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SellerPrivateQuery, SellerPrivateQueryVariables>(SellerPrivateDocument, options);
        }
export type SellerPrivateQueryHookResult = ReturnType<typeof useSellerPrivateQuery>;
export type SellerPrivateLazyQueryHookResult = ReturnType<typeof useSellerPrivateLazyQuery>;
export type SellerPrivateSuspenseQueryHookResult = ReturnType<typeof useSellerPrivateSuspenseQuery>;
export type SellerPrivateQueryResult = Apollo.QueryResult<SellerPrivateQuery, SellerPrivateQueryVariables>;
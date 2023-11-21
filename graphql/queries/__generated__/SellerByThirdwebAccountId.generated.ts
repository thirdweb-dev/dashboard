import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SellerByThirdwebAccountIdQueryVariables = Types.Exact<{
  thirdwebAccountId: Types.Scalars['String']['input'];
}>;


export type SellerByThirdwebAccountIdQuery = { __typename?: 'query_root', seller: Array<{ __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null }> };


export const SellerByThirdwebAccountIdDocument = gql`
    query SellerByThirdwebAccountId($thirdwebAccountId: String!) {
  seller(where: {thirdweb_account_id: {_eq: $thirdwebAccountId}}) {
    ...Seller
  }
}
    ${SellerFragmentDoc}`;

/**
 * __useSellerByThirdwebAccountIdQuery__
 *
 * To run a query within a React component, call `useSellerByThirdwebAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerByThirdwebAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerByThirdwebAccountIdQuery({
 *   variables: {
 *      thirdwebAccountId: // value for 'thirdwebAccountId'
 *   },
 * });
 */
export function useSellerByThirdwebAccountIdQuery(baseOptions: Apollo.QueryHookOptions<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>(SellerByThirdwebAccountIdDocument, options);
      }
export function useSellerByThirdwebAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>(SellerByThirdwebAccountIdDocument, options);
        }
export function useSellerByThirdwebAccountIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>(SellerByThirdwebAccountIdDocument, options);
        }
export type SellerByThirdwebAccountIdQueryHookResult = ReturnType<typeof useSellerByThirdwebAccountIdQuery>;
export type SellerByThirdwebAccountIdLazyQueryHookResult = ReturnType<typeof useSellerByThirdwebAccountIdLazyQuery>;
export type SellerByThirdwebAccountIdSuspenseQueryHookResult = ReturnType<typeof useSellerByThirdwebAccountIdSuspenseQuery>;
export type SellerByThirdwebAccountIdQueryResult = Apollo.QueryResult<SellerByThirdwebAccountIdQuery, SellerByThirdwebAccountIdQueryVariables>;
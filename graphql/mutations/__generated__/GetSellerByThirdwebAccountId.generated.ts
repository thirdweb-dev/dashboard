import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { SellerFragmentDoc } from '../../fragments/__generated__/Seller.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSellerByThirdwebAccountIdQueryVariables = Types.Exact<{
  thirdwebAccountId: Types.Scalars['String']['input'];
}>;


export type GetSellerByThirdwebAccountIdQuery = { __typename?: 'query_root', seller: Array<{ __typename?: 'seller', id: string, email?: string | null, twitter_handle?: string | null, service_fee_bps: number, stripe_customer_id?: string | null, stripe_default_payment_method_id?: string | null, fee_bearer: string, email_display_name?: string | null, support_email?: string | null, default_float_wallets?: any | null, date_business_documents_verified?: any | null, date_personal_documents_verified?: any | null, created_at: any, deleted_at?: any | null, is_archived: boolean, native_mint_payout_wallet_address?: string | null, source?: string | null, referrer?: string | null, implementation_status: string, is_enterprise: boolean, is_sole_proprietor?: boolean | null, company_logo_url?: string | null, company_name?: string | null, role_in_company?: string | null, estimated_launch_date?: any | null, deposit_amount_usd_cents?: number | null, auto_topup_enabled: boolean, auto_topup_amount_usd_cents?: number | null, discord_username?: string | null, has_production_access?: boolean | null, thirdweb_account_id?: string | null, is_trusted?: boolean | null }> };


export const GetSellerByThirdwebAccountIdDocument = gql`
    query GetSellerByThirdwebAccountId($thirdwebAccountId: String!) {
  seller(where: {thirdweb_account_id: {_eq: $thirdwebAccountId}}) {
    ...Seller
  }
}
    ${SellerFragmentDoc}`;

/**
 * __useGetSellerByThirdwebAccountIdQuery__
 *
 * To run a query within a React component, call `useGetSellerByThirdwebAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSellerByThirdwebAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSellerByThirdwebAccountIdQuery({
 *   variables: {
 *      thirdwebAccountId: // value for 'thirdwebAccountId'
 *   },
 * });
 */
export function useGetSellerByThirdwebAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>(GetSellerByThirdwebAccountIdDocument, options);
      }
export function useGetSellerByThirdwebAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>(GetSellerByThirdwebAccountIdDocument, options);
        }
export function useGetSellerByThirdwebAccountIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>(GetSellerByThirdwebAccountIdDocument, options);
        }
export type GetSellerByThirdwebAccountIdQueryHookResult = ReturnType<typeof useGetSellerByThirdwebAccountIdQuery>;
export type GetSellerByThirdwebAccountIdLazyQueryHookResult = ReturnType<typeof useGetSellerByThirdwebAccountIdLazyQuery>;
export type GetSellerByThirdwebAccountIdSuspenseQueryHookResult = ReturnType<typeof useGetSellerByThirdwebAccountIdSuspenseQuery>;
export type GetSellerByThirdwebAccountIdQueryResult = Apollo.QueryResult<GetSellerByThirdwebAccountIdQuery, GetSellerByThirdwebAccountIdQueryVariables>;
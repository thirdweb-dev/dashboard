/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  jsonb: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "checkout" */
export type Checkout = {
  __typename?: 'checkout';
  brand_button_shape: Scalars['String']['output'];
  brand_color_scheme: Scalars['String']['output'];
  brand_dark_mode: Scalars['Boolean']['output'];
  bundle_address?: Maybe<Scalars['String']['output']>;
  cancel_callback_url?: Maybe<Scalars['String']['output']>;
  card_payments_vendor?: Maybe<Scalars['String']['output']>;
  collection_description?: Maybe<Scalars['String']['output']>;
  collection_title: Scalars['String']['output'];
  contract_address: Scalars['String']['output'];
  contract_args?: Maybe<Scalars['jsonb']['output']>;
  contract_chain: Scalars['String']['output'];
  contract_type: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  custom_abi: Scalars['jsonb']['output'];
  deleted_at: Scalars['timestamptz']['output'];
  float_wallet_addresses: Scalars['jsonb']['output'];
  generated_by_registered_contract: Scalars['Boolean']['output'];
  has_public_link: Scalars['Boolean']['output'];
  hide_connect_external_wallet: Scalars['Boolean']['output'];
  hide_connect_paper_wallet: Scalars['Boolean']['output'];
  hide_native_mint: Scalars['Boolean']['output'];
  hide_pay_with_afterpay: Scalars['Boolean']['output'];
  hide_pay_with_bank: Scalars['Boolean']['output'];
  hide_pay_with_card: Scalars['Boolean']['output'];
  hide_pay_with_crypto: Scalars['Boolean']['output'];
  hide_pay_with_ideal: Scalars['Boolean']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  limit_per_transaction: Scalars['Int']['output'];
  limit_per_wallet_address?: Maybe<Scalars['Int']['output']>;
  listing_id?: Maybe<Scalars['String']['output']>;
  mint_abi_function_name?: Maybe<Scalars['String']['output']>;
  owner_id: Scalars['String']['output'];
  pack_address?: Maybe<Scalars['String']['output']>;
  pack_id?: Maybe<Scalars['String']['output']>;
  post_purchase_button_text?: Maybe<Scalars['String']['output']>;
  post_purchase_message_markdown?: Maybe<Scalars['String']['output']>;
  price: Scalars['jsonb']['output'];
  redirect_after_payment: Scalars['Boolean']['output'];
  registered_contract_id?: Maybe<Scalars['uuid']['output']>;
  require_verified_email: Scalars['Boolean']['output'];
  /** An object relationship */
  seller: Seller;
  seller_twitter_handle?: Maybe<Scalars['String']['output']>;
  should_send_transfer_completed_email: Scalars['Boolean']['output'];
  sponsored_fees: Scalars['Boolean']['output'];
  success_callback_url?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  use_paper_access_key: Scalars['Boolean']['output'];
  webhook_urls: Scalars['jsonb']['output'];
};


/** columns and relationships of "checkout" */
export type CheckoutContract_ArgsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "checkout" */
export type CheckoutCustom_AbiArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "checkout" */
export type CheckoutFloat_Wallet_AddressesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "checkout" */
export type CheckoutPriceArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "checkout" */
export type CheckoutWebhook_UrlsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "checkout". All fields are combined with a logical 'AND'. */
export type Checkout_Bool_Exp = {
  _and?: InputMaybe<Array<Checkout_Bool_Exp>>;
  _not?: InputMaybe<Checkout_Bool_Exp>;
  _or?: InputMaybe<Array<Checkout_Bool_Exp>>;
  brand_button_shape?: InputMaybe<String_Comparison_Exp>;
  brand_color_scheme?: InputMaybe<String_Comparison_Exp>;
  brand_dark_mode?: InputMaybe<Boolean_Comparison_Exp>;
  bundle_address?: InputMaybe<String_Comparison_Exp>;
  cancel_callback_url?: InputMaybe<String_Comparison_Exp>;
  card_payments_vendor?: InputMaybe<String_Comparison_Exp>;
  collection_description?: InputMaybe<String_Comparison_Exp>;
  collection_title?: InputMaybe<String_Comparison_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  contract_args?: InputMaybe<Jsonb_Comparison_Exp>;
  contract_chain?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  custom_abi?: InputMaybe<Jsonb_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  float_wallet_addresses?: InputMaybe<Jsonb_Comparison_Exp>;
  generated_by_registered_contract?: InputMaybe<Boolean_Comparison_Exp>;
  has_public_link?: InputMaybe<Boolean_Comparison_Exp>;
  hide_connect_external_wallet?: InputMaybe<Boolean_Comparison_Exp>;
  hide_connect_paper_wallet?: InputMaybe<Boolean_Comparison_Exp>;
  hide_native_mint?: InputMaybe<Boolean_Comparison_Exp>;
  hide_pay_with_afterpay?: InputMaybe<Boolean_Comparison_Exp>;
  hide_pay_with_bank?: InputMaybe<Boolean_Comparison_Exp>;
  hide_pay_with_card?: InputMaybe<Boolean_Comparison_Exp>;
  hide_pay_with_crypto?: InputMaybe<Boolean_Comparison_Exp>;
  hide_pay_with_ideal?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  limit_per_transaction?: InputMaybe<Int_Comparison_Exp>;
  limit_per_wallet_address?: InputMaybe<Int_Comparison_Exp>;
  listing_id?: InputMaybe<String_Comparison_Exp>;
  mint_abi_function_name?: InputMaybe<String_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  pack_address?: InputMaybe<String_Comparison_Exp>;
  pack_id?: InputMaybe<String_Comparison_Exp>;
  post_purchase_button_text?: InputMaybe<String_Comparison_Exp>;
  post_purchase_message_markdown?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Jsonb_Comparison_Exp>;
  redirect_after_payment?: InputMaybe<Boolean_Comparison_Exp>;
  registered_contract_id?: InputMaybe<Uuid_Comparison_Exp>;
  require_verified_email?: InputMaybe<Boolean_Comparison_Exp>;
  seller?: InputMaybe<Seller_Bool_Exp>;
  seller_twitter_handle?: InputMaybe<String_Comparison_Exp>;
  should_send_transfer_completed_email?: InputMaybe<Boolean_Comparison_Exp>;
  sponsored_fees?: InputMaybe<Boolean_Comparison_Exp>;
  success_callback_url?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  use_paper_access_key?: InputMaybe<Boolean_Comparison_Exp>;
  webhook_urls?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "checkout". */
export type Checkout_Order_By = {
  brand_button_shape?: InputMaybe<Order_By>;
  brand_color_scheme?: InputMaybe<Order_By>;
  brand_dark_mode?: InputMaybe<Order_By>;
  bundle_address?: InputMaybe<Order_By>;
  cancel_callback_url?: InputMaybe<Order_By>;
  card_payments_vendor?: InputMaybe<Order_By>;
  collection_description?: InputMaybe<Order_By>;
  collection_title?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  contract_args?: InputMaybe<Order_By>;
  contract_chain?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  custom_abi?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  float_wallet_addresses?: InputMaybe<Order_By>;
  generated_by_registered_contract?: InputMaybe<Order_By>;
  has_public_link?: InputMaybe<Order_By>;
  hide_connect_external_wallet?: InputMaybe<Order_By>;
  hide_connect_paper_wallet?: InputMaybe<Order_By>;
  hide_native_mint?: InputMaybe<Order_By>;
  hide_pay_with_afterpay?: InputMaybe<Order_By>;
  hide_pay_with_bank?: InputMaybe<Order_By>;
  hide_pay_with_card?: InputMaybe<Order_By>;
  hide_pay_with_crypto?: InputMaybe<Order_By>;
  hide_pay_with_ideal?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  limit_per_transaction?: InputMaybe<Order_By>;
  limit_per_wallet_address?: InputMaybe<Order_By>;
  listing_id?: InputMaybe<Order_By>;
  mint_abi_function_name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  pack_address?: InputMaybe<Order_By>;
  pack_id?: InputMaybe<Order_By>;
  post_purchase_button_text?: InputMaybe<Order_By>;
  post_purchase_message_markdown?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  redirect_after_payment?: InputMaybe<Order_By>;
  registered_contract_id?: InputMaybe<Order_By>;
  require_verified_email?: InputMaybe<Order_By>;
  seller?: InputMaybe<Seller_Order_By>;
  seller_twitter_handle?: InputMaybe<Order_By>;
  should_send_transfer_completed_email?: InputMaybe<Order_By>;
  sponsored_fees?: InputMaybe<Order_By>;
  success_callback_url?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  use_paper_access_key?: InputMaybe<Order_By>;
  webhook_urls?: InputMaybe<Order_By>;
};

/** select columns of table "checkout" */
export enum Checkout_Select_Column {
  /** column name */
  BrandButtonShape = 'brand_button_shape',
  /** column name */
  BrandColorScheme = 'brand_color_scheme',
  /** column name */
  BrandDarkMode = 'brand_dark_mode',
  /** column name */
  BundleAddress = 'bundle_address',
  /** column name */
  CancelCallbackUrl = 'cancel_callback_url',
  /** column name */
  CardPaymentsVendor = 'card_payments_vendor',
  /** column name */
  CollectionDescription = 'collection_description',
  /** column name */
  CollectionTitle = 'collection_title',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  ContractArgs = 'contract_args',
  /** column name */
  ContractChain = 'contract_chain',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomAbi = 'custom_abi',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  FloatWalletAddresses = 'float_wallet_addresses',
  /** column name */
  GeneratedByRegisteredContract = 'generated_by_registered_contract',
  /** column name */
  HasPublicLink = 'has_public_link',
  /** column name */
  HideConnectExternalWallet = 'hide_connect_external_wallet',
  /** column name */
  HideConnectPaperWallet = 'hide_connect_paper_wallet',
  /** column name */
  HideNativeMint = 'hide_native_mint',
  /** column name */
  HidePayWithAfterpay = 'hide_pay_with_afterpay',
  /** column name */
  HidePayWithBank = 'hide_pay_with_bank',
  /** column name */
  HidePayWithCard = 'hide_pay_with_card',
  /** column name */
  HidePayWithCrypto = 'hide_pay_with_crypto',
  /** column name */
  HidePayWithIdeal = 'hide_pay_with_ideal',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  LimitPerTransaction = 'limit_per_transaction',
  /** column name */
  LimitPerWalletAddress = 'limit_per_wallet_address',
  /** column name */
  ListingId = 'listing_id',
  /** column name */
  MintAbiFunctionName = 'mint_abi_function_name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  PackAddress = 'pack_address',
  /** column name */
  PackId = 'pack_id',
  /** column name */
  PostPurchaseButtonText = 'post_purchase_button_text',
  /** column name */
  PostPurchaseMessageMarkdown = 'post_purchase_message_markdown',
  /** column name */
  Price = 'price',
  /** column name */
  RedirectAfterPayment = 'redirect_after_payment',
  /** column name */
  RegisteredContractId = 'registered_contract_id',
  /** column name */
  RequireVerifiedEmail = 'require_verified_email',
  /** column name */
  SellerTwitterHandle = 'seller_twitter_handle',
  /** column name */
  ShouldSendTransferCompletedEmail = 'should_send_transfer_completed_email',
  /** column name */
  SponsoredFees = 'sponsored_fees',
  /** column name */
  SuccessCallbackUrl = 'success_callback_url',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UsePaperAccessKey = 'use_paper_access_key',
  /** column name */
  WebhookUrls = 'webhook_urls'
}

/** Streaming cursor of the table "checkout" */
export type Checkout_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Checkout_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Checkout_Stream_Cursor_Value_Input = {
  brand_button_shape?: InputMaybe<Scalars['String']['input']>;
  brand_color_scheme?: InputMaybe<Scalars['String']['input']>;
  brand_dark_mode?: InputMaybe<Scalars['Boolean']['input']>;
  bundle_address?: InputMaybe<Scalars['String']['input']>;
  cancel_callback_url?: InputMaybe<Scalars['String']['input']>;
  card_payments_vendor?: InputMaybe<Scalars['String']['input']>;
  collection_description?: InputMaybe<Scalars['String']['input']>;
  collection_title?: InputMaybe<Scalars['String']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_args?: InputMaybe<Scalars['jsonb']['input']>;
  contract_chain?: InputMaybe<Scalars['String']['input']>;
  contract_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  custom_abi?: InputMaybe<Scalars['jsonb']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  float_wallet_addresses?: InputMaybe<Scalars['jsonb']['input']>;
  generated_by_registered_contract?: InputMaybe<Scalars['Boolean']['input']>;
  has_public_link?: InputMaybe<Scalars['Boolean']['input']>;
  hide_connect_external_wallet?: InputMaybe<Scalars['Boolean']['input']>;
  hide_connect_paper_wallet?: InputMaybe<Scalars['Boolean']['input']>;
  hide_native_mint?: InputMaybe<Scalars['Boolean']['input']>;
  hide_pay_with_afterpay?: InputMaybe<Scalars['Boolean']['input']>;
  hide_pay_with_bank?: InputMaybe<Scalars['Boolean']['input']>;
  hide_pay_with_card?: InputMaybe<Scalars['Boolean']['input']>;
  hide_pay_with_crypto?: InputMaybe<Scalars['Boolean']['input']>;
  hide_pay_with_ideal?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  limit_per_transaction?: InputMaybe<Scalars['Int']['input']>;
  limit_per_wallet_address?: InputMaybe<Scalars['Int']['input']>;
  listing_id?: InputMaybe<Scalars['String']['input']>;
  mint_abi_function_name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  pack_address?: InputMaybe<Scalars['String']['input']>;
  pack_id?: InputMaybe<Scalars['String']['input']>;
  post_purchase_button_text?: InputMaybe<Scalars['String']['input']>;
  post_purchase_message_markdown?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['jsonb']['input']>;
  redirect_after_payment?: InputMaybe<Scalars['Boolean']['input']>;
  registered_contract_id?: InputMaybe<Scalars['uuid']['input']>;
  require_verified_email?: InputMaybe<Scalars['Boolean']['input']>;
  seller_twitter_handle?: InputMaybe<Scalars['String']['input']>;
  should_send_transfer_completed_email?: InputMaybe<Scalars['Boolean']['input']>;
  sponsored_fees?: InputMaybe<Scalars['Boolean']['input']>;
  success_callback_url?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  use_paper_access_key?: InputMaybe<Scalars['Boolean']['input']>;
  webhook_urls?: InputMaybe<Scalars['jsonb']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** OAuth client keys and Wallet client Keys details */
export type Oauth = {
  __typename?: 'oauth';
  allowlisted_domains: Scalars['jsonb']['output'];
  application_image_url?: Maybe<Scalars['String']['output']>;
  application_name: Scalars['String']['output'];
  client_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  owner_id: Scalars['String']['output'];
  recovery_share_management: Scalars['String']['output'];
  revoked_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  seller?: Maybe<Seller>;
  type: Scalars['String']['output'];
};


/** OAuth client keys and Wallet client Keys details */
export type OauthAllowlisted_DomainsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "oauth_access_token" */
export type Oauth_Access_Token = {
  __typename?: 'oauth_access_token';
  client_id: Scalars['uuid']['output'];
  email: Scalars['String']['output'];
  revoked_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "oauth_access_token" */
export type Oauth_Access_Token_Aggregate = {
  __typename?: 'oauth_access_token_aggregate';
  aggregate?: Maybe<Oauth_Access_Token_Aggregate_Fields>;
  nodes: Array<Oauth_Access_Token>;
};

/** aggregate fields of "oauth_access_token" */
export type Oauth_Access_Token_Aggregate_Fields = {
  __typename?: 'oauth_access_token_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Oauth_Access_Token_Max_Fields>;
  min?: Maybe<Oauth_Access_Token_Min_Fields>;
};


/** aggregate fields of "oauth_access_token" */
export type Oauth_Access_Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Oauth_Access_Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "oauth_access_token". All fields are combined with a logical 'AND'. */
export type Oauth_Access_Token_Bool_Exp = {
  _and?: InputMaybe<Array<Oauth_Access_Token_Bool_Exp>>;
  _not?: InputMaybe<Oauth_Access_Token_Bool_Exp>;
  _or?: InputMaybe<Array<Oauth_Access_Token_Bool_Exp>>;
  client_id?: InputMaybe<Uuid_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  revoked_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Oauth_Access_Token_Max_Fields = {
  __typename?: 'oauth_access_token_max_fields';
  client_id?: Maybe<Scalars['uuid']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  revoked_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Oauth_Access_Token_Min_Fields = {
  __typename?: 'oauth_access_token_min_fields';
  client_id?: Maybe<Scalars['uuid']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  revoked_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "oauth_access_token". */
export type Oauth_Access_Token_Order_By = {
  client_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  revoked_at?: InputMaybe<Order_By>;
};

/** select columns of table "oauth_access_token" */
export enum Oauth_Access_Token_Select_Column {
  /** column name */
  ClientId = 'client_id',
  /** column name */
  Email = 'email',
  /** column name */
  RevokedAt = 'revoked_at'
}

/** Streaming cursor of the table "oauth_access_token" */
export type Oauth_Access_Token_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Oauth_Access_Token_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Oauth_Access_Token_Stream_Cursor_Value_Input = {
  client_id?: InputMaybe<Scalars['uuid']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  revoked_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to filter rows from the table "oauth". All fields are combined with a logical 'AND'. */
export type Oauth_Bool_Exp = {
  _and?: InputMaybe<Array<Oauth_Bool_Exp>>;
  _not?: InputMaybe<Oauth_Bool_Exp>;
  _or?: InputMaybe<Array<Oauth_Bool_Exp>>;
  allowlisted_domains?: InputMaybe<Jsonb_Comparison_Exp>;
  application_image_url?: InputMaybe<String_Comparison_Exp>;
  application_name?: InputMaybe<String_Comparison_Exp>;
  client_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  recovery_share_management?: InputMaybe<String_Comparison_Exp>;
  revoked_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  seller?: InputMaybe<Seller_Bool_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "oauth". */
export type Oauth_Order_By = {
  allowlisted_domains?: InputMaybe<Order_By>;
  application_image_url?: InputMaybe<Order_By>;
  application_name?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  recovery_share_management?: InputMaybe<Order_By>;
  revoked_at?: InputMaybe<Order_By>;
  seller?: InputMaybe<Seller_Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "oauth" */
export enum Oauth_Select_Column {
  /** column name */
  AllowlistedDomains = 'allowlisted_domains',
  /** column name */
  ApplicationImageUrl = 'application_image_url',
  /** column name */
  ApplicationName = 'application_name',
  /** column name */
  ClientId = 'client_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  RecoveryShareManagement = 'recovery_share_management',
  /** column name */
  RevokedAt = 'revoked_at',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "oauth" */
export type Oauth_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Oauth_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Oauth_Stream_Cursor_Value_Input = {
  allowlisted_domains?: InputMaybe<Scalars['jsonb']['input']>;
  application_image_url?: InputMaybe<Scalars['String']['input']>;
  application_name?: InputMaybe<Scalars['String']['input']>;
  client_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  recovery_share_management?: InputMaybe<Scalars['String']['input']>;
  revoked_at?: InputMaybe<Scalars['timestamptz']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "checkout" */
  checkout: Array<Checkout>;
  /** fetch data from the table: "checkout" using primary key columns */
  checkout_by_pk?: Maybe<Checkout>;
  /** fetch data from the table: "oauth" */
  oauth: Array<Oauth>;
  /** fetch data from the table: "oauth_access_token" */
  oauth_access_token: Array<Oauth_Access_Token>;
  /** fetch aggregated fields from the table: "oauth_access_token" */
  oauth_access_token_aggregate: Oauth_Access_Token_Aggregate;
  /** fetch data from the table: "oauth" using primary key columns */
  oauth_by_pk?: Maybe<Oauth>;
  /** fetch data from the table: "seller" */
  seller: Array<Seller>;
  /** fetch data from the table: "seller" using primary key columns */
  seller_by_pk?: Maybe<Seller>;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
};


export type Query_RootCheckoutArgs = {
  distinct_on?: InputMaybe<Array<Checkout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Checkout_Order_By>>;
  where?: InputMaybe<Checkout_Bool_Exp>;
};


export type Query_RootCheckout_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootOauthArgs = {
  distinct_on?: InputMaybe<Array<Oauth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Oauth_Order_By>>;
  where?: InputMaybe<Oauth_Bool_Exp>;
};


export type Query_RootOauth_Access_TokenArgs = {
  distinct_on?: InputMaybe<Array<Oauth_Access_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Oauth_Access_Token_Order_By>>;
  where?: InputMaybe<Oauth_Access_Token_Bool_Exp>;
};


export type Query_RootOauth_Access_Token_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Oauth_Access_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Oauth_Access_Token_Order_By>>;
  where?: InputMaybe<Oauth_Access_Token_Bool_Exp>;
};


export type Query_RootOauth_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSellerArgs = {
  distinct_on?: InputMaybe<Array<Seller_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Seller_Order_By>>;
  where?: InputMaybe<Seller_Bool_Exp>;
};


export type Query_RootSeller_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Query_RootTransaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** The top level "organization". */
export type Seller = {
  __typename?: 'seller';
  company_logo_url?: Maybe<Scalars['String']['output']>;
  company_name?: Maybe<Scalars['String']['output']>;
  default_float_wallets?: Maybe<Scalars['jsonb']['output']>;
  deposit_amount_usd_cents?: Maybe<Scalars['Int']['output']>;
  email_display_name?: Maybe<Scalars['String']['output']>;
  fee_bearer: Scalars['String']['output'];
  /** A computed field that shows whether a seller has production access or not */
  has_production_access?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  is_archived: Scalars['Boolean']['output'];
  is_enterprise: Scalars['Boolean']['output'];
  is_trusted?: Maybe<Scalars['Boolean']['output']>;
  role_in_company?: Maybe<Scalars['String']['output']>;
  service_fee_bps: Scalars['Int']['output'];
  support_email?: Maybe<Scalars['String']['output']>;
  thirdweb_account_id?: Maybe<Scalars['String']['output']>;
  twitter_handle?: Maybe<Scalars['String']['output']>;
};


/** The top level "organization". */
export type SellerDefault_Float_WalletsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "seller". All fields are combined with a logical 'AND'. */
export type Seller_Bool_Exp = {
  _and?: InputMaybe<Array<Seller_Bool_Exp>>;
  _not?: InputMaybe<Seller_Bool_Exp>;
  _or?: InputMaybe<Array<Seller_Bool_Exp>>;
  company_logo_url?: InputMaybe<String_Comparison_Exp>;
  company_name?: InputMaybe<String_Comparison_Exp>;
  default_float_wallets?: InputMaybe<Jsonb_Comparison_Exp>;
  deposit_amount_usd_cents?: InputMaybe<Int_Comparison_Exp>;
  email_display_name?: InputMaybe<String_Comparison_Exp>;
  fee_bearer?: InputMaybe<String_Comparison_Exp>;
  has_production_access?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  is_enterprise?: InputMaybe<Boolean_Comparison_Exp>;
  is_trusted?: InputMaybe<Boolean_Comparison_Exp>;
  role_in_company?: InputMaybe<String_Comparison_Exp>;
  service_fee_bps?: InputMaybe<Int_Comparison_Exp>;
  support_email?: InputMaybe<String_Comparison_Exp>;
  thirdweb_account_id?: InputMaybe<String_Comparison_Exp>;
  twitter_handle?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "seller". */
export type Seller_Order_By = {
  company_logo_url?: InputMaybe<Order_By>;
  company_name?: InputMaybe<Order_By>;
  default_float_wallets?: InputMaybe<Order_By>;
  deposit_amount_usd_cents?: InputMaybe<Order_By>;
  email_display_name?: InputMaybe<Order_By>;
  fee_bearer?: InputMaybe<Order_By>;
  has_production_access?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  is_enterprise?: InputMaybe<Order_By>;
  is_trusted?: InputMaybe<Order_By>;
  role_in_company?: InputMaybe<Order_By>;
  service_fee_bps?: InputMaybe<Order_By>;
  support_email?: InputMaybe<Order_By>;
  thirdweb_account_id?: InputMaybe<Order_By>;
  twitter_handle?: InputMaybe<Order_By>;
};

/** select columns of table "seller" */
export enum Seller_Select_Column {
  /** column name */
  CompanyLogoUrl = 'company_logo_url',
  /** column name */
  CompanyName = 'company_name',
  /** column name */
  DefaultFloatWallets = 'default_float_wallets',
  /** column name */
  DepositAmountUsdCents = 'deposit_amount_usd_cents',
  /** column name */
  EmailDisplayName = 'email_display_name',
  /** column name */
  FeeBearer = 'fee_bearer',
  /** column name */
  Id = 'id',
  /** column name */
  IsArchived = 'is_archived',
  /** column name */
  IsEnterprise = 'is_enterprise',
  /** column name */
  IsTrusted = 'is_trusted',
  /** column name */
  RoleInCompany = 'role_in_company',
  /** column name */
  ServiceFeeBps = 'service_fee_bps',
  /** column name */
  SupportEmail = 'support_email',
  /** column name */
  ThirdwebAccountId = 'thirdweb_account_id',
  /** column name */
  TwitterHandle = 'twitter_handle'
}

/** Streaming cursor of the table "seller" */
export type Seller_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Seller_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Seller_Stream_Cursor_Value_Input = {
  company_logo_url?: InputMaybe<Scalars['String']['input']>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  default_float_wallets?: InputMaybe<Scalars['jsonb']['input']>;
  deposit_amount_usd_cents?: InputMaybe<Scalars['Int']['input']>;
  email_display_name?: InputMaybe<Scalars['String']['input']>;
  fee_bearer?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_enterprise?: InputMaybe<Scalars['Boolean']['input']>;
  is_trusted?: InputMaybe<Scalars['Boolean']['input']>;
  role_in_company?: InputMaybe<Scalars['String']['input']>;
  service_fee_bps?: InputMaybe<Scalars['Int']['input']>;
  support_email?: InputMaybe<Scalars['String']['input']>;
  thirdweb_account_id?: InputMaybe<Scalars['String']['input']>;
  twitter_handle?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "checkout" */
  checkout: Array<Checkout>;
  /** fetch data from the table: "checkout" using primary key columns */
  checkout_by_pk?: Maybe<Checkout>;
  /** fetch data from the table in a streaming manner: "checkout" */
  checkout_stream: Array<Checkout>;
  /** fetch data from the table: "oauth" */
  oauth: Array<Oauth>;
  /** fetch data from the table: "oauth_access_token" */
  oauth_access_token: Array<Oauth_Access_Token>;
  /** fetch aggregated fields from the table: "oauth_access_token" */
  oauth_access_token_aggregate: Oauth_Access_Token_Aggregate;
  /** fetch data from the table in a streaming manner: "oauth_access_token" */
  oauth_access_token_stream: Array<Oauth_Access_Token>;
  /** fetch data from the table: "oauth" using primary key columns */
  oauth_by_pk?: Maybe<Oauth>;
  /** fetch data from the table in a streaming manner: "oauth" */
  oauth_stream: Array<Oauth>;
  /** fetch data from the table: "seller" */
  seller: Array<Seller>;
  /** fetch data from the table: "seller" using primary key columns */
  seller_by_pk?: Maybe<Seller>;
  /** fetch data from the table in a streaming manner: "seller" */
  seller_stream: Array<Seller>;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table in a streaming manner: "transaction" */
  transaction_stream: Array<Transaction>;
};


export type Subscription_RootCheckoutArgs = {
  distinct_on?: InputMaybe<Array<Checkout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Checkout_Order_By>>;
  where?: InputMaybe<Checkout_Bool_Exp>;
};


export type Subscription_RootCheckout_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCheckout_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Checkout_Stream_Cursor_Input>>;
  where?: InputMaybe<Checkout_Bool_Exp>;
};


export type Subscription_RootOauthArgs = {
  distinct_on?: InputMaybe<Array<Oauth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Oauth_Order_By>>;
  where?: InputMaybe<Oauth_Bool_Exp>;
};


export type Subscription_RootOauth_Access_TokenArgs = {
  distinct_on?: InputMaybe<Array<Oauth_Access_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Oauth_Access_Token_Order_By>>;
  where?: InputMaybe<Oauth_Access_Token_Bool_Exp>;
};


export type Subscription_RootOauth_Access_Token_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Oauth_Access_Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Oauth_Access_Token_Order_By>>;
  where?: InputMaybe<Oauth_Access_Token_Bool_Exp>;
};


export type Subscription_RootOauth_Access_Token_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Oauth_Access_Token_Stream_Cursor_Input>>;
  where?: InputMaybe<Oauth_Access_Token_Bool_Exp>;
};


export type Subscription_RootOauth_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOauth_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Oauth_Stream_Cursor_Input>>;
  where?: InputMaybe<Oauth_Bool_Exp>;
};


export type Subscription_RootSellerArgs = {
  distinct_on?: InputMaybe<Array<Seller_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Seller_Order_By>>;
  where?: InputMaybe<Seller_Bool_Exp>;
};


export type Subscription_RootSeller_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootSeller_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Seller_Stream_Cursor_Input>>;
  where?: InputMaybe<Seller_Bool_Exp>;
};


export type Subscription_RootTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Subscription_RootTransaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTransaction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transaction_Stream_Cursor_Input>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "transaction" */
export type Transaction = {
  __typename?: 'transaction';
  airdrop_worker_job_name?: Maybe<Scalars['String']['output']>;
  buyer_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  checkout: Checkout;
  checkout_id: Scalars['uuid']['output'];
  checkoutcom_payment_id?: Maybe<Scalars['String']['output']>;
  claimed_tokens?: Maybe<Scalars['jsonb']['output']>;
  contract_args?: Maybe<Scalars['jsonb']['output']>;
  created_at: Scalars['timestamptz']['output'];
  crypto_payment_payer_address?: Maybe<Scalars['String']['output']>;
  crypto_payment_transaction_hash?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  eligibility_method: Scalars['jsonb']['output'];
  email?: Maybe<Scalars['String']['output']>;
  expected_crypto_payment: Scalars['jsonb']['output'];
  expires_at?: Maybe<Scalars['timestamptz']['output']>;
  fee_bearer: Scalars['String']['output'];
  fiat_currency?: Maybe<Scalars['String']['output']>;
  float_wallet_nonce?: Maybe<Scalars['Int']['output']>;
  float_wallet_used?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  location?: Maybe<Scalars['String']['output']>;
  locked_fields: Scalars['jsonb']['output'];
  locked_price_usd_cents?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  mint_method: Scalars['jsonb']['output'];
  network_fee_usd_cents?: Maybe<Scalars['Int']['output']>;
  payment_completed_at?: Maybe<Scalars['timestamptz']['output']>;
  payment_failure_code?: Maybe<Scalars['String']['output']>;
  payment_hold_created_at?: Maybe<Scalars['timestamptz']['output']>;
  payment_method: Scalars['String']['output'];
  payment_started_at?: Maybe<Scalars['timestamptz']['output']>;
  quantity: Scalars['Int']['output'];
  queueId?: Maybe<Scalars['String']['output']>;
  referrer?: Maybe<Scalars['String']['output']>;
  refunded_at?: Maybe<Scalars['timestamptz']['output']>;
  requested_token_id?: Maybe<Scalars['String']['output']>;
  sdk_client_secret?: Maybe<Scalars['String']['output']>;
  service_fee_usd_cents?: Maybe<Scalars['Int']['output']>;
  signature_args?: Maybe<Scalars['jsonb']['output']>;
  solana_whitelist_transaction_hash?: Maybe<Scalars['String']['output']>;
  stripe_payment_id?: Maybe<Scalars['String']['output']>;
  stripe_verification_session_id?: Maybe<Scalars['String']['output']>;
  stripe_verification_session_result?: Maybe<Scalars['String']['output']>;
  test_buckets?: Maybe<Scalars['jsonb']['output']>;
  title: Scalars['String']['output'];
  total_price_usd_cents?: Maybe<Scalars['Int']['output']>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
  transfer_completed_at?: Maybe<Scalars['timestamptz']['output']>;
  transfer_failed_at?: Maybe<Scalars['timestamptz']['output']>;
  trench_transaction_id: Scalars['String']['output'];
  use_paper_key: Scalars['Boolean']['output'];
  user_exported_nft_transaction_hashes: Scalars['jsonb']['output'];
  value_in_currency?: Maybe<Scalars['String']['output']>;
  wallet_address?: Maybe<Scalars['String']['output']>;
  wallet_type?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "transaction" */
export type TransactionClaimed_TokensArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionContract_ArgsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionEligibility_MethodArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionExpected_Crypto_PaymentArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionLocked_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionMint_MethodArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionSignature_ArgsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionTest_BucketsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "transaction" */
export type TransactionUser_Exported_Nft_Transaction_HashesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "transaction". All fields are combined with a logical 'AND'. */
export type Transaction_Bool_Exp = {
  _and?: InputMaybe<Array<Transaction_Bool_Exp>>;
  _not?: InputMaybe<Transaction_Bool_Exp>;
  _or?: InputMaybe<Array<Transaction_Bool_Exp>>;
  airdrop_worker_job_name?: InputMaybe<String_Comparison_Exp>;
  buyer_id?: InputMaybe<String_Comparison_Exp>;
  checkout?: InputMaybe<Checkout_Bool_Exp>;
  checkout_id?: InputMaybe<Uuid_Comparison_Exp>;
  checkoutcom_payment_id?: InputMaybe<String_Comparison_Exp>;
  claimed_tokens?: InputMaybe<Jsonb_Comparison_Exp>;
  contract_args?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  crypto_payment_payer_address?: InputMaybe<String_Comparison_Exp>;
  crypto_payment_transaction_hash?: InputMaybe<String_Comparison_Exp>;
  currency?: InputMaybe<String_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  eligibility_method?: InputMaybe<Jsonb_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  expected_crypto_payment?: InputMaybe<Jsonb_Comparison_Exp>;
  expires_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  fee_bearer?: InputMaybe<String_Comparison_Exp>;
  fiat_currency?: InputMaybe<String_Comparison_Exp>;
  float_wallet_nonce?: InputMaybe<Int_Comparison_Exp>;
  float_wallet_used?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  locked_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  locked_price_usd_cents?: InputMaybe<Int_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mint_method?: InputMaybe<Jsonb_Comparison_Exp>;
  network_fee_usd_cents?: InputMaybe<Int_Comparison_Exp>;
  payment_completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  payment_failure_code?: InputMaybe<String_Comparison_Exp>;
  payment_hold_created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  payment_method?: InputMaybe<String_Comparison_Exp>;
  payment_started_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  queueId?: InputMaybe<String_Comparison_Exp>;
  referrer?: InputMaybe<String_Comparison_Exp>;
  refunded_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  requested_token_id?: InputMaybe<String_Comparison_Exp>;
  sdk_client_secret?: InputMaybe<String_Comparison_Exp>;
  service_fee_usd_cents?: InputMaybe<Int_Comparison_Exp>;
  signature_args?: InputMaybe<Jsonb_Comparison_Exp>;
  solana_whitelist_transaction_hash?: InputMaybe<String_Comparison_Exp>;
  stripe_payment_id?: InputMaybe<String_Comparison_Exp>;
  stripe_verification_session_id?: InputMaybe<String_Comparison_Exp>;
  stripe_verification_session_result?: InputMaybe<String_Comparison_Exp>;
  test_buckets?: InputMaybe<Jsonb_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  total_price_usd_cents?: InputMaybe<Int_Comparison_Exp>;
  transaction_hash?: InputMaybe<String_Comparison_Exp>;
  transfer_completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  transfer_failed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  trench_transaction_id?: InputMaybe<String_Comparison_Exp>;
  use_paper_key?: InputMaybe<Boolean_Comparison_Exp>;
  user_exported_nft_transaction_hashes?: InputMaybe<Jsonb_Comparison_Exp>;
  value_in_currency?: InputMaybe<String_Comparison_Exp>;
  wallet_address?: InputMaybe<String_Comparison_Exp>;
  wallet_type?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "transaction". */
export type Transaction_Order_By = {
  airdrop_worker_job_name?: InputMaybe<Order_By>;
  buyer_id?: InputMaybe<Order_By>;
  checkout?: InputMaybe<Checkout_Order_By>;
  checkout_id?: InputMaybe<Order_By>;
  checkoutcom_payment_id?: InputMaybe<Order_By>;
  claimed_tokens?: InputMaybe<Order_By>;
  contract_args?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  crypto_payment_payer_address?: InputMaybe<Order_By>;
  crypto_payment_transaction_hash?: InputMaybe<Order_By>;
  currency?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  eligibility_method?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  expected_crypto_payment?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  fee_bearer?: InputMaybe<Order_By>;
  fiat_currency?: InputMaybe<Order_By>;
  float_wallet_nonce?: InputMaybe<Order_By>;
  float_wallet_used?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  locked_fields?: InputMaybe<Order_By>;
  locked_price_usd_cents?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mint_method?: InputMaybe<Order_By>;
  network_fee_usd_cents?: InputMaybe<Order_By>;
  payment_completed_at?: InputMaybe<Order_By>;
  payment_failure_code?: InputMaybe<Order_By>;
  payment_hold_created_at?: InputMaybe<Order_By>;
  payment_method?: InputMaybe<Order_By>;
  payment_started_at?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  queueId?: InputMaybe<Order_By>;
  referrer?: InputMaybe<Order_By>;
  refunded_at?: InputMaybe<Order_By>;
  requested_token_id?: InputMaybe<Order_By>;
  sdk_client_secret?: InputMaybe<Order_By>;
  service_fee_usd_cents?: InputMaybe<Order_By>;
  signature_args?: InputMaybe<Order_By>;
  solana_whitelist_transaction_hash?: InputMaybe<Order_By>;
  stripe_payment_id?: InputMaybe<Order_By>;
  stripe_verification_session_id?: InputMaybe<Order_By>;
  stripe_verification_session_result?: InputMaybe<Order_By>;
  test_buckets?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  total_price_usd_cents?: InputMaybe<Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  transfer_completed_at?: InputMaybe<Order_By>;
  transfer_failed_at?: InputMaybe<Order_By>;
  trench_transaction_id?: InputMaybe<Order_By>;
  use_paper_key?: InputMaybe<Order_By>;
  user_exported_nft_transaction_hashes?: InputMaybe<Order_By>;
  value_in_currency?: InputMaybe<Order_By>;
  wallet_address?: InputMaybe<Order_By>;
  wallet_type?: InputMaybe<Order_By>;
};

/** select columns of table "transaction" */
export enum Transaction_Select_Column {
  /** column name */
  AirdropWorkerJobName = 'airdrop_worker_job_name',
  /** column name */
  BuyerId = 'buyer_id',
  /** column name */
  CheckoutId = 'checkout_id',
  /** column name */
  CheckoutcomPaymentId = 'checkoutcom_payment_id',
  /** column name */
  ClaimedTokens = 'claimed_tokens',
  /** column name */
  ContractArgs = 'contract_args',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CryptoPaymentPayerAddress = 'crypto_payment_payer_address',
  /** column name */
  CryptoPaymentTransactionHash = 'crypto_payment_transaction_hash',
  /** column name */
  Currency = 'currency',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  EligibilityMethod = 'eligibility_method',
  /** column name */
  Email = 'email',
  /** column name */
  ExpectedCryptoPayment = 'expected_crypto_payment',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  FeeBearer = 'fee_bearer',
  /** column name */
  FiatCurrency = 'fiat_currency',
  /** column name */
  FloatWalletNonce = 'float_wallet_nonce',
  /** column name */
  FloatWalletUsed = 'float_wallet_used',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  LockedFields = 'locked_fields',
  /** column name */
  LockedPriceUsdCents = 'locked_price_usd_cents',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintMethod = 'mint_method',
  /** column name */
  NetworkFeeUsdCents = 'network_fee_usd_cents',
  /** column name */
  PaymentCompletedAt = 'payment_completed_at',
  /** column name */
  PaymentFailureCode = 'payment_failure_code',
  /** column name */
  PaymentHoldCreatedAt = 'payment_hold_created_at',
  /** column name */
  PaymentMethod = 'payment_method',
  /** column name */
  PaymentStartedAt = 'payment_started_at',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  QueueId = 'queueId',
  /** column name */
  Referrer = 'referrer',
  /** column name */
  RefundedAt = 'refunded_at',
  /** column name */
  RequestedTokenId = 'requested_token_id',
  /** column name */
  SdkClientSecret = 'sdk_client_secret',
  /** column name */
  ServiceFeeUsdCents = 'service_fee_usd_cents',
  /** column name */
  SignatureArgs = 'signature_args',
  /** column name */
  SolanaWhitelistTransactionHash = 'solana_whitelist_transaction_hash',
  /** column name */
  StripePaymentId = 'stripe_payment_id',
  /** column name */
  StripeVerificationSessionId = 'stripe_verification_session_id',
  /** column name */
  StripeVerificationSessionResult = 'stripe_verification_session_result',
  /** column name */
  TestBuckets = 'test_buckets',
  /** column name */
  Title = 'title',
  /** column name */
  TotalPriceUsdCents = 'total_price_usd_cents',
  /** column name */
  TransactionHash = 'transaction_hash',
  /** column name */
  TransferCompletedAt = 'transfer_completed_at',
  /** column name */
  TransferFailedAt = 'transfer_failed_at',
  /** column name */
  TrenchTransactionId = 'trench_transaction_id',
  /** column name */
  UsePaperKey = 'use_paper_key',
  /** column name */
  UserExportedNftTransactionHashes = 'user_exported_nft_transaction_hashes',
  /** column name */
  ValueInCurrency = 'value_in_currency',
  /** column name */
  WalletAddress = 'wallet_address',
  /** column name */
  WalletType = 'wallet_type'
}

/** Streaming cursor of the table "transaction" */
export type Transaction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transaction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transaction_Stream_Cursor_Value_Input = {
  airdrop_worker_job_name?: InputMaybe<Scalars['String']['input']>;
  buyer_id?: InputMaybe<Scalars['String']['input']>;
  checkout_id?: InputMaybe<Scalars['uuid']['input']>;
  checkoutcom_payment_id?: InputMaybe<Scalars['String']['input']>;
  claimed_tokens?: InputMaybe<Scalars['jsonb']['input']>;
  contract_args?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  crypto_payment_payer_address?: InputMaybe<Scalars['String']['input']>;
  crypto_payment_transaction_hash?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  eligibility_method?: InputMaybe<Scalars['jsonb']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  expected_crypto_payment?: InputMaybe<Scalars['jsonb']['input']>;
  expires_at?: InputMaybe<Scalars['timestamptz']['input']>;
  fee_bearer?: InputMaybe<Scalars['String']['input']>;
  fiat_currency?: InputMaybe<Scalars['String']['input']>;
  float_wallet_nonce?: InputMaybe<Scalars['Int']['input']>;
  float_wallet_used?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  locked_fields?: InputMaybe<Scalars['jsonb']['input']>;
  locked_price_usd_cents?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mint_method?: InputMaybe<Scalars['jsonb']['input']>;
  network_fee_usd_cents?: InputMaybe<Scalars['Int']['input']>;
  payment_completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  payment_failure_code?: InputMaybe<Scalars['String']['input']>;
  payment_hold_created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  payment_method?: InputMaybe<Scalars['String']['input']>;
  payment_started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  queueId?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  refunded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  requested_token_id?: InputMaybe<Scalars['String']['input']>;
  sdk_client_secret?: InputMaybe<Scalars['String']['input']>;
  service_fee_usd_cents?: InputMaybe<Scalars['Int']['input']>;
  signature_args?: InputMaybe<Scalars['jsonb']['input']>;
  solana_whitelist_transaction_hash?: InputMaybe<Scalars['String']['input']>;
  stripe_payment_id?: InputMaybe<Scalars['String']['input']>;
  stripe_verification_session_id?: InputMaybe<Scalars['String']['input']>;
  stripe_verification_session_result?: InputMaybe<Scalars['String']['input']>;
  test_buckets?: InputMaybe<Scalars['jsonb']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  total_price_usd_cents?: InputMaybe<Scalars['Int']['input']>;
  transaction_hash?: InputMaybe<Scalars['String']['input']>;
  transfer_completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  transfer_failed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  trench_transaction_id?: InputMaybe<Scalars['String']['input']>;
  use_paper_key?: InputMaybe<Scalars['Boolean']['input']>;
  user_exported_nft_transaction_hashes?: InputMaybe<Scalars['jsonb']['input']>;
  value_in_currency?: InputMaybe<Scalars['String']['input']>;
  wallet_address?: InputMaybe<Scalars['String']['input']>;
  wallet_type?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

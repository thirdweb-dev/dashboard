enum PaymentFailureCode {
  BLOCKLIST = `blocklist`,
  CARD_VELOCITY_EXCEEDED = `card_velocity_exceeded`,
  CASHAPP_PAYMENT_DECLINED = `cashapp_payment_declined`,
  DO_NOT_HONOR = `do_not_honor`,
  EXPIRED_CARD = `expired_card`,
  GENERIC_DECLINE = `generic_decline`,
  HIGHEST_RISK_LEVEL = `highest_risk_level`,
  INCORRECT_CVC = `incorrect_cvc`,
  INCORRECT_NUMBER = `incorrect_number`,
  INVALID_NUMBER = `invalid_number`,
  INSUFFICIENT_FUNDS = `insufficient_funds`,
  INVALID_ACCOUNT = `invalid_account`,
  INVALID_AMOUNT = `invalid_amount`,
  INVALID_CVC = `invalid_cvc`,
  LOST_CARD = `lost_card`,
  PICKUP_CARD = `pickup_card`,
  PREVIOUSLY_DECLINED_DO_NOT_RETRY = `previously_declined_do_not_retry`,
  PROCESSING_ERROR = `processing_error`,
  REENTER_TRANSACTION = `reenter_transaction`,
  REQUESTED_BLOCK_ON_INCORRECT_CVC = `requested_block_on_incorrect_cvc`,
  REVOCATION_OF_ALL_AUTHORIZATIONS = `revocation_of_all_authorizations`,
  RULE = `rule`,
  TRANSACTION_NOT_ALLOWED = `transaction_not_allowed`,
  TRY_AGAIN_LATER = `try_again_later`,
}

export const getBillingPaymentMethodVerificationFailureResponse = (args: {
  paymentFailureCode: string;
  minimumCardBalanceUsd?: number;
}): {
  code: string;
  title: string;
  reason: string;
  resolution: string;
} => {
  const { paymentFailureCode, minimumCardBalanceUsd = 5 } = args;

  switch (paymentFailureCode) {
    case PaymentFailureCode.INSUFFICIENT_FUNDS:
      return {
        code: PaymentFailureCode.INSUFFICIENT_FUNDS,
        title: `Insufficient funds`,
        reason: `Your payment method failed as it does not have enough funds in your account`,
        resolution: `Please ensure your payment method has at least $${minimumCardBalanceUsd} available or use a different payment method`,
      };
    case PaymentFailureCode.TRANSACTION_NOT_ALLOWED:
      return {
        code: PaymentFailureCode.TRANSACTION_NOT_ALLOWED,
        title: `Transaction Not Allowed`,
        reason: `This card type isn't accepted`,
        resolution: `Please use a different card`,
      };
    case PaymentFailureCode.INVALID_NUMBER:
    case PaymentFailureCode.INCORRECT_NUMBER:
      return {
        code: PaymentFailureCode.INCORRECT_NUMBER,
        title: `Incorrect Number`,
        reason: `The card number is incorrect`,
        resolution: `Check your card number for typos and try again`,
      };
    case PaymentFailureCode.GENERIC_DECLINE:
    case PaymentFailureCode.DO_NOT_HONOR:
      return {
        code: PaymentFailureCode.DO_NOT_HONOR,
        title: `Do Not Honour`,
        reason: `thirdweb requires a temporary hold for $${minimumCardBalanceUsd} which we immediately release; however, your bank has rejected this transaction`,
        resolution: `Please contact your bank or use a different payment method`,
      };
    case PaymentFailureCode.TRY_AGAIN_LATER:
      return {
        code: PaymentFailureCode.TRY_AGAIN_LATER,
        title: `Try Again Later`,
        reason: `We are facing issues with this payment method`,
        resolution: `Please retry the payment method after a few moments or use a different payment method`,
      };
    case PaymentFailureCode.INCORRECT_CVC:
      return {
        code: PaymentFailureCode.INCORRECT_CVC,
        title: `Incorrect CVC`,
        reason: `The CVC (the 3-digit code on the back of your card) is incorrect`,
        resolution: `Check for typos in the CVC and try again`,
      };
    case PaymentFailureCode.REQUESTED_BLOCK_ON_INCORRECT_CVC:
      return {
        code: PaymentFailureCode.REQUESTED_BLOCK_ON_INCORRECT_CVC,
        title: `Block on Incorrect CVC`,
        reason: `Transactions on this card are blocked due to CVC issues`,
        resolution: `Please contact your bank or use a different payment method`,
      };
    case PaymentFailureCode.PROCESSING_ERROR:
      return {
        code: PaymentFailureCode.PROCESSING_ERROR,
        title: `Processing Error`,
        reason: `We require a temporary hold for $${minimumCardBalanceUsd} which we immediately release, your bank has not allowed this`,
        resolution: `Please contact them or use a different payment method`,
      };
    case PaymentFailureCode.CASHAPP_PAYMENT_DECLINED:
      return {
        code: PaymentFailureCode.CASHAPP_PAYMENT_DECLINED,
        title: `Cashapp Payment Declined`,
        reason: `Your Cashapp transaction was not accepted`,
        resolution: `Please try again or use a different payment method`,
      };
    default:
      return {
        code: PaymentFailureCode.GENERIC_DECLINE,
        title: `Your payment method was declined`,
        reason: `Your payment method failed to process`,
        resolution: `Please update your payment method to avoid any service interruptions`,
      };
  }
};

export const getRecurringPaymentFailureResponse = (args: {
  paymentFailureCode: string;
  amount?: number;
}): {
  code: string;
  title: string;
  reason: string;
  resolution: string;
} => {
  const { paymentFailureCode, amount } = args;

  switch (paymentFailureCode) {
    case PaymentFailureCode.INSUFFICIENT_FUNDS:
      return {
        code: PaymentFailureCode.INSUFFICIENT_FUNDS,
        title: `Insufficient funds`,
        reason: `We were unable to process your payment due to insufficient funds in your account`,
        resolution: `To continue using thirdweb services without interruption, please ensure sufficient funds are available ${amount ? `($${amount})` : ""} or update your payment method`,
      };
    case PaymentFailureCode.TRANSACTION_NOT_ALLOWED:
    case PaymentFailureCode.DO_NOT_HONOR:
    case PaymentFailureCode.GENERIC_DECLINE:
      return {
        code: paymentFailureCode,
        title: `Payment Declined`,
        reason: `We were unable to process your payment due to your bank declining the transaction`,
        resolution: `To continue using thirdweb services without interruption, please contact your bank or update your payment method`,
      };
    default:
      return {
        code: PaymentFailureCode.GENERIC_DECLINE,
        title: `Your payment method was declined`,
        reason: `Your payment method failed to process`,
        resolution: `Please update your payment method to avoid any service interruptions`,
      };
  }
};

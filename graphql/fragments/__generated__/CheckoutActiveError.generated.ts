import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
export type CheckoutActiveErrorFragment = { __typename?: 'checkout_active_error', id: any, condition: any, message: string, display_type: string };

export const CheckoutActiveErrorFragmentDoc = gql`
    fragment CheckoutActiveError on checkout_active_error {
  id
  condition
  message
  display_type
}
    `;
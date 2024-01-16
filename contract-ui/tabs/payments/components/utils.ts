import {
  FiatCurrencies,
  FiatCurrency,
  FiatCurrencyDecimals,
} from "@3rdweb-sdk/react/hooks/usePayments";

/**
 * Converts base currency units to whole currency units.
 * Examples:
 * - (fiatCurrency: 'USD', value: 192)
 * - 1.92
 *
 * @param fiatCurrency
 * @param value
 * @returns A number representing the value in currency units rather than base units
 */
export const baseFiatCurrencyUnitToCurrency = ({
  fiatCurrency: _fiatCurrency,
  value,
}: {
  fiatCurrency?: string | null;
  value: number | string;
}) => {
  if (Number.isNaN(Number(value))) {
    const error = `Value passed to baseFiatCurrencyUnitToCurrency() is not numeric.`;
    throw new Error(error);
  }

  let fiatCurrency = _fiatCurrency;
  if (typeof fiatCurrency !== "string") {
    fiatCurrency = FiatCurrency.USD;
  }
  if (!FiatCurrencies.includes(fiatCurrency ?? "")) {
    const error = `Currency passed in must be a fiat currency`;
    throw new Error(error);
  }

  return Number(value) / Math.pow(10, FiatCurrencyDecimals[fiatCurrency] ?? 2);
};

/**
 * Shows a user-friendly display of price in fiat or crypto currency.
 * Examples:
 * - 123.4567 MATIC
 * - $45.67 USD
 *
 * @param price
 * @param currency
 * @param maximumFractionDigits
 * @param locale
 * @returns string A user-friendly, localized price to display.
 */
export const prettyPrintPrice = ({
  price,
  currency,
  maximumFractionDigits,
  locale,
}: {
  price: number;
  currency?: string | null;
  maximumFractionDigits?: number;
  locale?: string;
}): string => {
  // Use Intl.NumberFormat to format fiat currencies.
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  if (Object.keys(FiatCurrency).includes(currency || FiatCurrency.USD)) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || FiatCurrency.USD,
      maximumFractionDigits,
    }).format(price);
  }

  // e.g. 123.4567 MATIC
  return `${price.toLocaleString(locale, {
    maximumFractionDigits: maximumFractionDigits ?? 4,
  })} ${(currency || FiatCurrency.USD).toUpperCase()}`;
};

export const formatUnclaimedSupply = (supply: number): string => {
  const max = 1_000_000;
  if (supply > max) {
    return `${max.toLocaleString()}+`;
  }
  return supply.toLocaleString();
};

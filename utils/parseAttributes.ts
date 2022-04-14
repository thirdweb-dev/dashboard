export const parseAttributes = (
  attributes: {
    trait_type: string;
    value: string;
  }[],
) => {
  const parsedAttributes = attributes
    .filter(({ value }) => value !== "")
    .map(({ value, trait_type }) => ({
      value,
      ...(!!trait_type && { trait_type }),
    }));

  return parsedAttributes.length === 0 ? undefined : parsedAttributes;
};

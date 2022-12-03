import type { NFTMetadataInput } from "@thirdweb-dev/sdk";

export function parseAttributes<T extends NFTMetadataInput>(input: T): T {
  return {
    ...input,
    attributes: removeEmptyValues(input.attributes),
    properties: removeEmptyValues(input.properties),
  };
}

export function removeEmptyValues(data: NFTMetadataInput["attributes"]) {
  if (!data) {
    return data;
  }
  if (Array.isArray(data)) {
    const parsedArray = data.reduce(
      (result, { value, trait_type }) => {
        if (value !== "")
          return [
            ...result,
            {
              ...(!!trait_type && { trait_type }),
              value,
            },
          ];
        return result;
      },
      [] as Array<{
        value?: string | unknown;
        trait_type?: string | unknown;
      }>,
    );
    return parsedArray.length === 0 ? undefined : parsedArray;
  }
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);
}

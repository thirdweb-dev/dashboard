import color from "color";

// takes in hex-like color codes and adds or removes #
export function useSafeColorHex(
  c?: string,
  omitPound?: true,
): string | undefined {
  if (!c) {
    return c;
  }
  return makeColorHexSafe(c, omitPound);
}

export function makeColorHexSafe(c = "000", omitPound?: true): string {
  // turn pseudo hex color into hex
  if (c.length === 6 || c.length === 3) {
    c = `#${c}`;
  }

  const hexLike = color(c).hex();

  const hasPound = hexLike.startsWith("#");
  if (hasPound && omitPound) {
    return hexLike.substr(1, hexLike.length);
  }

  return hexLike;
}

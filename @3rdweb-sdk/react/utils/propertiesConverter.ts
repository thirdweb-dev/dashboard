export type PropertyLiteral = string | number | boolean | null;
export type PropertyArrayObject = { key: string; value: PropertyLiteral };
export type PropertyObject = Record<string, PropertyLiteral>;

export function convertPropertiesToObject<T extends PropertyLiteral>(
  properties?: Array<{ key: string; value: T }>,
): Record<string, T> | undefined {
  if (!properties) {
    return undefined;
  }
  const result: Record<string, T> = {};
  const keyCount = {} as Record<string, number>;
  for (const property of properties) {
    // check if the key is already in the object
    if (result[property.key]) {
      // if it is, increment the count
      keyCount[property.key] = (keyCount[property.key] || -1) + 1;
      // append the count to the key
      result[`${property.key}_${keyCount[property.key]}`] = property.value;
    } else {
      // if it isn't, set the key to the value
      result[property.key] = property.value;
    }
  }
  return result;
}

export function convertPropertiesToArray(
  properties?: PropertyObject,
): PropertyArrayObject[] {
  if (!properties) {
    return [];
  }
  const result: PropertyArrayObject[] = [];
  for (const key in properties) {
    result.push({ key, value: properties[key] });
  }
  return result;
}

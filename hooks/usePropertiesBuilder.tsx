import PropertiesBuilder from "components/PropertiesBuilder";
import { useEffect, useMemo, useState } from "react";

export type Property = { key: string; value: string };

export default function usePropertiesBuilder() {
  const [properties, setProperties] = useState<Property[]>([]);

  const Builder = useMemo(
    () => (
      <PropertiesBuilder
        properties={properties}
        setProperties={setProperties}
      ></PropertiesBuilder>
    ),
    [properties, setProperties],
  );

  return {
    properties: Object.fromEntries(properties.map((p) => [p.key, p.value])),
    Builder,
  };
}

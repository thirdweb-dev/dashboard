import { Select } from "@chakra-ui/select";
import { useRouter } from "next/router";
import { IConsoleVersion } from "pages/api/versions";
import { useEffect, useMemo, useState } from "react";
import { isBrowser } from "utils/isBrowser";

const VERSION_URL = "https://thirdweb.com";

export const VersionSelect: React.FC = () => {
  const router = useRouter();
  const [versions, setVersions] = useState<IConsoleVersion[]>([]);

  useEffect(() => {
    fetch(`${VERSION_URL}/api/versions`)
      .then((res) => res.json())
      .then(setVersions)
      .catch((err) => {
        console.error("failed to load old versions", err);
      });
  }, []);

  const activeVersion = useMemo(() => {
    let v = versions[0]?.id;
    if (!isBrowser()) {
      return v;
    }
    // console-v0.nftlabs.co
    for (const ver of versions) {
      if (window.location.hostname.indexOf(`-${ver.id}`) > -1) {
        v = ver.id;
        break;
      }
    }
    return v;
  }, [versions]);

  return (
    <Select
      value={activeVersion}
      onChange={(e) => {
        const val = e.target.value;
        const version = versions.find((v) => v.id === val);
        if (version) {
          window.location.href = version.url;
        }
      }}
      size="sm"
    >
      {versions.map((v) => (
        <option value={v.id} key={v.id}>
          {v.id}
          {v.latest ? " (latest)" : v.deprecated ? " (deprecated)" : ""}
        </option>
      ))}
    </Select>
  );
};

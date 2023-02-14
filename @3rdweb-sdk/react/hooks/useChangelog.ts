import { useQuery } from "@tanstack/react-query";

interface ChangelogItem {
  published_at: string;
  title: string;
  url: string;
}

export function useChangelog() {
  return useQuery(
    ["changelog"],
    async () => {
      const res = await fetch(`/api/changelog`);
      return res.json() as Promise<ChangelogItem[]>;
    },
    {
      refetchInterval: 60_000,
    },
  );
}

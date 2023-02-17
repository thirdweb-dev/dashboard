import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const changelogEndpoint =
    "https://thirdweb.ghost.io/ghost/api/content/posts/?key=49c62b5137df1c17ab6b9e46e3&fields=title,url,published_at&filter=tag:changelog&visibility:public&limit=5";

  const changelog = await fetch(changelogEndpoint);
  const data = await changelog.json();

  try {
    // cache for 60 seconds, with up to 120 seconds of stale time
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=119",
    );

    return res.status(200).json(data.posts);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Invalid response" });
  }
};

export default handler;

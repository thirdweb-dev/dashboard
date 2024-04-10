import Head from "next/head";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/router";

const title = "Superchain form";
const description = "Superchain form with farcaster frame";

const ogImageUrl = `${getAbsoluteUrl()}/assets/superchain/frame-1.png`;

const SuperChainFrame = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/dashboard`);
  }, [router]);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content={ogImageUrl} />
        <meta property="fc:frame:button:1" content="Apply" />
        <meta
          property="fc:frame:post_url"
          content={`${getAbsoluteUrl()}/api/superchain/frame?type=apply`}
        />
      </Head>
    </>
  );
};

export default SuperChainFrame;

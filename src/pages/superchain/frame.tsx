import Head from "next/head";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";

const title = "Superchain form";
const description = "Superchain form with farcaster frame";

const ogImageUrl = `${getAbsoluteUrl()}/assets/og-image/degen-enchine-frame.png`;

const BaseFramePage = () => {
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
        <meta property="fc:frame:button:1" content="Confirm" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta
          property="fc:frame:input:text"
          content="Base, Frax, Lisk, OP or Zora"
        />
        <meta
          property="fc:frame:button:1:target"
          content={`${getAbsoluteUrl()}/api/superchain/frame?type=chain`}
        />
      </Head>
    </>
  );
};

export default BaseFramePage;

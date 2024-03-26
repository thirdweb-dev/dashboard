import React from "react";
import Head from "next/head";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";

const url = getAbsoluteUrl();
const ogImageUrl = `${url}/assets/og-image/sdk.png`;
const title = "NFT title";
const description = "NFT description";

const BaseFrame = () => {
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
  />;

  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content={ogImageUrl} />
        <meta property="fc:frame:button:1" content="Mint NFT" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta
          property="fc:frame:button:1:target"
          content={`${url}/api/frame/base/get-tx-frame`}
        />
      </Head>
      <h1>TX Frame</h1>
      <iframe
        src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xB6606041437BCBD727373ffF037dDa0247771184&chain=%7B%22name%22%3A%22Base%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F8453.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22base%22%2C%22chainId%22%3A8453%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22base%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmW5Vn15HeRkScMfPcW12ZdZcC2yUASpu6eCsECRdEmjjj%2Fbase-512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=9f4174bf8df9ca69f01edfd5c94d87e0&theme=light&primaryColor=purple"
        width="600px"
        height="600px"
      />
    </>
  );
};

export default BaseFrame;

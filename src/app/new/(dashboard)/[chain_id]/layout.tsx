import Link from "next/link";

// this is the dashboard layout file
export default async function ChainPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chain_id: string };
}) {
  const chain = await getChain(params.chain_id);

  return (
    <section className="flex flex-col">
      <header className="bg-gradient-to-t from-indigo-800 to-violet-500 py-24">
        <div className="container mx-auto">
          <h1 className="text-3xl font-medium">{chain.name}</h1>
        </div>
      </header>
      <nav className="container mx-auto">
        <ul className="flex gap-2">
          <li>
            <Link href={`/new/${chain.slug}`}>Overview</Link>
          </li>
          <li>
            <Link href={`/new/${chain.slug}/rpc`}>RPC Edge</Link>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto">{children}</main>
    </section>
  );
}

async function getChain(chainIdOrSlug: string) {
  const res = await fetch(
    `https://api.thirdweb.com/v1/chains/${chainIdOrSlug}`,
  );
  const result = await res.json();
  if (!result.data) {
    throw new Error("Chain not found");
  }
  return result.data;
}

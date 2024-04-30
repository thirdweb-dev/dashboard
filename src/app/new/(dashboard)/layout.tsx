import Link from "next/link";

// this is the dashboard layout file
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-accent px-4 py-3">thirdweb</header>
      <main className="grow">{children}</main>
      <footer className="bg-accent py-4 justify-center align-middle flex gap-4">
        <a
          target="_blank"
          href="https://feedback.thirdweb.com"
          rel="noreferrer"
          className="text-muted-foreground text-sm hover:underline"
        >
          Feedback
        </a>
        <Link
          href="/privacy"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground text-sm hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/tos"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground text-sm hover:underline"
        >
          Terms of Service
        </Link>
        <Link
          href="/gas"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground text-sm hover:underline"
        >
          Gas Estimator
        </Link>
        <Link
          href="/chainlist"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground text-sm hover:underline"
        >
          Chain List
        </Link>
        <p className="text-muted-foreground text-sm opacity-50">
          Copyright © 2024 thirdweb
        </p>
      </footer>
    </div>
  );
}

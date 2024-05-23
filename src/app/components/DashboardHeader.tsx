import { ColorModeToggle } from "../../@/components/color-mode-toggle";
import { ThirdwebMiniLogo } from "./ThirdwebMiniLogo";
import { CustomConnectButton } from "../connect";
import Link from "next/link";

const links = {
  left: [
    {
      name: "Connect",
      href: "/dashboard/connect/playground",
    },
    {
      name: "Contracts",
      href: "/dashboard/contracts/deploy",
    },
    {
      name: "Engine",
      href: "/dashboard/engine",
    },
    {
      name: "Settings",
      href: "/dashboard/settings/api-keys",
    },
  ],
  right: [
    {
      name: "Docs",
      href: "https://portal.thirdweb.com",
    },
    {
      name: "Support",
      href: "https://thirdweb.com/support",
    },
  ],
};

export function DashboardHeader() {
  return (
    <header className="border-b">
      <div className="container px-4 gap-5 justify-between flex flex-row items-center py-4">
        {/* Left */}
        <div className="flex gap-5 items-center">
          <Link href="/dashboard">
            <ThirdwebMiniLogo className="size-10" />
          </Link>
          <div className="hidden lg:flex items-center gap-5">
            {links.left.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith("https") ? "_blank" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-5 items-center">
          <div className="hidden lg:flex items-center gap-5">
            {links.right.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith("https") ? "_blank" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <ColorModeToggle />

          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}

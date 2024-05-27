import { ColorModeToggle } from "../../../@/components/color-mode-toggle";
import { ThirdwebMiniLogo } from "../ThirdwebMiniLogo";
import { CustomConnectButton } from "../../connect";
import Link from "next/link";
import { MobileBurgerMenu } from "./MobileBurgerMenu";
import { headerLinks } from "./headerLinks";

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
            {headerLinks.left.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith("https") ? "_blank" : undefined}
                className="text-secondary-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-5 items-center">
          <div className="hidden lg:flex items-center gap-5">
            {headerLinks.right.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith("https") ? "_blank" : undefined}
                className="text-secondary-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <ColorModeToggle />
            <MobileBurgerMenu />
          </div>

          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}

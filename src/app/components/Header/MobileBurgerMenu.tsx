"use client";

import { Menu, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../@/components/ui/button";
import { headerLinks } from "./headerLinks";
import Link from "next/link";

export function MobileBurgerMenu() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  useEffect(() => {
    if (showBurgerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showBurgerMenu]);

  return (
    <>
      <Button
        variant="ghost"
        className="p-0 lg:hidden"
        onClick={() => setShowBurgerMenu(!showBurgerMenu)}
      >
        <Menu className="size-8" />
      </Button>

      {showBurgerMenu && (
        <nav
          className={
            "fixed top-[80px] z-50 inset-0 bg-background p-6 animate-in fade-in-20 slide-in-from-top-3 border-t"
          }
        >
          <Button
            variant="ghost"
            className="p-0 absolute top-4 right-6"
            onClick={() => setShowBurgerMenu(false)}
          >
            <XIcon className="size-8" />
          </Button>

          <div className="flex flex-col gap-7">
            {[...headerLinks.left, ...headerLinks.right].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-lg "
                target={link.href.startsWith("https") ? "_blank" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

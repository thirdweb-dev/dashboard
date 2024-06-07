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

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setShowBurgerMenu(!showBurgerMenu)}
      >
        <Menu strokeWidth={1} />
      </Button>

      {showBurgerMenu && (
        <nav
          className={
            "fixed top-[80px] z-50 inset-0 bg-background p-6 animate-in fade-in-20 slide-in-from-top-3 border-t"
          }
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6"
            onClick={() => setShowBurgerMenu(false)}
          >
            <XIcon strokeWidth={1} />
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

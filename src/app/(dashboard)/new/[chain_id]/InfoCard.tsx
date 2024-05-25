import { ChevronRight, InfoIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";

export function InfoCard(props: {
  title: string;
  learnMoreHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl px-4 py-4 bg-secondary relative">
      <h2 className="text-xl mb-3 font-semibold tracking-tight">
        {props.title}
      </h2>

      <div className="[&_p]:mb-1.5 [&_p]:text-muted-foreground max-w-[900px]">
        {props.children}
      </div>

      {props.learnMoreHref && (
        <Link
          href={props.learnMoreHref}
          className="mt-7 text-primary-foreground flex items-center gap-0.5 font-medium"
          target="_blank"
        >
          Learn More <ChevronRight className="size-4" />
        </Link>
      )}

      <InfoIcon className="size-5 text-muted-foreground absolute right-4 top-4" />
    </div>
  );
}

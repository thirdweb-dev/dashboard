import { cn } from "../../../@/lib/utils";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div className="container py-10 px-4">
      <h1 className="text-7xl tracking-tighter font-semibold mb-8">
        Styleguide
      </h1>
      <Colors />
    </div>
  );
}

function Colors() {
  return (
    <div>
      <h2 className="text-5xl mb-5 font-semibold tracking-tight"> Colors </h2>
      <div className="flex gap-3 flex-wrap">
        <BgColorPreview className="bg-background" />
        <BgColorPreview className="bg-secondary" />
        <BgColorPreview className="bg-muted" />
        <BgColorPreview className="bg-primary" />
        <BgColorPreview className="bg-destructive" />
        <BgColorPreview className="bg-card" />
        <BgColorPreview className="bg-popover" />
        <BgColorPreview className="bg-inverted" />
      </div>

      <div className="h-10"></div>

      <div className="flex flex-col gap-5">
        <TextColorPreview className="text-foreground" />
        <TextColorPreview className="text-secondary-foreground" />
        <TextColorPreview className="text-muted-foreground" />
        <TextColorPreview className="text-primary-foreground" />
        <TextColorPreview className="text-success-foreground" />
        <TextColorPreview className="text-destructive-foreground" />
        <TextColorPreview className="text-card-foreground" />
        <TextColorPreview className="text-popover-foreground" />
        <TextColorPreview className="text-inverted-foreground bg-inverted" />
      </div>
    </div>
  );
}

function BgColorPreview(props: { className: string }) {
  return (
    <div>
      <p className="mb-1"> {props.className}</p>
      <div
        className={cn(
          "w-[200px] h-[100px] rounded-xl shadow-md border",
          props.className,
        )}
      ></div>
    </div>
  );
}

function TextColorPreview(props: { className: string }) {
  return (
    <div>
      <p className="mb-1"> {props.className}</p>
      <p className={cn("text-4xl font-semibold", props.className)}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

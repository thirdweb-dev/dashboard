export function PrimaryInfoItem(props: {
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b pb-2 md:pb-0 md:border-none">
      <div className="flex items-center gap-2">
        <h3 className="text-lg text-muted-foreground">{props.title}</h3>
        {props.titleIcon}
      </div>
      {props.children}
    </section>
  );
}

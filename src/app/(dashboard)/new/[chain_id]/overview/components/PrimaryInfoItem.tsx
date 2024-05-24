export function PrimaryInfoItem(props: {
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-muted-foreground">{props.title}</h2>
        {props.titleIcon}
      </div>
      {props.children}
    </section>
  );
}

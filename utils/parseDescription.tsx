export const parseDescription = (description?: string) =>
  description?.split("\n").map((line) => (
    <p key={line}>
      {line}
      <br />
    </p>
  ));

export const camelToTitle = (string: string): string => {
  if (string[0] === "_") {
    string = string.slice(1);
  }
  return string
    .replace(/^[a-z]/, (match) => match.toUpperCase())
    .replace(/([A-Z]{1}[a-z]*|_[a-z])/g, function (m) {
      return m.length > 1
        ? ` ${m
            .replace(/^_/, "")
            .replace(/^[a-z]/, (match) => match.toUpperCase())}`
        : m.replace(/^_/, "").replace(/^[a-z]/, (match) => match.toUpperCase());
    });
};

export const wait: (timeout: number) => Promise<void> = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

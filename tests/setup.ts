export function getBaseURL(url: string | void) {
  if (process.env.ENVIRONMENT_URL) {
    url = process.env.ENVIRONMENT_URL;
  }
  if (!url) {
    url = "https://thirdweb.com/";
  }
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

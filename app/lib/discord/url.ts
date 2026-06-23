export function normalizeDiscordCdnUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const httpsIdx = url.indexOf("https");
  if (httpsIdx !== -1) {
    const after = url.slice(httpsIdx);
    return after.replace("/", "://");
  }

  const httpIdx = url.indexOf("http");
  if (httpIdx !== -1) {
    const after = url.slice(httpIdx);
    return after.replace("/", "://");
  }

  return url;
}

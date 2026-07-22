import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/ask") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("modal", "ask");
    return NextResponse.rewrite(url);
  }

  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/markdown")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const markdownUrl = url.clone();
  markdownUrl.pathname = "/api/markdown";
  markdownUrl.searchParams.set("path", url.pathname + url.search);

  return NextResponse.rewrite(markdownUrl, {
    request: { headers: request.headers },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.png|robots\\.txt|sitemap\\.xml|api/).*)"],
};

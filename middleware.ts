import { NextRequest, NextResponse, userAgent } from "next/server";
import supportedBrowsers from "./supported-browsers";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { ua, isBot } = userAgent(request);

  if (
    !isBot &&
    !supportedBrowsers.test(ua) &&
    url.pathname !== "/outdated-browser"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/outdated-browser";

    return NextResponse.redirect(url);
  }
}

import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const pathname = await request.url;
  console.log(pathname);
  if (pathname && pathname.startsWith("/Dashboard/")) {
    const hasAccessToken = checkAccessToken();
    if (hasAccessToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/Dashboard/:path*"],
};

const checkAccessToken = () => {
  const accessToken = getAccessTokenFromSomewhere();
  return Boolean(accessToken);
};

const getAccessTokenFromSomewhere = () => {
  return localStorage.get("access-token");
};

import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export const middleware = async (request) => {
  const pathname = new URL(request.url).pathname;
  const protectedPaths = ["/", "/Home", "/Dashboard", "/Products"];

  if (protectedPaths.includes(pathname)) {
    const hasAccessToken = checkAccessToken(request);

    if (hasAccessToken) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/Login", request.url).toString();
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/:path", "/Dashboard:path", "/Home:path", "/Products:path"],
};

const checkAccessToken = (request) => {
  const accessToken = getAccessTokenFromLocalStorage(request);
  return Boolean(accessToken);
};

const getAccessTokenFromLocalStorage = () => {
  // Log the 'accessToken' value for debugging
  // console.log("Access Token:", localStorage.getItem("accessToken"));

  // Return the value or handle accordingly
  return true;
};

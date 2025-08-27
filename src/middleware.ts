import { NextRequest, NextResponse } from "next/server";

interface JWTPayload {
  userId?: string;
  name?: string;
  userEmail?: string;
  role?: "user" | "admin";
  gender?: "male" | "female";
  exp?: number;
  iat?: string;
}

function decodeJWT(token: string): JWTPayload | null {
  try {
    let jwtToken = token;

    // If token looks like base64 (no dots), try to decode it first
    if (!token.includes(".") && token.length > 20) {
      try {
        jwtToken = Buffer.from(token, "base64").toString("utf-8");
      } catch {
        // If base64 decoding fails, use original token
        jwtToken = token;
      }
    }

    // Now decode the JWT payload (second part after splitting by dots)
    const parts = jwtToken.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payloadBase64 = parts[1];
    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    // Check if token is expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.log("🔒 JWT token is expired");
      return null;
    }

    return payload;
  } catch (error) {
    console.log("❌ JWT decode error:", error);
    return null;
  }
}

// get user role
function getUserRole(payload: JWTPayload): string | null {
  // Check multiple possible role fields and normalize them
  const role = payload.role;
  if (typeof role === "string") {
    return role.toLowerCase();
  }
  return null;
}


//  * Check if a path should be excluded from middleware processing

function isExcludedPath(pathname: string): boolean {
  const excludedPaths = [
    "/_next",
    "/favicon",
    "/api",
    "/static",
    "/images",
    "/icons",
    "/manifest",
    "/robots.txt",
    "/sitemap.xml",
  ];

  return excludedPaths.some((path) => pathname.startsWith(path));
}


  // Check if a path is an authentication-related page

function isAuthPage(pathname: string): boolean {
  const authPaths = [
    "/login",
    "/registration",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
  ];
  return authPaths.includes(pathname);
}


  // Check if a path is a public page that doesn't require authentication

function isPublicPage(pathname: string): boolean {
  const publicPaths = [
    "/",
    "/about",
    "/contact",
    "/success-stories",
    "/biodatas",
  ];
  return publicPaths.includes(pathname);
}


  // Check if a path is the profile creation page

function isProfileCreationPage(pathname: string): boolean {
  return pathname === "/profile/create-biodata";
}

function extractRoleFromPath(pathname: string): string | null {
  const pathParts = pathname.split("/").filter(Boolean);
  if (pathParts.length === 0) return null;

  const possibleRoles = ["user", "admin"];
  const firstPart = pathParts[0].toLowerCase();

  return possibleRoles.includes(firstPart) ? firstPart : null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  const url = request.nextUrl.clone();

  if (isExcludedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const profileStatus = request.cookies.get("profileStatus")?.value;

  const decodedJWT = token ? decodeJWT(token) : null;
  const userRole = decodedJWT ? getUserRole(decodedJWT) : null;

  //  Handle unauthenticated users
  if (!token || !decodedJWT || !userRole) {
    console.log("🚫 User not authenticated");

    // Allow access to public pages and auth pages
    if (isPublicPage(pathname) || isAuthPage(pathname)) {
      return NextResponse.next();
    }

    // Check if trying to access a protected role-based route
    const routeRole = extractRoleFromPath(pathname);
    if (routeRole) {
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // For any other protected route, redirect to login
    if (!isPublicPage(pathname) && !isAuthPage(pathname)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Handle users with incomplete profiles
  if (token && profileStatus === "false" && !isProfileCreationPage(pathname)) {
    url.pathname = "/profile/create-biodata";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

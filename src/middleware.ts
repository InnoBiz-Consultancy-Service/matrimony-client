// middleware.ts (root directory এ রাখুন - src/middleware.ts নয়)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Debug: Console log করুন current path এবং cookies
  console.log('🔍 Middleware Debug:');
  console.log('Current pathname:', pathname);
  
  // Get cookies
  const token = request.cookies.get('token');
  const profileStatus = request.cookies.get('profileStatus');
  
  // Debug: Cookie values check করুন
  console.log('Token cookie:', token?.value);
  console.log('ProfileStatus cookie:', profileStatus?.value);
  console.log('All cookies:', request.cookies.getAll());
  
  // Public routes যেগুলো সবসময় access করা যাবে
  const publicRoutes = [
    '/login',
    '/register',
    '/auth',
    '/',
    '/api', // All API routes
    '/_next', // Next.js assets
    '/favicon.ico',
  ];
  
  // Protected routes that need authentication but don't need profile completion
  const authOnlyRoutes = [
    '/profile/create-biodata'
  ];
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if current path is auth-only route
  const isAuthOnlyRoute = authOnlyRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );
  
  console.log('Is public route:', isPublicRoute);
  console.log('Is auth only route:', isAuthOnlyRoute);
  
  // If public route, allow access
  if (isPublicRoute) {
    console.log('✅ Allowing access to public route');
    return NextResponse.next();
  }
  
  // If no token (not logged in), redirect to login
  if (!token?.value) {
    console.log('❌ No token found, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  console.log('✅ Token found');
  
  // If trying to access profile setup page and authenticated, allow
  if (isAuthOnlyRoute) {
    console.log('✅ Allowing access to auth-only route');
    return NextResponse.next();
  }
  
  // Check profile status for other protected routes
  const profileComplete = profileStatus?.value === 'true';
  
  console.log('Profile complete:', profileComplete);
  
  // If profile is not complete, redirect to profile setup
  if (!profileComplete) {
    console.log('⚠️ Profile not complete, redirecting to setup');
    const profileSetupUrl = new URL('/profile/create-biodata', request.url);
    return NextResponse.redirect(profileSetupUrl);
  }
  
  // If profile is complete, allow access to all routes
  console.log('✅ Profile complete, allowing access');
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * But include /api/auth routes for authentication
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
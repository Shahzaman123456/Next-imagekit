import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // ✅ Public routes (no auth needed)
        const publicPaths = ["/", "/login", "/register"];
        const publicAPIs = ["/api/auth", "/api/videos"];

        // Public pages
        if (publicPaths.includes(pathname)) return true;

        // Public APIs
        if (publicAPIs.some(p => pathname.startsWith(p))) return true;

        // ✅ All other routes require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};

import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const { auth } = NextAuth({
  providers: [
    Google({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  if (nextUrl.pathname.startsWith("/api/auth")) return;

  if (!isLoggedIn && nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (isLoggedIn) {
    if (nextUrl.pathname === "/") {
      return Response.redirect(new URL("/wallet", req.nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

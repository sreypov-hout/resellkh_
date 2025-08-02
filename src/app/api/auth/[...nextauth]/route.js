// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const backendURL =
  process.env.NEXT_PUBLIC_API_URL ||
  API_BASE_URL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${backendURL}/auths/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            console.error("Failed to login with credentials");
            return null;
          }

          const data = await res.json();
          
          if (data && data.token) {
            // The API response for credentials login won't have a profile image.
            // So, `image` will be `null`. This is the desired behavior.
            return {
              id: data.userId,
              email: data.email,
              name: data.userName || `${data.firstName || ""} ${data.lastName || ""}`.trim(),
              firstName: data.firstName,
              lastName: data.lastName,
              role: data.role || "USER",
              token: data.token,
              image: data.profileImage || "https://gateway.pinata.cloud/ipfs/QmYkedcDzkvyCZbPtzmztQZ7uANVYFiqBXTJbERsJyfcQm", 
            };
          }
          return null;
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${backendURL}/auths/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              picture: profile.picture,
            }),
          });

          if (!res.ok) return false;

          const { payload } = await res.json();
          
          // Populate user object with data from your backend
          user.id = payload.userId;
          user.token = payload.token;
          user.role = payload.role || "USER";
          // Use the Google picture as the image for the session.
          user.image = profile.picture; 
          
          return true;
        } catch (err) {
          console.error("Google sign-in callback error:", err);
          return false;
        }
      }
      return true; // For credentials sign-in
    },

    async jwt({ token, user }) {
      // Persist data to the token
      if (user) {
        token.accessToken = user.token;
        token.userId = user.id;
        token.role = user.role;
        token.picture = user.image; // user.image is null for credentials, URL for Google
      }
      return token;
    },

    async session({ session, token }) {
      // Persist data to the session
      if (token) {
        session.accessToken = token.accessToken;
        session.user = {
          id: token.userId,
          email: token.email,
          role: token.role,
          name: session.user.name,
          // The image will be the Google URL or null, which we handle in the navbar
          image: token.picture, 
        };
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60, // 5 hours
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
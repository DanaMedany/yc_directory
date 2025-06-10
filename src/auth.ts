import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { writeClient } from "./sanity/lib/write-client";
import { authorByGithubId } from "./sanity/lib/author/authorByGithubId";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { email, name, image }, profile }) {
      if (!profile?.id) return false;
      const extisingUser = await authorByGithubId(profile?.id);

      if (!extisingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (!profile?.id) return token;
      if (account && profile) {
        const user = await authorByGithubId(profile?.id);

        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});

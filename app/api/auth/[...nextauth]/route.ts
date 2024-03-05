import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcript from "bcryptjs";

type Credentials = {
  email: string;
  password: string;
};

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();
          const { email, password } = credentials;
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordMatched = await bcript.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new Error("Invalid password");
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);
        // TODO: update session

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        //@ts-ignore
        delete session?.user?.password;

        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
};

export { auth as GET, auth as POST };

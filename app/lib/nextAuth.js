import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import User from '../../models/user'
import connectToDB from '../../utils/database'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    // when logged in there's a session opened
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //expire after 1 day
  },
  jwt: {
    // JWT encoding and decoding configuration
  },
  callbacks: {
    // ======= session callback ===================
    // session callback: It receives the session object as an argument, which contains information about the current authenticated session
    async session({ session }) {
      // queries the MongoDB database to find a user whose email matches the email in the session.
      const sessionUser = await User.findOne({ email: session.user.email });

      // If the user is found in the database, the code extracts the _id property from the sessionUser document. Then converted to string as _.id is MongoDB objectId
      session.user.id = sessionUser._id.toString();
      // The modified session object, now containing the user's MongoDB ID
      // This ensures the updated session is available on both the client and server sides.
      return session;
    },
    // ============= Sign In ===================
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/signin", // custom sign in
  // },
};

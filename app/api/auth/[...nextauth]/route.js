import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@model/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async session({ session }) {
      try {
        await connectDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.log("Error in session callback:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();
        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        
        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture || profile.image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error in signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
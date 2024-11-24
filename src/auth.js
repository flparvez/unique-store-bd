import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { compare } from 'bcryptjs';
import { connectDb } from "./lib/DbConnect";
import {User}  from "./models/userSchema";



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET 

    // clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string



      
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const email = credentials.email 
        const password = credentials.password 

        //   const email = credentials.email as string  | undefined;
        // const password = credentials.password as string | undefined;

        

        if (!email || !password) throw new CredentialsSignin({cause:"Please enter email and password"});

        // Connection with DB
        await connectDb();
        const user = await User.findOne({ email }).select("+password");
       
        if (!user || !user.password) throw new CredentialsSignin({cause:"Invalid email or password"});
     
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new CredentialsSignin({cause: "Wrong password"});

  
        return user;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const { email, name, image, id } = user;

          await connectDb();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) await User.create({ email, name, image, googleId: id, });

          return true;
        } catch (err) {
          throw new AuthError("Error while creating user",err);
        }
      }
    
      return true; // Allow sign-in for other providers as well
    },
    async jwt({ token, user }) {
      // Add additional user information to the token
      if (user) {
        token._id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role =user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Include only name and email in the session
      session.user = {
        id: String(token._id),
        name: token.name,
        email: token.email,
        role: token.role,
        
      };
      return session;
    }
  }
});


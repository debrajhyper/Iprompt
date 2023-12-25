import NextAuth from "next-auth/next";
import { connectToDb } from "@/database/database";
import User from "@/models/user";
import { authOptions } from "./options";

const handler = NextAuth({
    providers: authOptions.providers,
    callbacks: {
        async session({ session }: any) {
            console.log('route.ts NEXT_AUTH SESSION -> ', session)
            const sessionUser = await User.findOne({
                email: session?.user?.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }: any) {
            console.log('route.ts NEXT_AUTH SIGNIN -> ', profile)
            try {
                await connectToDb();
                
                // check if user already exist
                const userExist = await User.findOne({
                    email: profile?.email
                })
                
                // if not, create new user
                if (!userExist) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name.replace(" ", "").toLowerCase(),
                        image: profile?.picture
                    })
                }
                
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }
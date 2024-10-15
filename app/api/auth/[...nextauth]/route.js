import { Providers } from "@/app/providers";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";


const prisma = new PrismaClient()


export const authOptions = {

    session: {
        strategy: 'jwt'
    },

    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type:"email"},
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
            
                if(!credentials.email || !credentials.password) {
                    return null;
                }
                
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                console.log('user found', user);



                if (!user) {
                    return null;
                } 

                const isPasswordValid = await compare(credentials.password, user.password);

                if(!isPasswordValid) {
                    return null;
                }


                if (user) {
                    return user
                } else {
                    return null
                }

            }
        })
    ]

}


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
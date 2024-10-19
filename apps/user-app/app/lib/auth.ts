import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";


export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Name", type: "text", placeholder: "Mousam Bachhar", required: true},
            phone: { label: "Phone number", type: "text", placeholder: "Your Phone Number", required: true },
            email: { label: "Email", type: "text", placeholder: "Mousam@gmail.com", required: true },
            password: { label: "Password", type: "password", placeholder: "123123", required: true },
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        phone: existingUser.number,
                        email: existingUser.email
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword,
                        email: credentials.email,
                        name: credentials.name,
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    number: user.number,
                    email: user.email
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    // callbacks: {
    //     // TODO: can u fix the type here? Using any is bad
    //     async session({ token, session }: any) {
    //         session.user.id = token.sub

    //         return session
    //     }
    // }
  }
  
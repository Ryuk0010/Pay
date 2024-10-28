import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

// const credentialsSchema = z.object({
//     name: z.string(),
//     phone: z.string().min(10, "Phone number must be at least 10 digits"),
//     email: z.string().email(),
//     password: z.string().min(6, "Password must be at least 6 characters"),
// });

export const authOptions = {

    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Name", type: "text", placeholder: "Mousam Bachhar", required: true},
            phone: { label: "Phone number", type: "text", placeholder: "Your Phone Number", required: true },
            password: { label: "Password", type: "password", placeholder: "123123", required: true },
          },

          async authorize(credentials: any) {
        
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
                const existingUser = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword,
                        email: credentials.email,
                        name: credentials.name,
                    }
                });
            
                return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    number: existingUser.number,
                    email: existingUser.email
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  
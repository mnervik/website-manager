import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { db } from '@utils/server/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error('Missing username or password')
        }
        const user = await db.user.findUnique({ where: { email } })

        if (user === null || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password')
        }

        return { id: user.email, password: user.password }
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

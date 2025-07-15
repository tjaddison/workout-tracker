import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createUser, getUser } from '@/app/lib/dynamodb'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Use email as user ID for consistency if user.id is not available
          const userId = user.id || user.email || account.providerAccountId
          
          // Check if user exists in database
          const existingUser = await getUser(userId)
          
          if (!existingUser) {
            // Create new user in database
            await createUser({
              id: userId,
              email: user.email,
              name: user.name,
              image: user.image,
            })
          }
          
          // Ensure user.id is set for session
          user.id = userId
          return true
        } catch (error) {
          console.error('Error during sign in:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        // Use token.sub or token.id for user ID
        session.user.id = token.id || token.sub!
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Set user ID in token for session
        token.id = (user.id || user.email || account?.providerAccountId) as string
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
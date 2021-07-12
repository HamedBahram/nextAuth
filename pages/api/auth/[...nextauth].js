import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        // OAuth authentication providers...
        Providers.LinkedIn({
            clientId: process.env.LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET,
            scope: ['r_emailaddress', 'r_liteprofile'],
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Passwordless / email sign in
        Providers.Email({
            server: {
                host: process.env.MAIL_SERVER_HOST,
                port: process.env.MAIL_SERVER_PORT,
                auth: {
                    user: process.env.MAIL_SERVER_USER,
                    pass: process.env.MAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    // Optional SQL or MongoDB database to persist users
    database: process.env.DATABASE_URL,
})

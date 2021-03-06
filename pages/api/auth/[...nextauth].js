import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        // OAuth authentication providers...
        Providers.LinkedIn({
            clientId: process.env.LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET,
            scope: 'r_emailaddress r_liteprofile',
            profileUrl:
                'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
            async profile(profile, tokens) {
                const res = await fetch(
                    `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${tokens.access_token}`
                )
                const data = await res.json()
                const email = data.elements[0]['handle~'].emailAddress
                return {
                    id: profile.id,
                    name: profile.localizedFirstName + ' ' + profile.localizedLastName,
                    email,
                    image: profile.profilePicture['displayImage~'].elements[0].identifiers[0]
                        .identifier,
                }
            },
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

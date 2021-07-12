import { getSession } from 'next-auth/client'

async function handler(req, res) {
    const session = await getSession({ req })

    if (session) {
        res.status(200).json({ content: 'Welcome to the secret page' })
    } else {
        res.status(401).json({ error: 'You need to be signed in!' })
    }

    return
}

export default handler

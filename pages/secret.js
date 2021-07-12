import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

const SecretPage = () => {
    const [session, loading] = useSession()
    const [content, setcontent] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/secret')
            const { content, error } = await response.json()
            if (content) setcontent(content)
        }
        fetchData()
    }, [session])

    if (!session) {
        return (
            <div>
                <p>You need to sign in first</p>
            </div>
        )
    }

    return (
        <div>
            <h1 className='text-2xl font-bold'>Protected Page</h1>
            <p>{content}</p>
        </div>
    )
}

export default SecretPage

import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client'

const HomePage = () => {
    const [session, loading] = useSession()

    return (
        <>
            <Head>
                <meta
                    name='google-site-verification'
                    content='0YFtempxIaGrpTuvZGjK0JrgPJsYzmZ9R6_PUxu1CV8'
                />
            </Head>
            <main className='grid place-content-center place-items-center h-screen'>
                <h1 className='text-2xl font-bold'>Welcome to NextJS</h1>
                {session ? (
                    <>
                        <p>Signed in as {session.user.email}</p>
                        <button
                            className='px-5 py-2 mt-2 bg-blue-500 rounded text-white uppercase text-sm font-medium tracking-wider focus:outline-none focus:ring focus:border-blue-300 focus:ring-offset-1'
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </button>
                        <button className='px-5 py-2 mt-2 bg-blue-500 rounded text-white uppercase text-sm font-medium tracking-wider focus:outline-none focus:ring focus:border-blue-300 focus:ring-offset-1'>
                            <Link href='/secret'>Secret Page</Link>
                        </button>
                    </>
                ) : (
                    <>
                        <p>You are not signed in</p>
                        <button
                            className='px-5 py-2 mt-2 bg-blue-500 rounded text-white uppercase text-sm font-medium tracking-wider focus:outline-none focus:ring focus:border-blue-300 focus:ring-offset-1'
                            onClick={() => signIn()}
                        >
                            Sign In
                        </button>
                    </>
                )}
            </main>
        </>
    )
}

export default HomePage

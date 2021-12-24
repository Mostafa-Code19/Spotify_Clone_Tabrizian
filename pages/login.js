import { getProviders, signIn } from 'next-auth/react'
import { log } from '../components/base'

export async function getServerSideProps(req, res) {
    const providers = await getProviders()
    console.log("Providers", providers)
    return {
        props: {
            providers
        }
    }
}

const Login = ({ providers }) => {
    const provider = providers.spotify
    return ( 
        <div className='h-[100vh] bg-gradient-to-b from-zinc-800 to-zinc-900 text-center'>

            <div className="top-[50%] translate-y-[-50%] relative">
                <div className='grid place-content-center'>
                    <div className='flex items-center space-x-7'>
                        <img className='w-40' src="https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM" alt="" />
                        <h1 className='font-bold text-7xl text-green-500'>
                            Mostify
                        </h1>
                    </div>
                </div>

                {
                        <div key={provider.name} className=''>
                            <button
                                className='font-bold text-black bg-green-500 py-2 px-10 relative top-5 rounded-full'
                                onClick={() => signIn(provider.id, { callbackUrl: '/'})}
                            >
                                Login
                            </button>
                        </div>
                }
            </div>

        </div>
    );
}
 
export default Login;
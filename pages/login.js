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
        <div>
            <h1>Spotify Login Page</h1>
            {
                    <div key={provider.name}>
                        <button
                            onClick={() => signIn(provider.id, { callbackUrl: '/'})}
                        >
                            Login with {provider.name}
                        </button>
                    </div>
            }

        </div>
    );
}
 
export default Login;
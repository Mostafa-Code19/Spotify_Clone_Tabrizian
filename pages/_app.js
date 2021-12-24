import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

import '../styles/tailwind_out.css'
import '../styles/styles.scss'

function MyApp({ Component, pageProps: { session, ...pageProps }}) {
    return (
      <SessionProvider session={session} >
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    )
}

export default MyApp
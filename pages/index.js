import Head from 'next/head'
import Image from 'next/image'

import { log } from '../components/base'
import Layout from '../components/layout'


export default function Home() {
  return (
    <>
      <Layout>

        <div className="mt-2">
            <h2 className='text-2xl'>Good Afternoon</h2>
        </div>

      </Layout>
    </>
  )
}

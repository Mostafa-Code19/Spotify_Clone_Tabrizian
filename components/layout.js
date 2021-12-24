import Head from 'next/head'
import Image from 'next/image'

import { log } from './base'
import SideBar from './sidebar'
import Header from './header'
import Friends from './friends'
import Player from './player'


export default function Layout({ children }) {
  return (
    <>
        <div className="grid grid-cols-[2fr_7fr_1fr] grid-rows-[6fr]">

            <SideBar />

            <div className="overflow-scroll max-h-[100vh] scroll col-start-2 col-span-1 bg-gradient-to-b from-zinc-800 text-white font-bold to-zinc-900 min-h-[100vh]">

                <Header />

                { children }

            </div>

            <Friends />

        </div>

        <Player />

    </>
  )
}

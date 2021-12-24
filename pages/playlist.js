import Head from 'next/head'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Link from 'next/link'

import useSpotify from '../hooks/useSpotify'

import { playlistIdAtom, playlistAtom } from './atoms/playlistAtom'

import { log } from '../components/base'
import Layout from '../components/layout'

let idNumber = -100

export default function Playlist() {
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  const playlistIdState = useRecoilValue(playlistIdAtom)
  const [playlistState, setPlaylistState] = useRecoilState(playlistAtom)

  useEffect(() => {
    spotifyApi.getPlaylist(playlistIdState)
      .then((data) => {
        setPlaylistState(data.body)
        idNumber = -100
      })
      .catch((err) => {
        log(err)
      })
  }, [playlistIdState, spotifyApi]);

  log(playlistState?.tracks.items[0].track)

  return (
    <>
      <Layout>

        <div className="space-x-5 bg-gradient-to-b from-zinc-300 to-zinc-500 h-[17rem] w-[100%] translate-y-[-4rem]">
          <div className='top-20 relative flex items-center'>

            <img src={playlistState?.images[0].url} className='w-44 h-44 object-cover mx-7' alt="" />

            <div className="space-x-5">

              <p className="text-[11px]">Playlist</p>
              <h1 className="text-6xl">{playlistState?.name}</h1>
              <p className="text-[10px] text-gray-300 mt-1">{playlistState?.description}</p>

              <h5 className='text-[10px] flex my-2'>
                <img className='rounded-full w-5 h-5 mr-2 object-cover' src={session?.user.image} alt="" />
                {playlistState?.owner.display_name} ◽ {' '}
                {playlistState?.followers.total} likes ◽
                {playlistState?.tracks.items.total} songs
              </h5>

            </div>

          </div>

        </div>

        <div className='relative top-[-3rem] px-10'>
          <div className='space-x-3 items-center flex mb-5'>

            <button>
              <svg class="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polygon points="10 8 16 12 10 16 10 8" /></svg>
            </button>

            <button>
              <svg class="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <button>
              <svg class="h-6 w-6 text-green-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="8" y1="12" x2="12" y2="16" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="16" y1="12" x2="12" y2="16" /></svg>
            </button>

            {/* <button>Search</button>
            <button>Sort</button> */}

          </div>

          <div>
            <ul>
              {(playlistState?.tracks.items)?.map((track) => {
                idNumber++

                return (
                  <li className='mb-4 grid grid-cols-[0fr_1fr_7fr_10fr_2fr_1fr] text-left'>

                    <span className='col-span-0 text-[12px] mr-3 w-4 justify-center items-center flex text-zinc-400'>
                      {idNumber}
                    </span>

                    <img className='w-7 h-7 mr-3 col-span-0' src={track.track?.album.images[0].url} alt='' />
                    
                    <div className='col-span-1'>
                      <p className='text-[12px]'>
                        {track.track?.name}
                      </p>
                      <p className='text-[8px] text-zinc-500'>
                        {track.track?.artists[0].name}
                      </p>
                    </div>

                    <p className='text-[8px] text-zinc-500 items-center flex'>
                      {track.track?.album.name}
                    </p>

                    <p className='text-[8px] text-zinc-500 items-center flex'>
                      {track.track?.album.release_date}
                    </p>

                    <p className='text-[8px] text-zinc-500 items-center flex'>
                      {(track.track?.duration_ms / 1000 / 60).toString().slice(0, 4)}
                    </p>




                  </li>
                )
              })}
            </ul>
          </div>
        </div>

      </Layout>
    </>
  )
}

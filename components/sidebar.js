import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import Link from 'next/link'

import {playlistIdAtom} from '../pages/atoms/playlistAtom'

import { log } from '../components/base'

const SideBar = () => {
  const { data: session, status} = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState([])
  const [playlistIdState, setPlaylistIdState] = useRecoilState(playlistIdAtom)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) { 
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi]);

  return (
      <div className="bg-black text-white col-span-1 px-3 text-[10px]">
      <span className="text-4xl leading-none">...</span>

      <h3 className="text-gray-800">
        <button onClick={() => signOut()} >
          signOut
        </button>
      </h3>

      <div className="space-y-3 my-4">
        
        <Link href='/'>
          <a className='flex space-x-2'>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>

            <p>Home</p> 
          </a>
        </Link>

        <button className='flex space-x-2'>
          <svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <p>Search </p>
        </button>

        <button className='flex space-x-2'>
          <svg className="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
          </svg>
          <p>Your Library</p>
        </button>

      </div>

      <ul className="my-4">

        <button className='flex space-x-2'>
          Create Playlist
        </button>

        <button className='flex space-x-2'>
          Liked Songs
        </button>

      </ul>

      <hr className='w-[95%] border-slate-700'/>

      <div className="space-y-2 py-2">
        {
          playlists.map((playlist) => {
            return (
              <Link href="/playlist" key={playlist.id} onClick={() => setPlaylistIdState(playlist.id)}>
                <a className='block'>
                  <button>
                    {playlist.name}
                  </button>
                </a>
              </Link>
            )
          })
        }
      </div>

    </div>
  );
}
 
export default SideBar;
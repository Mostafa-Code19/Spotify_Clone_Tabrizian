import Head from 'next/head'
import Image from 'next/image'

import { useSession, signOut } from 'next-auth/react'
import { log } from '../components/base'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
    <div className="index">

      <div className="listSide">
        <span className="menuBtn">...</span>

        <h3 className="signOut">
          <button onClick={() => signOut()} >
            signOut
          </button>
        </h3>

        <ul className="menuOptions">
          
          <li>
            Home 
            {/* <Image src=''
            width='350'
            height='500'
            priority
            className='Q'/>*/}
          </li>

          <li>
            Search 
            {/* <Image src=''
            width='350'
            height='500'
            priority
            className='Q'/>*/}
          </li>

          <li>
            Your Library
            {/* <Image src=''
            width='350'
            height='500'
            priority
            className='Q'/>*/}
          </li>

        </ul>

        <ul className="menu_playlist">

          <li>
            Create Playlist
            {/* <Image src=''
            width='350'
            height='500'
            priority
            className='Q'/> */}
          </li>

          <li>
            Liked Songs
            {/* <Image src=''
            width='350'
            height='500'
            priority
            className='Q'/> */}
          </li>

          <hr />

          <li>
            More playlists
          </li>

        </ul>

      </div>

      <div className="mainSide">

        <div className="header flex">

          <div className="pageTravel flex flex-jc-c flex-ai-c">

            <button className="header_backBtn">Back</button>
            <button className="header_nextBtn">Next</button>

          </div>

          <div className="flex flex-jc-c flex-ai-c">

            {
              session &&
              <>
                <div className="header_profile_space">
                  {
                    <img className='header_profile' src={session.user.image} alt="" />
                  }
                </div>

                <h3>
                  {session.user.name}
                </h3>
              </>
            }

          </div>

        </div>

        <div className="content">
            Good Afternoon
        </div>

      </div>

      <div className="friendSide">
        <div className="friendSection header flex">

          <h3>Friend activity</h3>
          <div className="friendSection_addFriend">
            +
          </div>

        </div>

        <div>
          <ul className="friendSection_friendsList">
            <li>A friend</li>
          </ul>
        </div>
      </div>

      <div className="controller flex flex-jc-c flex-ai-c">
          <div className="song_detail">img name author</div>
          <div className="song_like">like</div>
          <div className="song_controller">song play</div>
          <div className="song_options">volume</div>
      </div>

    </div>
    </>
  )
}

import { useSession, signOut } from 'next-auth/react'

const Header = () => {
    const { data: session, status } = useSession()
    
    return (
        <div className="flex p-2 px-4 relative z-10">

          <div className="flex-1 space-x-2">

            <button className="">
              <svg className="h-6 w-6 text-white bg-black rounded-full"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="5" y1="12" x2="11" y2="18" />  <line x1="5" y1="12" x2="11" y2="6" /></svg>
            </button>
            <button className="">
              <svg className="h-6 w-6 text-white bg-black rounded-full"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="13" y1="18" x2="19" y2="12" />  <line x1="13" y1="6" x2="19" y2="12" /></svg> 
            </button>

          </div>

          <div className="px-2 py-1 mx-3 flex bg-black rounded-full space-x-3 text-white">

            {
              session &&
              <>
                <div className="">
                  {
                    <img className='rounded-full w-7 h-7 object-cover' src={session?.user.image} alt="" />
                  }
                </div>

                <h3 className='text-[10px] items-center flex'>
                  {session?.user.name}
                </h3>

                <button>
                  <svg className="h-4 w-4 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="16" y1="15" x2="12" y2="19" />  <line x1="8" y1="15" x2="12" y2="19" /></svg>
                </button>
              </>
            }

          </div>

        </div>
    );
}
 
export default Header;
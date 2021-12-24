const Friends = () => {
    return (
        <div className="bg-black text-white col-span-1 text-[11px] font-bold space-y-6 p-2">
            <div className="flex">

                <h3 className="flex-1">Friend activity</h3>
                <svg className="h-5 w-5 text-white flex-none pr-2"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>

            </div>

            <div>
                <ul className="">
                    <li>A friend</li>
                </ul>
            </div>
        </div>
    );
}
 
export default Friends;
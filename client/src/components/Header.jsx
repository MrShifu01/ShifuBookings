import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import  { resetUser } from '../redux/userSlice'
import axios from 'axios'

const Header = () => {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    
// TEMPORARY LOGOUT BUTTON
    // const dispatch = useDispatch()
    // const handleLogout = async () => {
    //     await axios.post('/logout')
    //     dispatch(resetUser())
    //     navigate('/')
    // }

  return (
    <div>
        <header className='flex justify-between'>
        
            {/* Logo */}
            <Link to='/' className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <div className="flex flex-col">
                    <span className='font-bold text-xl'>Shifu</span>
                    <span className='font-bold text-xs'>Bookings</span>
                </div>
            </Link>

            {/* Search Widget */}
            <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                <div>Anywhere</div>
                    <div className="border-l border-gray-300"></div>
                <div>Any week</div>
                    <div className="border-l border-gray-300"></div>
                <div>Add guests</div>
                <button className='bg-primary text-white p-1 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>

{/* Temp Logout!!!!!!!!!!!!!!!!!!!!!
            <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'><button className="bg-white" onClick={handleLogout}>Logout</button></div> */}

            {/* User Widget */}
            <div className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                
                {/* Hamburger Menu */}
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
                </div>

                {/* Avatar */}
                <Link className="flex gap-1" to={user ? '/account' : '/login'} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                    {user && (
                        <div>{user.name}</div>
                    )}
                </Link>
                
            </div>
       
        </header>
    </div>
  )
}

export default Header
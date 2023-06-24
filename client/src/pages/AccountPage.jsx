import { useSelector, useDispatch } from 'react-redux' 
import AccountNav from '../components/AccountNav'
import { setPage } from '../redux/pageSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { resetUser } from '../redux/userSlice'
import PlacesPage from './PlacesPage'

const AccountPage = () => {
    const [logout, setLogout] = useState(false)
    const user = useSelector((state) => state.user.user)
    const page = useSelector((state) => state.page.page)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Setting the page State
    useEffect(() => {
        dispatch(setPage('/account'))
    },[dispatch])
    
    // Logout Function
    const handleLogout = async () => {
        await axios.post('/logout')
        setLogout(true)
        dispatch(resetUser())
        navigate('/')
    }

    // No User logged in
    if (!user && logout) {
        navigate('/login')
        setLogout(false)
    }

    return (
        <div>
            <AccountNav/>

{/* Information */}

    {/* Profile Information */}
            {page === '/account' && (
                <div 
                className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})<br/>
                    <button 
                    onClick={handleLogout} 
                    className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

    {/* My Bookings Information */}


    {/* My Places Information */}
            {page === '/account/places' && (
                <PlacesPage/>
            )}

        </div>
    )
}

export default AccountPage
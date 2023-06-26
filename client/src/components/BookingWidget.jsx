import { useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"

/* eslint-disable react/prop-types */
const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [guests, setGuests] = useState(1)
    const [redirect, setRedirect] = useState('')

    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])

    let numberOfDays, totalPrice
    if (checkIn && checkOut && place.price) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        totalPrice = numberOfDays * place.price
    }
    

    const handleBooking = async (e) => {
        e.preventDefault()
        const bookingData = {
            checkIn, 
            checkOut, 
            guests, 
            email, 
            name, 
            place:place._id, 
            price:totalPrice
        }

        const response = await axios.post('/bookings', bookingData)
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect) {
        return <Navigate to={redirect}/>
    }

  return (
    <div>
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-xl text-center">Price: R{place.price} per night</div>
            <div className="border rounded-2xl mt-4">
                <div className="grid grid-cols-2">
                    <div className="p-3">
                        <label>Check In:</label>
                        <input 
                        value={checkIn} 
                        onChange={e => setCheckIn(e.target.value)} 
                        type="date"/>
                    </div>
                    <div className="p-3 border-l">
                        <label>Check Out:</label>
                        <input 
                        value={checkOut} 
                        onChange={e => setCheckOut(e.target.value)} 
                        type="date"/>
                    </div>
                </div>
                <div className="p-3 px-3 border-t">
                <label>Number of Guests:</label>
                <input 
                value={guests} 
                onChange={e => setGuests(e.target.value)} 
                type="number" />
                </div>
                {numberOfDays > 0 && (
                    <div>
                        <div className="p-3 px-3 border-t">
                            <label>Full Name:</label>
                            <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" />
                        </div>
                        <div className="p-3 px-3 border-t">
                            <label>Email:</label>
                            <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="text" />
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleBooking} className="primary mt-4 ">
                Book this place
                {numberOfDays > 0 && (
                    <span className="ml-1">
                        for: R{totalPrice}
                    </span>
                )}
            </button>
        </div>
    </div>
  )
}

export default BookingWidget
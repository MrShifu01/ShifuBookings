import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from 'axios'

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      const response  = await axios.get('/bookings')
      setBookings(response.data)
    }

    getBookings()
  }, [])
  return (
    <div>
        <AccountNav/>
        <div>
          {bookings?.length > 0 && bookings.map((booking) => (
            <div key={booking._id}>
              <div className="flex items-center gap-1">
                {booking.checkIn}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                {booking.checkOut}
              </div>
            </div>  
          ))}
        </div>
    </div>
  )
}

export default BookingsPage
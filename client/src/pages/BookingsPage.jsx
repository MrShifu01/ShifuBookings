import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import axios from 'axios'
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from "react-router-dom"

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
            <Link to={`/account/bookings/${booking._id}`} 
            className="flex mb-2 gap-4 bg-gray-200 rounded-2xl overflow-hidden" key={booking._id}>
              <div className="w-48">
                {booking.place.photos.length > 0 && (
                    <img className="object-cover" src={booking.place.photos[0]} alt="place image"/>
                )}
              </div>
              <div className="grow pr-3">
                <h2 className="py-2 text-xl">{booking.place.title}</h2>
                <div className="border-t border-gray-300 py-1">{format(new Date(booking.checkIn), "MMMM d, yyyy")} - {format(new Date(booking.checkOut), "MMMM d, yyyy")}</div>
                <div className="py-3 text-lg">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights | Total Price: R{booking.price}</div>
              </div>
            </Link>  
          ))}
        </div>
    </div>
  )
}

export default BookingsPage
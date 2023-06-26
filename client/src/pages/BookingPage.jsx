import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import LocationLink from "../components/LocationLink"
import PlaceGallery from "../components/PlaceGallery"
import { format, differenceInCalendarDays } from "date-fns"
import { Link } from "react-router-dom"

const BookingPage = () => {
  const [booking, setBooking] = useState(null)
    const {id} = useParams()
    useEffect(() => {
      if(id) {
        const getBookings = async () => {
          const response = await axios.get(`/bookings/`)
          const foundBooking = await response.data.find(({_id}) => _id === id)
          setBooking(foundBooking)
        }
        getBookings()
      } 
    }, [])


  if (!booking) {
    return ''
  }
  return (
    <div className="my-8">
      <Link to={`/place/${booking.place._id}`}>
        <h1 className="text-3xl">{booking.place.title}</h1>
      </Link>
      <LocationLink place={booking.place} />
      <div className="bg-gray-200 p-4 rounded-2xl mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl">Your Booking Information:</h2>
          <div className="py-2">Dates: {format(new Date(booking.checkIn), "MMMM d, yyyy")} - {format(new Date(booking.checkOut), "MMMM d, yyyy")}</div>
          <div className="text-lg">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</div>
        </div>
        <div className="bg-primary p-5 text-gray-200 rounded-2xl">
          <div>Total Price: </div>
          <div className="text-2xl">R{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
      
      <div className="bg-gray-200 p-8 rounded-2xl mt-4">
        <h2 className="text-2xl mb-2">Description</h2>
        {booking.place.description}
      </div>
    </div>
  )
}

export default BookingPage
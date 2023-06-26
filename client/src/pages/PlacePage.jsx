import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import BookingWidget from "../components/BookingWidget"
import PlaceGallery from "../components/PlaceGallery"
import LocationLink from "../components/LocationLink"

const PlacePage = () => {
    const [place, setPlace] = useState()

    const {id} = useParams()
  
    useEffect(() => {
        if(!id) {
            return
        }
      const getAllPlaces = async () => {
        const response = await axios.get(`/place/${id}`)
        setPlace(response.data)
      }
      getAllPlaces()
    }, [id])

  if (!place) return ""

  return (
    <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
        <h1 className="text-2xl">{place.title}</h1>
        <LocationLink place={place}/>
        <PlaceGallery place={place} />

      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className=" my-1 font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check In time: {place.checkIn}:00<br/>
            Check Out time: {place.checkOut}:00<br/>
            Max number of guests: {place.maxGuests}<br/>
            
          </div>
          <div>
            <BookingWidget place={place}/>
          </div>
      </div>
      <div className="bg-white border-t -mx-8 p-8">
        <div>
          <h2 className="mt-3 mb-4 font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="leading-5 mb-4 mt-2 text-sm text-gray-700">
          {place.extraInfo}
        </div>
      </div>
    </div>
  )
}

export default PlacePage
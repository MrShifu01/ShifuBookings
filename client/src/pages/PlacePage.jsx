import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import BookingWidget from "../components/BookingWidget"

const PlacePage = () => {
    const [place, setPlace] = useState()
    const [showPhotos, setShowPhotos] = useState(false)
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

    console.log(place)

  if (!place) return ""

  if (showPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="p-12 bg-black grid gap-4">
          <h2 className="text-3xl mr-48">{place.title}</h2>
          <button onClick={() => setShowPhotos(false)} className="fixed right-12 shadow shadow-black flex items-center py-2 px-4 rounded-2xl bg-white text-black"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
          {place?.photos?.length > 0 && place.photos.map((photo) => (
            <div key={place.photos + place._id}>
              <img src={`http://localhost:8000/uploads/${photo}`} alt="photo"/>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
        <h1 className="text-2xl">{place.title}</h1>
        <a className="flex gap-1 my-3 underline font-semibold block" href={`https://maps.google.com/?q=${place.location}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {place.location}
        </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img onClick={() => setShowPhotos(true)} className="cursor-pointer aspect-square object-cover" src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="photo" />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img onClick={() => setShowPhotos(true)} className="cursor-pointer aspect-square object-cover " src={`http://localhost:8000/uploads/${place.photos[1]}`} alt="photo" />
            )}
            <div className="border overflow-hidden">
              {place.photos?.[2] && (
                <img onClick={() => setShowPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={`http://localhost:8000/uploads/${place.photos[2]}`} alt="photo" />
              )}
            </div>
          </div>
        </div>
        <button onClick={() => setShowPhotos(true)} className=" flex items-center gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Show all photos
        </button>
      </div>

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
import { resetPage } from "../redux/pageSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Image from "../components/Image"

const IndexPage = () => {
  const [places, setPlaces] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetPage())
    const getAllPlaces = async () => {
      const response = await axios.get('/places')
      setPlaces(response.data)
    }

    getAllPlaces()
    
  }, [])

  return (
<div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {places.length > 0 && places.map(place => (
    <Link to={`/place/${place._id}`} key={place._id}>
      <div className="bg-gray-500 mb-2 rounded-2xl flex">
        <Image className="rounded-2xl aspect-square object-cover" src={place.photos[0]} alt="places photo" />
      </div>
      <div className="flex justify-between items-center">
      <h2 className="truncate">{place.location}</h2>
        <div className="flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
          <div>4.3</div>
        </div>
      </div>
      <h3 className="text-sm text-gray-500">{place.title}</h3>
      <h3 className="truncate">R{place.price}<span className="ml-2 text-gray-500">night</span></h3>
    </Link>
  ))}
</div>

  )
}

export default IndexPage
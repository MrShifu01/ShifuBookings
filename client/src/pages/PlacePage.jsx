import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

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

    console.log(place)

  return (
    <div className="mt-4 py-8 bg-gray-100 -mx-8 px-8">
        <h1 className="text=2xl">{place.title}</h1>
        <a href={`https://maps.google.com/?q=${place.location}`}>{place.location}</a>
    </div>
  )
}

export default PlacePage
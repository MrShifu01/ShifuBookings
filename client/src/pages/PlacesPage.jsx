import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setPage } from "../redux/pageSlice"
import AccountNav from "../components/AccountNav"
import axios from "axios"

const PlacesPage = () => {
    const [places, setPlaces] = useState([])
    const dispatch = useDispatch()
    const { action } = useParams()

    useEffect(() => {
        dispatch(setPage('/account/places'))
    }, [dispatch])

    useEffect(() => {
        const getPlaces = async () => {
            const response = await axios.get('/user-places')
            setPlaces(response.data)
        }

        getPlaces()
    }, [action])

  return (
    <div>
        <AccountNav/>
            <div>
                <div className="text-center">
                    <h2 className="text-center">List of all places</h2>
                    <br/>
                    <Link
                    className="bg-primary text-white py-2 px-5 rounded-full inline-flex items-center gap-1"
                    to='/account/places/new'>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor"
                        className="w-6 h-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
                <div>
                    <div className="mt-4" >
                        {places.length > 0 && places.map((place) => (
                            <div className="mb-2" key={place._id}>
                                <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                                    <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                        {place.photos.length > 0 && (
                                            <img className="object-cover" src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="place image"/>
                                        )}
                                    </div>
                                    <div className="grow-0 shrink">
                                        <h2 className="text-xl">{place.title}</h2>
                                        <p className="text-sm mt-2">{place.description}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default PlacesPage
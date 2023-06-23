import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setPage } from "../redux/pageSlice"
import PlaceForm from "../components/PlaceForm"

const PlacesPage = () => {
    const dispatch = useDispatch()
    const { action } = useParams()

    useEffect(() => {
        dispatch(setPage('/account/places'))
    }, [dispatch])

  return (
    <div>

        {/* Display if NOT adding new place */}
        {action !== 'new' && (
            <div 
            className="text-center">
                <Link 
                className="bg-primary text-white py-2 px-5 rounded-full inline-flex gap-1" 
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
        )}

        {/* Display when Adding new place */}
        {action === 'new' && (
            <PlaceForm/>
        )}

    </div>
  )
}

export default PlacesPage
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../redux/pageSlice"

const PlacesPage = () => {
    const dispatch = useDispatch()
    const page = useSelector((state) => state.page.page)

    console.log(page)

    useEffect(() => {
        dispatch(setPage('/account/places'))
    }, [dispatch])

    const handleAddPlace = () => {
        dispatch(setPage('/account/places/new'))
    }

  return (
    <div>

        {/* Display if NOT adding new place */}
        {page === '/account/places' && (
            <div 
            className="text-center">
                <Link 
                onClick={handleAddPlace}
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
        {page === '/account/places/new' && (
            <div>
                <form>
                    <input 
                    type="text" 
                    placeholder="title, for eg. My Great Villa"/>
                </form>
                Testing
            </div>
        )}

    </div>
  )
}

export default PlacesPage
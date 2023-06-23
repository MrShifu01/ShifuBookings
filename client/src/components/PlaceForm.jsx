import { useState } from "react"
import axios from 'axios'
import Upload from "./Upload"
import Features from "./Features"
import { Navigate } from 'react-router-dom'

const PlaceForm = () => {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [addedPhotos, setAddedPhotos] = useState('')
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)

    function inputHeader(text) {
        return <h2 className="text-xl mt-4">{text}</h2>
    }

    const handleAddPlace = async (e) => {
        e.preventDefault()
        const data = {
            title,
            location, 
            addedPhotos, 
            description, 
            features, 
            extraInfo, 
            checkIn, 
            checkOut, 
            maxGuests, 
            price
        }
        await axios.post('/places', data)
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/account/places'/>
    }

  return (
    <div>
        <form onSubmit={handleAddPlace}>

{/* Title */}
            <div>
                {inputHeader('Title')}
                <input
                type="text"
                placeholder="My Great Villa..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
            </div>

{/* Location */}
            <div>
                {inputHeader('Location')}
                <input
                type="text"
                placeholder="Rocky Mountains..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                />
            </div>

{/* Photos */}
            <Upload addedPhotos={addedPhotos} onChange={setAddedPhotos} />

{/* Description */}
            <div>
                {inputHeader('Description')}
                <textarea
                type="text"
                placeholder="Perfect Getaway..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </div>

{/* Features */}
                <div>
                    {inputHeader('Features')}
                    <Features selected={features} onChange={setFeatures}/>
                </div>

{/* Extra Info */}
            <div>
                {inputHeader('Extra Info')}
                <textarea
                value={extraInfo}
                onChange={e => setExtraInfo(e.target.value)}
                />
            </div>

{/* Check In, Out, Max-Guests, Price */}
            <div>
                {inputHeader('Check In, Check Out, Max Guests and Price')}
                <div className="grid gap-2 sm: grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input
                        type="text"
                        placeholder="14:00"
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input
                        type="text"
                        placeholder="11:00"
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max guests</h3>
                        <input
                        type="number"
                        value={maxGuests}
                        onChange={e => setMaxGuests(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

{/* Save Button */}
            <div>
                <button type="submit" className="primary my-4">Save</button>
            </div>

        </form>
    </div>
  )
}

export default PlaceForm
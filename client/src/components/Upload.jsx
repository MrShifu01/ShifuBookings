import { useState } from "react"
import axios from "axios"

const Upload = () => {
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')

    const handleAddPhotoByLink = async (e) => {
        e.preventDefault()
        const response = await axios.post('/upload-by-link', {link: photoLink})
        const filename = response.data
        setAddedPhotos((prev) => {
            return[...prev, filename]
        })
        setPhotoLink('')
    }

    const handleUploadPhoto = async (e) => {
        const files = e.target.files
        const data = new FormData()
        for (let i = 0; i< files.length; i++) {
            data.append('photos', files[i])
        }
        
        const response = await axios.post('/upload', data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        setAddedPhotos((prev) => {
            return[...prev, ...response.data]
        })
        setPhotoLink('')
    }
  return (
    <div>
        {/* Photos */}
        <div>
            <h2 className="text-xl mt-4">Photos</h2>
    {/* Photo by Link */}
            <div className="flex gap-2">
                <input
                type="text"
                placeholder="Add using a link ...jpg"
                value={photoLink}
                onChange={e => setPhotoLink(e.target.value)}
                />
                <button
                onClick={handleAddPhotoByLink}
                className="bg-gray-200 px-4 rounded-2xl">
                    Add&nbsp;photo
                </button>
            </div>
    {/* Photo by Upload */}
            <div className="grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2">
                <label className="h-32 inline-flex cursor-pointer items-center gap-3 justify-center border bg-transparent rounded-2xl p-4 text-2xl text-gray-600">
                    <input 
                    type="file" 
                    multiple
                    className="hidden"
                    onChange={handleUploadPhoto}
                    />
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                </label>

    {/* Added Photos */}
                {addedPhotos.length > 0 && addedPhotos.map((link) => (
                    <div className="h-32 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={`http://localhost:8000/uploads/${link}`} alt="places image"/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Upload
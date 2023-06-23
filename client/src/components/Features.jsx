/* eslint-disable react/prop-types */

const Features = ({selected, onChange}) => {

    const handleCheckboxClick = async (e) => {
        const { checked, name } = e.target
        if (checked) {
            onChange([...selected, name])
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }

    }
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
{/* Wifi */}
        <label className="cursor-pointer flex rounded-xl items-center gap-2 border p-4 " >
            <input 
            type="checkbox"
            name="wifi"
            // checked={}
            onChange={handleCheckboxClick}
            />
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
            <span>Wifi</span>
        </label>

{/* Free Parking */}
        <label className="cursor-pointer flex rounded-xl items-center gap-2 border p-4 ">
            <input 
            type="checkbox"
            name="parking"
            onChange={handleCheckboxClick}
            />
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>Free Parking</span>
        </label>

{/* TV */}
        <label className="cursor-pointer flex rounded-xl items-center gap-2 border p-4 ">
            <input 
            type="checkbox"
            name="tv"
            onChange={handleCheckboxClick}
            />
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span>TV</span>
        </label>

{/* Room Service */}
        <label className="cursor-pointer flex rounded-xl items-center gap-2 border p-4 ">
            <input 
            type="checkbox"
            name="service"
            onChange={handleCheckboxClick}
            />
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
            <span>Room Service</span>
        </label>

{/* Private Entrance */}
        <label className="cursor-pointer flex rounded-xl items-center gap-2 border p-4 ">
            <input 
            type="checkbox"
            name="entrance"
            onChange={handleCheckboxClick}
            />
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Private Entrance</span>
        </label>
    </div>
  )
}

export default Features
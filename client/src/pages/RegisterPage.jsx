import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { setPage } from "../redux/pageSlice"

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPage('/register'))
  }, [dispatch])

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password
      })
      dispatch(setUser(response.data))
      alert("Reg Success")
      setRedirect(true)
    } catch (e) {
      alert("Reg Failed")
    }
  }

  if (redirect) {
    return (
      <Navigate to="/"/>
    )
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="-mt-64">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form onSubmit={handleRegister} className="max-w-md mx-auto">
        <input 
          type="text" 
          placeholder='John Doe' 
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder='your@email.com' 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder='password' 
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="primary">Register</button>
        <div className='text-center py-2 text-gray-500'>
          Already a member? <Link className='underline text-black' to='/login'>Login</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default RegisterPage